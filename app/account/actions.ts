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

// Only allow redirecting back into our own /account or /boxes routes after login.
function safeNext(next: FormDataEntryValue | null): string {
  const value = (next as string | null) ?? ''
  return value.startsWith('/account') || value.startsWith('/boxes') ? value : '/account/dashboard'
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
    options: {
      emailRedirectTo: `${SITE_URL}/auth/callback?next=/account/onboarding`,
    },
  })

  if (error) {
    return { status: 'error', message: error.message }
  }

  redirect('/account/verify-email')
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

  redirect(safeNext(formData.get('next')))
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
    redirectTo: `${SITE_URL}/auth/callback?next=/account/reset-password`,
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

// ── Save customer profile (onboarding) ──
export async function saveCustomerProfile(
  _prev: OnboardingState,
  formData: FormData
): Promise<OnboardingState> {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return { status: 'error', message: 'Session expired. Please log in again.' }
  }

  const full_name = (formData.get('full_name') as string).trim()
  const phone = (formData.get('phone') as string).trim()

  if (!full_name || !phone) {
    return { status: 'error', message: 'Please complete all required fields.' }
  }

  const { error } = await supabase.from('customers').upsert({
    id: user.id,
    full_name,
    phone,
    onboarding_complete: true,
  })

  if (error) {
    console.error('Customer upsert error:', error.message)
    return { status: 'error', message: 'Could not save your profile. Please try again.' }
  }

  redirect('/boxes')
}
