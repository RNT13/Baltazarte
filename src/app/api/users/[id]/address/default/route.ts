import { prisma } from '@/utils/prisma'
import { NextResponse } from 'next/server'

// GET endereço padrão
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = await params
  if (!id) {
    return NextResponse.json({ error: 'ID do usuário é obrigatório' }, { status: 400 })
  }
  const address = await prisma.address.findFirst({
    where: { userId: id, isDefault: true }
  })
  if (!address) {
    return NextResponse.json({ error: 'Nenhum endereço padrão encontrado' }, { status: 404 })
  }
  return NextResponse.json(address)
}
