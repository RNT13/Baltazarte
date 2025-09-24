import { prisma } from '@/utils/prisma'
import bcrypt from 'bcryptjs'
import { serialize } from 'cookie'
import { SignJWT } from 'jose'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    // Recebe email e senha do body da requisição
    const { email, password } = await req.json()
    const normalizedEmail = email.toLowerCase().trim()

    // Busca usuário no banco
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail }
    })

    // Caso usuário não exista
    if (!user) {
      return NextResponse.json({ success: false, message: 'Usuário não encontrado' }, { status: 401 })
    }

    // Compara senha com hash
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      return NextResponse.json({ success: false, message: 'Senha incorreta' }, { status: 401 })
    }

    // --- CRIAÇÃO DO TOKEN COM 'jose' ---

    // 1. Codifica a chave secreta (mesmo processo do middleware)
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!)

    // 2. Cria o token usando a classe SignJWT
    const token = await new SignJWT({
      // Adicione aqui os dados (payload) que você quer no token
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    })
      .setProtectedHeader({ alg: 'HS256' }) // Define o algoritmo de assinatura
      .setIssuedAt() // Define o timestamp de quando o token foi criado (iat)
      .setExpirationTime('7d') // Define o tempo de expiração (exp)
      .sign(secret) // Assina o token com a chave secreta

    // --- FIM DA CRIAÇÃO DO TOKEN ---

    // Serializa cookie
    const isProd = process.env.NODE_ENV === 'production'
    const serialized = serialize('token', token, {
      secure: isProd,
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 7 dias
    })

    // Retorna resposta padronizada
    const response = NextResponse.json({ success: true, message: 'Login realizado com sucesso' }, { status: 200 })

    // Adiciona cookie no header
    response.headers.set('Set-Cookie', serialized)

    return response
  } catch (error) {
    console.error('Erro no login:', error)
    return NextResponse.json({ success: false, message: 'Erro interno no servidor' }, { status: 500 })
  }
}
