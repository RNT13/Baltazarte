import { getUserFromRequest } from '@/utils/auth'
import { prisma } from '@/utils/prisma'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const user = await getUserFromRequest(req)
    if (!user) {
      return NextResponse.json({ message: 'Não autorizado' }, { status: 401 })
    }

    // Se for ADMIN, busca todos os pedidos. Se não, busca apenas os do usuário.
    const orders = await prisma.order.findMany({
      where: user.role === 'ADMIN' ? {} : { userId: user.id },
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { id: true, name: true, email: true } },
        products: { include: { product: true } },
        shippingAddress: true
      }
    })

    return NextResponse.json(orders)
  } catch (error) {
    console.error('Erro ao buscar pedidos:', error)
    return NextResponse.json({ message: 'Erro interno ao buscar pedidos' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getUserFromRequest(req)
    if (!user) {
      return NextResponse.json({ message: 'Não autorizado' }, { status: 401 })
    }

    const { cartId, addressId, totalAmount, shippingCost }: NewOrderRequestBody = await req.json()

    const cart = await prisma.cart.findFirst({
      where: { id: cartId, userId: user.id },
      include: { items: { include: { product: true } } }
    })

    if (!cart || cart.items.length === 0) {
      return NextResponse.json({ message: 'Carrinho inválido ou vazio' }, { status: 400 })
    }

    const newOrder = await prisma.$transaction(async tx => {
      const order = await tx.order.create({
        data: {
          userId: user.id,
          shippingAddressId: addressId,
          totalAmount,
          shippingCost,
          status: 'PENDING',
          paymentMethod: 'PENDING'
        }
      })

      await tx.orderProduct.createMany({
        data: cart.items.map(item => ({
          orderId: order.id,
          productId: item.productId,
          quantity: item.quantity,
          price: item.product.salePrice
        }))
      })

      await tx.cartItem.deleteMany({ where: { cartId: cart.id } })

      return order
    })

    return NextResponse.json(newOrder, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar a ordem:', error)
    return NextResponse.json({ message: 'Erro interno ao criar o pedido' }, { status: 500 })
  }
}
