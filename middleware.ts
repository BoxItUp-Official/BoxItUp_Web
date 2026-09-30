import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl

  // Routes that require auth (but not /complete or /verify-email or /forgot-password etc.)
  const isDev = process.env.NODE_ENV === 'development'

  const requiresAuth =
    pathname.startsWith('/merchant/dashboard') ||
    (pathname.startsWith('/merchant/onboarding') && pathname !== '/merchant/onboarding/complete')

  // In dev, skip the auth wall so UI can be previewed without a session
  if (requiresAuth && !user && !isDev) {
    return NextResponse.redirect(new URL('/merchant/login', request.url))
  }

  // Logged-in merchants visiting login/signup → send straight to dashboard
  if ((pathname === '/merchant/login' || pathname === '/merchant/signup') && user) {
    return NextResponse.redirect(new URL('/merchant/dashboard', request.url))
  }

  return response
}

export const config = {
  matcher: ['/merchant/:path*'],
}
