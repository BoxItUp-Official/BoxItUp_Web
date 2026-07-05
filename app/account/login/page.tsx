'use client'

import { Suspense, useActionState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { signInWithEmail, type AuthState } from '../actions'
import OAuthButtons from '../OAuthButtons'

const initial: AuthState = { status: 'idle', message: '' }

export default function AccountLoginPage() {
  return (
    <Suspense>
      <AccountLoginForm />
    </Suspense>
  )
}

function AccountLoginForm() {
  const [state, action, pending] = useActionState(signInWithEmail, initial)
  const searchParams = useSearchParams()
  const next = searchParams.get('next') ?? ''

  return (
    <main className="account-auth">
      <div className="account-auth__card">
        <div className="account-auth__eyebrow">My Account</div>
        <h1 className="account-auth__title">Welcome back</h1>
        <p className="account-auth__sub">
          Sign in to reserve boxes and see your order history.
        </p>

        <OAuthButtons next={next} />

        <div className="account-divider">or sign in with email</div>

        <form action={action}>
          <input type="hidden" name="next" value={next} />
          <div className="account-field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="you@example.com" required />
          </div>
          <div className="account-field">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label htmlFor="password">Password</label>
              <Link href="/account/forgot-password" style={{ fontSize: '0.82rem', color: 'var(--clr-accent)', fontWeight: 600 }}>
                Forgot password?
              </Link>
            </div>
            <input type="password" id="password" name="password" placeholder="Your password" required />
          </div>

          {state.status === 'error' && (
            <div className="account-error">{state.message}</div>
          )}

          <div className="account-submit">
            <button type="submit" className="btn btn--primary btn--large" disabled={pending}>
              {pending ? 'Signing in…' : 'Sign in'}
            </button>
          </div>
        </form>

        <p className="account-auth__footer">
          Don&apos;t have an account?{' '}
          <Link href="/account/signup">Sign up free</Link>
        </p>
      </div>
    </main>
  )
}
