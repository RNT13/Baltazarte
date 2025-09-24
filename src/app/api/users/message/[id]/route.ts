import { getUserFromRequest } from '@/utils/auth'
import { prisma } from '@/utils/prisma'
import { NextRequest, NextResponse } from 'next/server'

// --- GET: Buscar mensagem por ID ---
export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params
  const user = await getUserFromRequest(request)
  if (!user) return NextResponse.json({ message: 'Autenticação necessária.' }, { status: 401 })

  try {
    const message = await prisma.messages.findUnique({ where: { id } })
    if (!message) return NextResponse.json({ message: 'Mensagem não encontrada' }, { status: 404 })

    if (user.role !== 'ADMIN' && message.userId !== user.id) {
      return NextResponse.json({ message: 'Sem permissão para acessar esta mensagem' }, { status: 403 })
    }

    return NextResponse.json(message)
  } catch (error) {
    console.error('Erro ao buscar mensagem:', error)
    return NextResponse.json({ message: 'Erro interno' }, { status: 500 })
  }
}

// --- PATCH: Editar mensagem ---
export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params
  const user = await getUserFromRequest(request)
  if (!user) return NextResponse.json({ message: 'Autenticação necessária.' }, { status: 401 })

  try {
    const data = await request.json()
    if (!data.status) return NextResponse.json({ message: 'Status obrigatório' }, { status: 400 })

    const existing = await prisma.messages.findUnique({ where: { id } })
    if (!existing) return NextResponse.json({ message: 'Mensagem não encontrada' }, { status: 404 })

    if (user.role !== 'ADMIN' && existing.userId !== user.id) {
      return NextResponse.json({ message: 'Sem permissão para editar esta mensagem' }, { status: 403 })
    }

    const updated = await prisma.messages.update({
      where: { id },
      data: { status: data.status }
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error('Erro ao atualizar mensagem:', error)
    return NextResponse.json({ message: 'Erro interno' }, { status: 500 })
  }
}

// --- DELETE: Deletar mensagem ---
export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params
  const user = await getUserFromRequest(request)
  if (!user) return NextResponse.json({ message: 'Autenticação necessária.' }, { status: 401 })

  try {
    const existing = await prisma.messages.findUnique({ where: { id } })
    if (!existing) return NextResponse.json({ message: 'Mensagem não encontrada' }, { status: 404 })

    if (user.role !== 'ADMIN' && existing.userId !== user.id) {
      return NextResponse.json({ message: 'Sem permissão para excluir esta mensagem' }, { status: 403 })
    }

    await prisma.messages.delete({ where: { id } })
    return NextResponse.json({ message: 'Mensagem deletada com sucesso' })
  } catch (error) {
    console.error('Erro ao deletar mensagem:', error)
    return NextResponse.json({ message: 'Erro interno' }, { status: 500 })
  }
}
