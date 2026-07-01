'use server'

import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'

export interface AuthState {
  status: 'idle' | 'error' | 'success'
  message: string
}

export interface OnboardingState {
  status: 'idle' | 'error'
  message: string
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

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
    options: {
      emailRedirectTo: `${SITE_URL}/auth/callback?next=/merchant/onboarding`,
    },
  })

  if (error) {
    return { status: 'error', message: error.message }
  }

  redirect('/merchant/verify-email')
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

  redirect('/merchant/dashboard')
}

// ── Forgot password ──
export async function forgotPassword(
  _prev: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = (formData.get('email') as string).trim()

  if (!email) {
    return { status: 'error', message: 'Please enter your email address.' }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${SITE_URL}/auth/callback?next=/merchant/reset-password`,
  })

  if (error) {
    return { status: 'error', message: error.message }
  }

  return { status: 'success', message: 'Reset link sent.' }
}

// ── Reset password ──
export async function resetPassword(
  _prev: AuthState,
  formData: FormData
): Promise<AuthState> {
  const password = formData.get('password') as string
  const confirm = formData.get('confirm') as string

  if (!password) {
    return { status: 'error', message: 'Please enter a new password.' }
  }
  if (password.length < 8) {
    return { status: 'error', message: 'Password must be at least 8 characters.' }
  }
  if (password !== confirm) {
    return { status: 'error', message: 'Passwords do not match.' }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.updateUser({ password })

  if (error) {
    return { status: 'error', message: error.message }
  }

  return { status: 'success', message: 'Password updated.' }
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

  // Extended onboarding fields
  const photo_url = (formData.get('photo_url') as string | null)?.trim() || null
  const avatar_icon = (formData.get('avatar_icon') as string | null)?.trim() || null
  const contact_name = (formData.get('contact_name') as string | null)?.trim() || null
  const website = (formData.get('website') as string | null)?.trim() || null
  const instagram = (formData.get('instagram') as string | null)?.trim() || null
  const business_reg_no = (formData.get('business_reg_no') as string | null)?.trim() || null

  let business_hours: unknown = null
  const rawHours = formData.get('business_hours') as string | null
  if (rawHours) {
    try { business_hours = JSON.parse(rawHours) } catch { business_hours = null }
  }

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
    photo_url,
    avatar_icon,
    contact_name,
    website,
    instagram,
    business_reg_no,
    business_hours,
    onboarding_complete: true,
  })

  if (error) {
    console.error('Merchant upsert error:', error.message)
    return { status: 'error', message: 'Could not save your profile. Please try again.' }
  }

  redirect('/merchant/onboarding/complete')
}
