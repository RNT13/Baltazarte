import { getUserFromRequest } from '@/utils/auth'
import { prisma } from '@/utils/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const user = await getUserFromRequest(req)
    if (!user) return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })

    const userCart = await prisma.cart.findUnique({ where: { userId: user.id } })
    if (userCart) {
      await prisma.cartItem.deleteMany({ where: { cartId: userCart.id } })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
