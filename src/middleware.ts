import { jwtVerify } from 'jose'
import { NextResponse, type NextRequest } from 'next/server'

// --- CONFIGURAÇÕES ---
const PUBLIC_ROUTES = ['/', '/products']
const AUTH_ROUTES = ['/login', '/register']
const ADMIN_ROUTES = ['/admin']
const LOGIN_URL = '/login'
const HOME_URL = '/'

// --- TIPOS ---
interface DecodedToken {
  id: string
  role: 'ADMIN' | 'USER'
}

// --- O MIDDLEWARE (ASSÍNCRONO) ---

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const authToken = request.cookies.get('token')?.value

  console.log('🛡️ Middleware (Edge Runtime) executando para ->', pathname)

  // 1. Lógica para rotas de autenticação (/login, /register)
  if (AUTH_ROUTES.includes(pathname)) {
    if (authToken) {
      return NextResponse.redirect(new URL(HOME_URL, request.url))
    }
    return NextResponse.next()
  }

  // 2. Lógica para rotas públicas
  if (PUBLIC_ROUTES.includes(pathname) || pathname.startsWith('/products')) {
    return NextResponse.next()
  }

  // A partir daqui, todas as rotas são consideradas PRIVADAS

  // 3. Se não há token em uma rota privada, redireciona para o login
  if (!authToken) {
    const redirectUrl = new URL(LOGIN_URL, request.url)
    redirectUrl.searchParams.set('redirectedFrom', pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // 4. Se há token, verifica sua validade e autorização com 'jose'
  try {
    // Codifica o segredo para o formato que 'jose' espera
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!)

    // Verifica o token usando jwtVerify (assíncrono)
    const { payload } = await jwtVerify<DecodedToken>(authToken, secret)

    // Lógica para rotas de Admin
    if (ADMIN_ROUTES.some(route => pathname.startsWith(route))) {
      if (payload.role !== 'ADMIN') {
        return NextResponse.redirect(new URL(HOME_URL, request.url))
      }
    }

    // Usuário autenticado e autorizado, passa os dados via headers
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-user-id', payload.id)
    requestHeaders.set('x-user-role', payload.role)

    return NextResponse.next({
      request: {
        headers: requestHeaders
      }
    })
  } catch (error) {
    // O erro pode ser por token expirado, assinatura inválida, etc.
    console.error("❌ Erro na verificação do token com 'jose':", error)
    const redirectUrl = new URL(LOGIN_URL, request.url)
    const response = NextResponse.redirect(redirectUrl)
    response.cookies.delete('token')
    return response
  }
}

// --- MATCHER ---
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|images).*)']
}
