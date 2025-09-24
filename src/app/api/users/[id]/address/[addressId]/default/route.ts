import { prisma } from '@/utils/prisma'
import { NextResponse } from 'next/server'

// PATCH definir endereço padrão
export async function PATCH(req: Request, { params }: { params: { id: string; addressId: string } }) {
  const { id, addressId } = await params

  try {
    const [, updated] = await prisma.$transaction([
      prisma.address.updateMany({
        where: { userId: id, isDefault: true },
        data: { isDefault: false }
      }),
      // 2. Define o novo endereço como padrão
      prisma.address.update({
        where: { id: addressId, userId: id }, // Garante que o endereço pertence ao usuário
        data: { isDefault: true }
      })
    ])
    return NextResponse.json(updated)
  } catch (error) {
    console.error('Erro ao definir endereço padrão:', error)
    return NextResponse.json({ error: 'Operação falhou. Endereço não encontrado ou não pertence ao usuário.' }, { status: 404 })
  }
}
