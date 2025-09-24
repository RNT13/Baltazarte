import { prisma } from '@/utils/prisma'
import { NextRequest, NextResponse } from 'next/server'

// GET todos os endereços do usuário (sem alterações)
export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params
  if (!id) {
    return NextResponse.json({ error: 'ID do usuário é obrigatório' }, { status: 400 })
  }
  const addresses = await prisma.address.findMany({ where: { userId: id } })
  return NextResponse.json(addresses)
}

// POST criar novo endereço
export async function POST(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id: userId } = await context.params
  if (!userId) {
    return NextResponse.json({ error: 'ID do usuário é obrigatório' }, { status: 400 })
  }

  try {
    const body = await req.json()

    // 1. Verifique quantos endereços o usuário já possui
    const addressCount = await prisma.address.count({
      where: { userId: userId }
    })

    // 2. Determine se este novo endereço deve ser o padrão
    const isFirstAddress = addressCount === 0

    // 3. Crie o novo endereço com a lógica aplicada
    const newAddress = await prisma.address.create({
      data: {
        ...body,
        userId: userId,
        isDefault: isFirstAddress
      }
    })

    return NextResponse.json(newAddress, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar endereço:', error)
    return NextResponse.json({ message: 'Erro interno ao criar endereço.' }, { status: 500 })
  }
}
