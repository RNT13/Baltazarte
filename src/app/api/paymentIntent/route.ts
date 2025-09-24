import { getUserFromRequest } from '@/utils/auth'
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

interface SimplifiedCartItem {
  productId: string
  quantity: number
  salePrice: number
}

export async function POST(req: NextRequest) {
  try {
    const user = await getUserFromRequest(req)
    if (!user) {
      return NextResponse.json({ message: 'Não autorizado' }, { status: 401 })
    }

    const body = await req.json()

    const {
      amount,
      items,
      addressId,
      shippingCost
    }: {
      amount: number
      items: SimplifiedCartItem[]
      addressId: string
      shippingCost: number
    } = body

    // Validação dos dados recebidos
    if (typeof amount !== 'number' || amount <= 0 || !items || items.length === 0 || !addressId) {
      return NextResponse.json(
        { message: 'Dados insuficientes para criar o pagamento (amount, items, addressId são obrigatórios).' },
        { status: 400 }
      )
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'brl',
      metadata: {
        userId: user.id,
        addressId: addressId,
        shippingCost: String(shippingCost),
        cartItems: JSON.stringify(items)
      }
    })

    return NextResponse.json({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    console.error('Erro ao criar Payment Intent:', error)
    return NextResponse.json({ message: 'Erro interno do servidor ao processar o pagamento.' }, { status: 500 })
  }
}
