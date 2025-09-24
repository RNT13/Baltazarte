import { prisma } from '@/utils/prisma'
import { NextResponse } from 'next/server'

// GET /api/categories → lista todas
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(categories)
  } catch (error) {
    console.error('Erro ao buscar categorias:', error)
    return NextResponse.json({ error: 'Erro ao buscar categorias' }, { status: 500 })
  }
}

// POST /api/categories → cria nova
export async function POST(req: Request) {
  try {
    const body = await req.json()

    if (!body.name || body.name.trim() === '') {
      return NextResponse.json({ error: 'Nome da categoria é obrigatório' }, { status: 400 })
    }

    // slug básico: transforma em minúsculo e troca espaços por "-"
    const slug = body.name.toLowerCase().replace(/\s+/g, '-')

    const category = await prisma.category.create({
      data: {
        name: body.name,
        slug
      }
    })

    return NextResponse.json(category, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar categoria:', error)
    return NextResponse.json({ error: 'Erro ao criar categoria' }, { status: 500 })
  }
}
