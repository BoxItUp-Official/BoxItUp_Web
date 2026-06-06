import { createClient } from '@/lib/supabase-server'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/merchant/onboarding'
  const errorParam = searchParams.get('error')

  // Supabase error in redirect (e.g. expired link)
  if (errorParam) {
    const desc = searchParams.get('error_description') ?? 'Something went wrong.'
    return NextResponse.redirect(
      `${origin}/merchant/login?error=${encodeURIComponent(desc)}`
    )
  }

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  return NextResponse.redirect(`${origin}/merchant/login?error=Authentication+failed.+Please+try+again.`)
}
