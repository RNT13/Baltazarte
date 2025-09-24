import { getUserFromRequest } from '@/utils/auth'
import { prisma } from '@/utils/prisma'
import { NextRequest, NextResponse } from 'next/server'

// POST /api/products - CRIAR UM NOVO PRODUTO
export async function POST(req: NextRequest) {
  const user = await getUserFromRequest(req)
  if (!user || user.role !== 'ADMIN') {
    return NextResponse.json({ message: 'Não autorizado' }, { status: 403 })
  }

  try {
    const data = await req.json()

    if (!data.name || typeof data.originalPrice !== 'number' || !data.categoryId) {
      return NextResponse.json({ message: 'Dados incompletos para criar o produto.' }, { status: 400 })
    }

    const originalPrice = Number(data.originalPrice)
    const discount = Number(data.discount) || 0
    const salePrice = originalPrice * (1 - discount / 100)

    const newProduct = await prisma.product.create({
      data: {
        name: data.name,
        description: data.description,

        originalPrice: originalPrice,
        salePrice: salePrice,

        thumbnail: data.thumbnail,
        gallery: data.gallery,
        discount: discount,
        stock: Number(data.stock),
        highlight: Boolean(data.highlight),
        sold: Number(data.sold),
        active: Boolean(data.active),
        category: {
          connect: { id: data.categoryId }
        },
        creator: {
          connect: { id: user.id }
        }
      },
      include: { category: true }
    })

    return NextResponse.json(newProduct, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar produto:', error)
    return NextResponse.json({ message: 'Erro interno ao criar o produto' }, { status: 500 })
  }
}

// GET /api/products - LISTAR TODOS OS PRODUTOS
export async function GET(req: NextRequest) {
  try {
    const highlight = req.nextUrl.searchParams.get('highlight')

    const products = await prisma.product.findMany({
      where: highlight === 'true' ? { highlight: true } : undefined,
      include: { category: true }
    })

    return NextResponse.json(products)
  } catch (error) {
    console.error('Erro ao buscar produtos:', error)
    return NextResponse.json({ message: 'Erro ao buscar produtos' }, { status: 500 })
  }
}
