import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSupabaseAuthTokensFromCookies } from '@/lib/supabaseAuthCookies'

const ADMIN_PATHS = ['/admin']
const DASHBOARD_PATHS = ['/dashboard', '/dashboard-v2']
const SENSITIVE_AUTH_PATHS = ['/claim-profile', '/gmb-select', '/onboarding']
const STAFF_PATHS = [...ADMIN_PATHS, ...DASHBOARD_PATHS, ...SENSITIVE_AUTH_PATHS]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip static files, api routes, _next
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  const authTokens = getSupabaseAuthTokensFromCookies(request.cookies.getAll())
  const hasAuthSession = Boolean(authTokens?.accessToken)

  // Protected routes
  const isProtected = STAFF_PATHS.some(p => pathname.startsWith(p))
  if (isProtected && !hasAuthSession) {
    const loginUrl = new URL('/auth', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Redirect authenticated users away from auth page
  if (pathname.startsWith('/auth') && hasAuthSession && !pathname.includes('callback')) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

// Run only where it does something: protected pages and the sign-in page.
// Matching every route made each public page view a middleware invocation.
export const config = {
  matcher: [
    '/admin/:path*',
    '/dashboard/:path*',
    '/dashboard-v2/:path*',
    '/claim-profile/:path*',
    '/gmb-select/:path*',
    '/onboarding/:path*',
    '/auth/:path*',
  ],
}
