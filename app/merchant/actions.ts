'use server'

import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'

export interface AuthState {
  status: 'idle' | 'error'
  message: string
}

export interface OnboardingState {
  status: 'idle' | 'error'
  message: string
}

// ── Sign up with email/password ──
export async function signUpWithEmail(
  _prev: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = (formData.get('email') as string).trim()
  const password = formData.get('password') as string
  const confirm = formData.get('confirm') as string

  if (!email || !password) {
    return { status: 'error', message: 'Please fill in all fields.' }
  }
  if (password.length < 8) {
    return { status: 'error', message: 'Password must be at least 8 characters.' }
  }
  if (password !== confirm) {
    return { status: 'error', message: 'Passwords do not match.' }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/merchant/onboarding` },
  })

  if (error) {
    return { status: 'error', message: error.message }
  }

  redirect('/merchant/onboarding')
}

// ── Sign in with email/password ──
export async function signInWithEmail(
  _prev: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = (formData.get('email') as string).trim()
  const password = formData.get('password') as string

  if (!email || !password) {
    return { status: 'error', message: 'Please fill in all fields.' }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return { status: 'error', message: 'Invalid email or password.' }
  }

  redirect('/merchant/onboarding')
}

// ── Save merchant profile ──
export async function saveMerchantProfile(
  _prev: OnboardingState,
  formData: FormData
): Promise<OnboardingState> {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return { status: 'error', message: 'Session expired. Please log in again.' }
  }

  const store_name = (formData.get('store_name') as string).trim()
  const category = (formData.get('category') as string).trim()
  const address = (formData.get('address') as string).trim()
  const city = (formData.get('city') as string).trim()
  const phone = (formData.get('phone') as string | null)?.trim() || null
  const line_id = (formData.get('line_id') as string | null)?.trim() || null
  const description = (formData.get('description') as string | null)?.trim() || null

  if (!store_name || !category || !address || !city) {
    return { status: 'error', message: 'Please complete all required fields.' }
  }

  const { error } = await supabase.from('merchants').upsert({
    id: user.id,
    store_name,
    category,
    address,
    city,
    phone,
    line_id,
    description,
    onboarding_complete: true,
  })

  if (error) {
    console.error('Merchant upsert error:', error.message)
    return { status: 'error', message: 'Could not save your profile. Please try again.' }
  }

  redirect('/merchant/onboarding/complete')
}
