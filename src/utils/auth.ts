import { prisma } from '@/utils/prisma'
import { jwtVerify } from 'jose'
import { NextRequest } from 'next/server'

export async function getUserFromRequest(req: NextRequest) {
  const token = req.cookies.get('token')?.value
  if (!token) return null

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!)
    const { payload } = (await jwtVerify(token, secret)) as { payload: { id: string } }

    const user = await prisma.user.findUnique({
      where: { id: payload.id },
      select: { id: true, name: true, email: true, role: true, avatar: true }
    })

    return user
  } catch {
    return null
  }
}
