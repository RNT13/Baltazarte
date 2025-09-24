import { prisma } from '@/utils/prisma'
import { jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/cart
export async function GET() {
  try {
    const token = (await cookies()).get('token')?.value
    if (!token) return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })

    const secret = new TextEncoder().encode(process.env.JWT_SECRET!)
    const { payload } = (await jwtVerify(token, secret)) as { payload: { id: string } }
    const userId = payload.id

    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: { items: { include: { product: true } } }
    })

    return NextResponse.json(cart || { items: [] })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Erro ao buscar carrinho' }, { status: 500 })
  }
}

// POST /api/cart
export async function POST(req: NextRequest) {
  try {
    const token = (await cookies()).get('token')?.value
    if (!token) return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })

    const secret = new TextEncoder().encode(process.env.JWT_SECRET!)
    const { payload } = (await jwtVerify(token, secret)) as { payload: { id: string } }
    const userId = payload.id

    const body = await req.json()
    const { productId, quantity } = body as { productId: string; quantity: number }

    // Buscar ou criar carrinho
    let cart = await prisma.cart.findUnique({ where: { userId } })
    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId }
      })
    }

    // Verificar se item já existe
    const existingItem = await prisma.cartItem.findUnique({
      where: { productId_cartId: { productId, cartId: cart.id } }
    })

    if (existingItem) {
      const updatedItem = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity }
      })
      return NextResponse.json(updatedItem)
    }

    const newItem = await prisma.cartItem.create({
      data: { cartId: cart.id, productId, quantity },
      include: { product: true }
    })

    return NextResponse.json(newItem)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Erro ao adicionar item' }, { status: 500 })
  }
}
