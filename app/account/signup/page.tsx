'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { signUpWithEmail, type AuthState } from '../actions'
import OAuthButtons from '../OAuthButtons'

const initial: AuthState = { status: 'idle', message: '' }

export default function AccountSignupPage() {
  const [state, action, pending] = useActionState(signUpWithEmail, initial)

  return (
    <main className="account-auth">
      <div className="account-auth__card">
        <div className="account-auth__eyebrow">My Account</div>
        <h1 className="account-auth__title">Create your account</h1>
        <p className="account-auth__sub">
          Sign up to reserve surprise boxes from local stores near you.
        </p>

        <OAuthButtons />

        <div className="account-divider">or continue with email</div>

        <form action={action}>
          <div className="account-field">
            <label htmlFor="email">Email *</label>
            <input type="email" id="email" name="email" placeholder="you@example.com" required />
          </div>
          <div className="account-field">
            <label htmlFor="password">Password *</label>
            <input type="password" id="password" name="password" placeholder="At least 8 characters" required />
          </div>
          <div className="account-field">
            <label htmlFor="confirm">Confirm password *</label>
            <input type="password" id="confirm" name="confirm" placeholder="Repeat password" required />
          </div>

          {state.status === 'error' && (
            <div className="account-error">{state.message}</div>
          )}

          <div className="account-submit">
            <button type="submit" className="btn btn--primary btn--large" disabled={pending}>
              {pending ? 'Creating account…' : 'Create account'}
            </button>
          </div>
        </form>

        <p className="account-auth__footer">
          Already have an account?{' '}
          <Link href="/account/login">Sign in</Link>
        </p>
      </div>
    </main>
  )
}
