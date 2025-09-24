import { prisma } from '@/utils/prisma'
import { NextResponse } from 'next/server'

type Params = {
  params: { id: string }
}

// GET /api/categories/[id] → retorna uma categoria específica
export async function GET(req: Request, { params }: Params) {
  try {
    const category = await prisma.category.findUnique({
      where: { id: params.id }
    })

    if (!category) {
      return NextResponse.json({ error: 'Categoria não encontrada' }, { status: 404 })
    }

    return NextResponse.json(category)
  } catch (error) {
    console.error('Erro ao buscar categoria:', error)
    return NextResponse.json({ error: 'Erro ao buscar categoria' }, { status: 500 })
  }
}

// PUT /api/categories/[id] → atualiza categoria
export async function PUT(req: Request, { params }: Params) {
  try {
    const body = await req.json()

    if (!body.name || body.name.trim() === '') {
      return NextResponse.json({ error: 'Nome da categoria é obrigatório' }, { status: 400 })
    }

    const category = await prisma.category.update({
      where: { id: params.id },
      data: { name: body.name }
    })

    return NextResponse.json(category)
  } catch (error) {
    console.error('Erro ao atualizar categoria:', error)
    return NextResponse.json({ error: 'Erro ao atualizar categoria' }, { status: 500 })
  }
}

// DELETE /api/categories/[id] → remove categoria
export async function DELETE(req: Request, { params }: Params) {
  try {
    await prisma.category.delete({
      where: await { id: params.id }
    })

    return NextResponse.json({ message: 'Categoria removida com sucesso' })
  } catch (error) {
    console.error('Erro ao deletar categoria:', error)
    return NextResponse.json({ error: 'Erro ao deletar categoria' }, { status: 500 })
  }
}
