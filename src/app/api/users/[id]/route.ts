import { prisma } from '@/utils/prisma'
import { NextResponse } from 'next/server'

// GET /api/users/[id]
export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params

  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        address: true
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error(`Erro ao buscar usuário ${id}:`, error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}

// DELETE /api/users/[id]
export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params

  try {
    await prisma.user.delete({ where: { id } })
    return NextResponse.json({ message: 'Usuário deletado com sucesso' }, { status: 200 })
  } catch (error) {
    console.error(`Erro ao deletar usuário ${id}:`, error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}
