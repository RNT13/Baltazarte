import { getUserFromRequest } from '@/utils/auth'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const user = await getUserFromRequest(req)

    if (!user) {
      return NextResponse.json({ success: false, message: 'Usuário não autenticado ou token inválido.' }, { status: 401 })
    }

    return NextResponse.json(user, { status: 200 })
  } catch (error) {
    console.error('Erro inesperado na rota de verificação:', error)
    return NextResponse.json({ success: false, message: 'Ocorreu um erro interno no servidor.' }, { status: 500 })
  }
}
