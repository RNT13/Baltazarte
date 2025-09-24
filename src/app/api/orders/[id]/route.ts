import { getUserFromRequest } from '@/utils/auth'
import { prisma } from '@/utils/prisma'
import { OrderStatus as PrismaOrderStatus } from '@prisma/client'
import { type NextRequest, NextResponse } from 'next/server'

interface PrismaClientError {
  code: string
}

function isValidOrderStatus(status: unknown): status is PrismaOrderStatus {
  return typeof status === 'string' && (Object.values(PrismaOrderStatus) as string[]).includes(status)
}

function isPrismaError(error: unknown): error is PrismaClientError {
  return typeof error === 'object' && error !== null && 'code' in error && typeof (error as { code: unknown }).code === 'string'
}

// GET /api/orders/{id}
export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const user = await getUserFromRequest(req)
    if (!user) {
      return NextResponse.json({ message: 'Não autorizado' }, { status: 401 })
    }

    const { id } = await context.params

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, name: true, email: true } },
        products: { include: { product: true } },
        shippingAddress: true
      }
    })

    if (!order) {
      return NextResponse.json({ message: 'Pedido não encontrado' }, { status: 404 })
    }

    if (user.role !== 'ADMIN' && order.userId !== user.id) {
      return NextResponse.json({ message: 'Acesso negado' }, { status: 403 })
    }

    return NextResponse.json(order)
  } catch (error) {
    console.error(`Erro ao buscar pedido:`, error)
    return NextResponse.json({ message: 'Erro interno ao buscar o pedido' }, { status: 500 })
  }
}

// PATCH /api/orders/{id}
export async function PATCH(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const user = await getUserFromRequest(req)
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ message: 'Não autorizado' }, { status: 403 })
    }

    const { id } = await context.params
    const body = await req.json()
    const newStatusString = body.status

    if (!isValidOrderStatus(newStatusString)) {
      return NextResponse.json({ message: `Status inválido: "${newStatusString}".` }, { status: 400 })
    }

    const updatedOrder = await prisma.order.update({
      where: { id },
      data: { status: newStatusString }
    })

    return NextResponse.json(updatedOrder)
  } catch (error) {
    if (isPrismaError(error) && error.code === 'P2025') {
      return NextResponse.json({ message: 'Pedido não encontrado' }, { status: 404 })
    }
    console.error(`Erro ao atualizar pedido:`, error)
    return NextResponse.json({ message: 'Erro interno ao atualizar o pedido' }, { status: 500 })
  }
}

// DELETE /api/orders/{id}
export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const user = await getUserFromRequest(req)
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ message: 'Não autorizado' }, { status: 403 })
    }

    const { id } = await context.params

    await prisma.order.delete({ where: { id } })

    return NextResponse.json({ message: 'Pedido deletado com sucesso' }, { status: 200 })
  } catch (error) {
    if (isPrismaError(error) && error.code === 'P2025') {
      return NextResponse.json({ message: 'Pedido não encontrado' }, { status: 404 })
    }
    console.error(`Erro ao deletar pedido:`, error)
    return NextResponse.json({ message: 'Erro interno ao deletar o pedido' }, { status: 500 })
  }
}
