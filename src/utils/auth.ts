import { prisma } from '@/utils/prisma'
import { jwtVerify } from 'jose'
import { type NextRequest } from 'next/server'

export async function getUserFromRequest(req: NextRequest) {
  // 1. Pega o token do cookie
  const token = req.cookies.get('token')?.value
  if (!token) {
    return null // Retorna nulo se não houver token
  }

  try {
    // 2. Prepara a chave secreta
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!)

    // 3. Verifica o token e extrai o payload (ID do usuário)
    const { payload } = (await jwtVerify(token, secret)) as { payload: { id: string } }

    // 4. Busca o usuário no banco de dados
    const user = await prisma.user.findUnique({
      where: { id: payload.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        avatar: true
      }
    })

    return user
  } catch {
    return null
  }
}
