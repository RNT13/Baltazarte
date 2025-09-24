import { getUserFromRequest } from '@/utils/auth'
import { prisma } from '@/utils/prisma'
import { Prisma } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/products/:id
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = await params
    const product = await prisma.product.findUnique({
      where: { id },
      include: { category: true }
    })
    if (!product) {
      return NextResponse.json({ message: 'Produto não encontrado' }, { status: 404 })
    }
    return NextResponse.json(product)
  } catch {
    return NextResponse.json({ message: 'Erro ao buscar produto' }, { status: 500 })
  }
}

// PUT /api/products/:id
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await getUserFromRequest(req)
  if (!user || user.role !== 'ADMIN') {
    return NextResponse.json({ message: 'Não autorizado' }, { status: 403 })
  }

  try {
    const { id } = await params
    const body: unknown = await req.json()

    const existingProduct = await prisma.product.findUnique({ where: { id } })
    if (!existingProduct) {
      return NextResponse.json({ message: 'Produto não encontrado' }, { status: 404 })
    }

    const updateData: Prisma.ProductUpdateInput = {}

    const requestData = body as { [key: string]: unknown }

    if (typeof requestData.name === 'string') updateData.name = requestData.name
    if (typeof requestData.description === 'string') updateData.description = requestData.description
    if (typeof requestData.thumbnail === 'string') updateData.thumbnail = requestData.thumbnail

    if (Array.isArray(requestData.gallery)) updateData.gallery = requestData.gallery

    if (requestData.originalPrice !== undefined) updateData.originalPrice = Number(requestData.originalPrice)
    if (requestData.discount !== undefined) updateData.discount = Number(requestData.discount)
    if (requestData.stock !== undefined) updateData.stock = Number(requestData.stock)
    if (requestData.sold !== undefined) updateData.sold = Number(requestData.sold)

    if (typeof requestData.highlight === 'boolean') updateData.highlight = requestData.highlight
    if (typeof requestData.active === 'boolean') updateData.active = requestData.active

    if (typeof requestData.categoryId === 'string') {
      updateData.category = { connect: { id: requestData.categoryId } }
    }

    const originalPrice = (updateData.originalPrice as number) ?? existingProduct.originalPrice
    const discount = (updateData.discount as number) ?? existingProduct.discount
    updateData.salePrice = originalPrice * (1 - discount / 100)

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: updateData
    })

    return NextResponse.json(updatedProduct)
  } catch (error) {
    console.error('Erro ao atualizar produto:', error)
    return NextResponse.json({ message: 'Erro ao atualizar produto' }, { status: 500 })
  }
}

// PATCH /api/products/:id
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await getUserFromRequest(req)
  if (!user || user.role !== 'ADMIN') {
    return NextResponse.json({ message: 'Não autorizado' }, { status: 403 })
  }

  try {
    const data = await req.json()
    const { id } = await params
    const { name, category, description, originalPrice, thumbnail, gallery, discount, stock, highlight, sold, active } = data

    const updatedProduct = await prisma.product.update({
      where: { id: id },
      data: { name, category, description, originalPrice, thumbnail, gallery, discount, stock, highlight, sold, active }
    })
    return NextResponse.json(updatedProduct)
  } catch {
    return NextResponse.json({ message: 'Erro ao atualizar produto' }, { status: 500 })
  }
}

// DELETE /api/products/:id
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await getUserFromRequest(req)
  if (!user || user.role !== 'ADMIN') {
    return NextResponse.json({ message: 'Não autorizado' }, { status: 403 })
  }

  try {
    const { id } = await params
    const deletedProduct = await prisma.product.delete({
      where: { id }
    })
    return NextResponse.json(deletedProduct)
  } catch {
    return NextResponse.json({ message: 'Produto não encontrado' }, { status: 404 })
  }
}
