import { getUserFromRequest } from '@/utils/auth'
import { prisma } from '@/utils/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import MessageReplyEmail from '../../../../../../../emails/MessageReplyEmail'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const { id: messageId } = params
  const admin = await getUserFromRequest(request)

  if (!admin || admin.role !== 'ADMIN') {
    return NextResponse.json({ message: 'Acesso negado.' }, { status: 403 })
  }

  try {
    const body = await request.json()
    const { responseText } = body

    if (!responseText || typeof responseText !== 'string') {
      return NextResponse.json({ message: 'O texto da resposta é obrigatório.' }, { status: 400 })
    }

    // 1. ATUALIZA a mensagem no banco
    const answeredMessage = await prisma.messages.update({
      where: { id: messageId },
      data: {
        response: responseText,
        status: 'ANSWERED'
      },
      select: {
        id: true,
        name: true,
        email: true,
        message: true,
        response: true,
        status: true
      }
    })

    // 2. ENVIA O E-MAIL DE NOTIFICAÇÃO
    try {
      await resend.emails.send({
        from: 'Baltazarte <onboarding@resend.dev>', // trocar em produção
        to: [answeredMessage.email],
        subject: 'Sua mensagem foi respondida!',
        react: MessageReplyEmail({
          userName: answeredMessage.name,
          originalMessage: answeredMessage.message,
          responseText: responseText
        })
      })
    } catch (emailError) {
      console.error('Falha ao enviar e-mail de notificação:', emailError)
    }

    return NextResponse.json(answeredMessage)
  } catch (error) {
    if (error instanceof Error && error.message.includes('Record to update not found.')) {
      return NextResponse.json({ message: 'Mensagem não encontrada.' }, { status: 404 })
    }
    console.error('Erro ao responder mensagem:', error)
    return NextResponse.json({ message: 'Erro interno no servidor.' }, { status: 500 })
  }
}
