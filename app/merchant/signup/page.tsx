'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { signUpWithEmail, type AuthState } from '../actions'
import OAuthButtons from '../OAuthButtons'

const initial: AuthState = { status: 'idle', message: '' }

export default function MerchantSignupPage() {
  const [state, action, pending] = useActionState(signUpWithEmail, initial)

  return (
    <main className="merchant-auth">
      <div className="merchant-auth__card">
        <div className="merchant-auth__eyebrow">Merchant Portal</div>
        <h1 className="merchant-auth__title">Create your store account</h1>
        <p className="merchant-auth__sub">
          Get started in minutes. Join Box It Up and reach customers looking for great-value food boxes.
        </p>

        <OAuthButtons />

        <div className="merchant-divider">or continue with email</div>

        <form action={action}>
          <div className="merchant-field">
            <label htmlFor="email">Business email *</label>
            <input type="email" id="email" name="email" placeholder="you@store.com" required />
          </div>
          <div className="merchant-field">
            <label htmlFor="password">Password *</label>
            <input type="password" id="password" name="password" placeholder="At least 8 characters" required />
          </div>
          <div className="merchant-field">
            <label htmlFor="confirm">Confirm password *</label>
            <input type="password" id="confirm" name="confirm" placeholder="Repeat password" required />
          </div>

          {state.status === 'error' && (
            <div className="merchant-error">{state.message}</div>
          )}

          <div className="merchant-submit">
            <button type="submit" className="btn btn--primary btn--large" disabled={pending}>
              {pending ? 'Creating account…' : 'Create account'}
            </button>
          </div>
        </form>

        <p className="merchant-auth__footer">
          Already have an account?{' '}
          <Link href="/merchant/login">Sign in</Link>
        </p>
      </div>
    </main>
  )
}
