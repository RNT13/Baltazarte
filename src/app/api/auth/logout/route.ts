import { serialize } from 'cookie'
import { NextResponse } from 'next/server'

export async function POST() {
  const response = NextResponse.json({ success: true })
  response.headers.set(
    'Set-Cookie',
    serialize('token', '', {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 0
    })
  )
  return response
}
