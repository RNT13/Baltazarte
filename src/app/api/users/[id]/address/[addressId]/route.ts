import { getUserFromRequest } from '@/utils/auth'
import { prisma } from '@/utils/prisma'
import { NextRequest, NextResponse } from 'next/server'

// GET endereço específico
export async function GET(req: Request, { params }: { params: { id: string; addressId: string } }) {
  const { id, addressId } = params
  const address = await prisma.address.findUnique({ where: { id: addressId } })

  // Validação de segurança: o endereço pertence mesmo a este usuário?
  if (!address || address.userId !== id) {
    return NextResponse.json({ error: 'Endereço não encontrado ou não pertence ao usuário' }, { status: 404 })
  }
  return NextResponse.json(address)
}

// PUT/PATCH atualizar endereço
async function handleUpdate(req: Request, params: { addressId: string }) {
  const { addressId } = params
  const body = await req.json()
  const updated = await prisma.address.update({
    where: { id: addressId },
    data: body
  })
  return NextResponse.json(updated)
}

export { handleUpdate as PATCH, handleUpdate as PUT }

// DELETE
export async function DELETE(req: NextRequest, { params }: { params: { id: string; addressId: string } }) {
  try {
    const requestingUser = await getUserFromRequest(req)
    if (!requestingUser) {
      return NextResponse.json({ message: 'Não autenticado.' }, { status: 401 })
    }

    const { id: userId, addressId } = await params

    const addressToDelete = await prisma.address.findUnique({
      where: { id: addressId }
    })

    if (!addressToDelete) {
      return NextResponse.json({ message: 'Endereço não encontrado.' }, { status: 404 })
    }

    // Validação de segurança: O usuário só pode deletar o próprio endereço (a menos que seja ADMIN)
    if (requestingUser.role !== 'ADMIN' && addressToDelete.userId !== requestingUser.id) {
      return NextResponse.json({ message: 'Acesso negado. Você não tem permissão para deletar este endereço.' }, { status: 403 })
    }

    // Validação de segurança adicional: O userId da URL deve corresponder ao do token
    if (requestingUser.role !== 'ADMIN' && userId !== requestingUser.id) {
      return NextResponse.json({ message: 'Acesso negado. Conflito de ID de usuário.' }, { status: 403 })
    }

    const ordersUsingAddress = await prisma.order.findFirst({
      where: { shippingAddressId: addressId }
    })

    if (ordersUsingAddress) {
      return NextResponse.json({ message: 'Este endereço não pode ser excluído pois está vinculado a um ou mais pedidos.' }, { status: 409 })
    }

    await prisma.address.delete({
      where: { id: addressId }
    })

    return NextResponse.json({ message: 'Endereço deletado com sucesso' })
  } catch (error) {
    console.error('Erro inesperado ao deletar endereço:', error)
    if (error instanceof Error && error.message.includes('sync-dynamic-apis')) {
      return NextResponse.json({ message: 'Erro de configuração da rota no servidor.' }, { status: 500 })
    }
    return NextResponse.json({ message: 'Erro interno no servidor.' }, { status: 500 })
  }
}
