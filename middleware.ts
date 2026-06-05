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

  // Protect onboarding — must be logged in
  if (pathname.startsWith('/merchant/onboarding') && !user) {
    return NextResponse.redirect(new URL('/merchant/login', request.url))
  }

  // Logged-in merchants visiting login/signup → send to onboarding
  if ((pathname === '/merchant/login' || pathname === '/merchant/signup') && user) {
    return NextResponse.redirect(new URL('/merchant/onboarding', request.url))
  }

  return response
}

export const config = {
  matcher: ['/merchant/:path*'],
}
