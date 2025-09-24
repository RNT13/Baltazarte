import { prisma } from '@/utils/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const unreadCount = await prisma.messages.count({
      where: {
        status: 'NEW'
      }
    })

    return NextResponse.json({ count: unreadCount })
  } catch (error) {
    console.error('Erro ao contar mensagens não lidas:', error)
    return NextResponse.json({ message: 'Erro interno ao buscar a contagem.' }, { status: 500 })
  }
}
