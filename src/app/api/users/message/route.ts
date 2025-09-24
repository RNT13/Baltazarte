import { getUserFromRequest } from '@/utils/auth'
import { prisma } from '@/utils/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const user = await getUserFromRequest(request)
  const data = await request.json()
  const { name, email, tel, type, message } = data

  if (!name || !email || !tel || !type || !message) {
    return NextResponse.json({ message: 'Preencha todos os campos.' }, { status: 400 })
  }

  try {
    const newMessage = await prisma.messages.create({
      data: {
        name,
        email,
        tel,
        type,
        message,
        ...(user && { userId: user.id }) // conecta ao user se logado
      }
    })

    return NextResponse.json(newMessage, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar mensagem no Prisma:', error)
    return NextResponse.json({ message: 'Erro interno ao salvar a mensagem.' }, { status: 500 })
  }
}

// --- GET: Listar mensagens ---
// - Admin → vê todas
// - User → vê apenas as dele
// - Guest → não tem acesso
export async function GET(request: NextRequest) {
  const user = await getUserFromRequest(request)
  if (!user) {
    return NextResponse.json({ message: 'Autenticação necessária.' }, { status: 401 })
  }

  try {
    const messages =
      user.role === 'ADMIN'
        ? await prisma.messages.findMany({ orderBy: { createdAt: 'desc' } })
        : await prisma.messages.findMany({
            where: { userId: user.id },
            orderBy: { createdAt: 'desc' }
          })

    return NextResponse.json(messages)
  } catch (error) {
    console.error('Erro ao buscar mensagens:', error)
    return NextResponse.json({ message: 'Erro interno ao buscar mensagens.' }, { status: 500 })
  }
}
