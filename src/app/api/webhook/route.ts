import { prisma } from '@/utils/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import Stripe from 'stripe'
import { OrderConfirmationEmail } from '../../../../emails/OrderConfirmationEmail'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!
const resend = new Resend(process.env.RESEND_API_KEY!)

interface SimplifiedCartItem {
  productId: string
  quantity: number
  salePrice: number
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.text()
    const sig = req.headers.get('stripe-signature')!
    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
    } catch (err: unknown) {
      const error = err as Error
      console.error(`❌ Erro na verificação da assinatura do Webhook: ${error.message}`)
      return NextResponse.json({ error: `Webhook Error: ${error.message}` }, { status: 400 })
    }

    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      const { userId, cartItems, addressId, shippingCost } = paymentIntent.metadata

      if (!userId || !cartItems || !addressId) {
        console.error('❌ Metadados ausentes ou incompletos no PaymentIntent:', paymentIntent.id)
        return NextResponse.json({ received: true })
      }

      const parsedCartItems = JSON.parse(cartItems) as SimplifiedCartItem[]

      const updateProductPromises = parsedCartItems.map(item =>
        prisma.product.update({
          where: { id: item.productId },
          data: {
            stock: { decrement: item.quantity },
            sold: { increment: item.quantity }
          }
        })
      )

      const createOrderPromise = prisma.order.create({
        data: {
          userId: userId,
          shippingAddressId: addressId,
          totalAmount: paymentIntent.amount / 100,
          shippingCost: Number(shippingCost),
          stripePaymentId: paymentIntent.id,
          status: 'PAID',
          paymentMethod: 'CREDIT_CARD',
          products: {
            create: parsedCartItems.map(item => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.salePrice
            }))
          }
        },
        include: {
          user: {
            select: { name: true, email: true }
          },
          shippingAddress: true
        }
      })

      const [newOrder] = await prisma.$transaction([createOrderPromise, ...updateProductPromises])
      console.log(`📦 Pedido ${newOrder.id} criado e estoque debitado com sucesso!`)

      try {
        await resend.emails.send({
          from: 'Baltazarte <onboarding@resend.dev>',
          to: [newOrder.user.email],
          subject: `Confirmação do seu pedido #${newOrder.id}`,
          react: OrderConfirmationEmail({
            userName: newOrder.user.name,
            orderId: newOrder.id,
            orderDate: newOrder.createdAt.toLocaleDateString('pt-BR'),
            totalAmount: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(newOrder.totalAmount),
            shippingAddress: {
              street: newOrder.shippingAddress.street,
              number: newOrder.shippingAddress.number,
              city: newOrder.shippingAddress.city,
              state: newOrder.shippingAddress.state,
              zipCode: newOrder.shippingAddress.zipCode
            }
          })
        })
        console.log(`✉️ E-mail de confirmação enviado para ${newOrder.user.email}`)
      } catch (emailError) {
        console.error(`❌ Falha ao enviar e-mail de confirmação para o pedido ${newOrder.id}:`, emailError)
      }

      const productIdsInOrder = parsedCartItems.map(item => item.productId)
      const updatedProducts = await prisma.product.findMany({
        where: { id: { in: productIdsInOrder } },
        select: { id: true, stock: true }
      })

      const outOfStockProductIds = updatedProducts.filter(p => p.stock === 0).map(p => p.id)

      if (outOfStockProductIds.length > 0) {
        await prisma.product.updateMany({
          where: {
            id: { in: outOfStockProductIds }
          },
          data: {
            active: false
          }
        })
        console.log(`🔌 Produtos desativados por falta de estoque: ${outOfStockProductIds.join(', ')}`)
      }

      const userCart = await prisma.cart.findUnique({ where: { userId } })
      if (userCart) {
        await prisma.cartItem.deleteMany({
          where: { cartId: userCart.id }
        })
        console.log(`🛒 Carrinho do usuário ${userId} foi limpo.`)
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Erro inesperado no webhook:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}
