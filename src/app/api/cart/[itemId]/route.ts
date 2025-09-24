import { prisma } from '@/utils/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(req: NextRequest, context: { params: Promise<{ itemId: string }> }) {
  try {
    const { itemId } = await context.params
    const body = (await req.json()) as { quantity: number }

    const updatedItem = await prisma.cartItem.update({
      where: { id: parseInt(itemId, 10) },
      data: { quantity: body.quantity },
      include: { product: true }
    })

    return NextResponse.json(updatedItem)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Erro ao atualizar item' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest, context: { params: Promise<{ itemId: string }> }) {
  return PUT(req, context)
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ itemId: string }> }) {
  try {
    const { itemId } = await context.params
    const idAsInt = parseInt(itemId, 10)

    if (isNaN(idAsInt)) {
      return NextResponse.json({ message: 'ID do item inválido' }, { status: 400 })
    }

    const deleteResult = await prisma.cartItem.deleteMany({
      where: { id: idAsInt }
    })

    if (deleteResult.count === 0) {
      console.log(`Tentativa de deletar o CartItem com ID ${idAsInt}, mas não encontrado (provavelmente já foi deletado).`)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erro ao deletar item do carrinho:', error)
    return NextResponse.json({ message: 'Erro interno ao deletar o item' }, { status: 500 })
  }
}
