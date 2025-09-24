import { prisma } from '@/utils/prisma'
import bcrypt from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    // Recebe dados do body
    const { name, email, password } = await req.json()
    const normalizedEmail = email.toLowerCase().trim()

    // Valida campos obrigatórios
    if (!name || !email || !password) {
      return NextResponse.json({ success: false, message: 'Preencha todos os campos' }, { status: 400 })
    }

    // Verifica se usuário já existe
    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail }
    })
    if (existingUser) {
      return NextResponse.json({ success: false, message: 'Usuário já existe' }, { status: 400 })
    }

    // Define role (ADMIN ou USER)
    const adminEmails = ['adminteste@teste.com']
    const role = adminEmails.includes(normalizedEmail) ? 'ADMIN' : 'USER'

    // Criptografa senha
    const hashedPassword = await bcrypt.hash(password, 10)

    // Cria novo usuário
    const newUser = await prisma.user.create({
      data: {
        name,
        email: normalizedEmail,
        password: hashedPassword,
        role
      }
    })

    // Retorna resposta padronizada
    return NextResponse.json(
      {
        success: true,
        message: 'Usuário criado com sucesso',
        data: { id: newUser.id, name: newUser.name, email: newUser.email }
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Erro no registro:', error)
    return NextResponse.json({ success: false, message: 'Erro interno no servidor' }, { status: 500 })
  }
}
