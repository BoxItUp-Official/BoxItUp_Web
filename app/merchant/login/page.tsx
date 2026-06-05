'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { signInWithEmail, type AuthState } from '../actions'
import OAuthButtons from '../OAuthButtons'

const initial: AuthState = { status: 'idle', message: '' }

export default function MerchantLoginPage() {
  const [state, action, pending] = useActionState(signInWithEmail, initial)

  return (
    <main className="merchant-auth">
      <div className="merchant-auth__card">
        <div className="merchant-auth__eyebrow">Merchant Portal</div>
        <h1 className="merchant-auth__title">Welcome back</h1>
        <p className="merchant-auth__sub">
          Sign in to manage your store and continue your onboarding.
        </p>

        <OAuthButtons />

        <div className="merchant-divider">or sign in with email</div>

        <form action={action}>
          <div className="merchant-field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="you@store.com" required />
          </div>
          <div className="merchant-field">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" placeholder="Your password" required />
          </div>

          {state.status === 'error' && (
            <div className="merchant-error">{state.message}</div>
          )}

          <div className="merchant-submit">
            <button type="submit" className="btn btn--primary btn--large" disabled={pending}>
              {pending ? 'Signing in…' : 'Sign in'}
            </button>
          </div>
        </form>

        <p className="merchant-auth__footer">
          Don&apos;t have an account?{' '}
          <Link href="/merchant/signup">Sign up free</Link>
        </p>
      </div>
    </main>
  )
}
