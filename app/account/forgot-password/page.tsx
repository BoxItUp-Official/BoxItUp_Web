'use client'

import { useActionState, useState } from 'react'
import Link from 'next/link'
import { forgotPassword, type AuthState } from '../actions'

const initial: AuthState = { status: 'idle', message: '' }

export default function AccountForgotPasswordPage() {
  const [state, action, pending] = useActionState(forgotPassword, initial)
  const [sent, setSent] = useState(false)

  if (sent || state.status === 'success' as string) {
    return (
      <main className="account-auth">
        <div className="account-auth__card" style={{ textAlign: 'center' }}>
          <div style={{
            width: '3.5rem', height: '3.5rem', borderRadius: '50%',
            background: '#d4edda', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: '1.5rem', margin: '0 auto 1.25rem',
          }}>✓</div>
          <h1 className="account-auth__title">Email sent!</h1>
          <p className="account-auth__sub">
            Check your inbox for a password reset link. It expires in 1 hour.
          </p>
          <Link href="/account/login" className="btn btn--ghost btn--large" style={{ marginTop: '0.5rem', display: 'inline-flex', justifyContent: 'center', width: '100%' }}>
            Back to sign in
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="account-auth">
      <div className="account-auth__card">
        <div className="account-auth__eyebrow">My Account</div>
        <h1 className="account-auth__title">Reset your password</h1>
        <p className="account-auth__sub">
          Enter your email and we&apos;ll send a reset link to your inbox.
        </p>

        <form action={async (fd) => { await action(fd); setSent(true) }}>
          <div className="account-field">
            <label htmlFor="email">Email address</label>
            <input type="email" id="email" name="email" placeholder="you@example.com" required />
          </div>

          {state.status === 'error' && (
            <div className="account-error">{state.message}</div>
          )}

          <div className="account-submit">
            <button type="submit" className="btn btn--primary btn--large" disabled={pending}>
              {pending ? 'Sending…' : 'Send reset link'}
            </button>
          </div>
        </form>

        <p className="account-auth__footer">
          <Link href="/account/login">← Back to sign in</Link>
        </p>
      </div>
    </main>
  )
}
