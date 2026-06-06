'use client'

import { useActionState, useState } from 'react'
import Link from 'next/link'
import { forgotPassword, type AuthState } from '../actions'

const initial: AuthState = { status: 'idle', message: '' }

export default function ForgotPasswordPage() {
  const [state, action, pending] = useActionState(forgotPassword, initial)
  const [sent, setSent] = useState(false)

  if (sent || state.status === 'success' as string) {
    return (
      <main className="merchant-auth">
        <div className="merchant-auth__card" style={{ textAlign: 'center' }}>
          <div style={{
            width: '3.5rem', height: '3.5rem', borderRadius: '50%',
            background: '#d4edda', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: '1.5rem', margin: '0 auto 1.25rem',
          }}>✓</div>
          <h1 className="merchant-auth__title">Email sent!</h1>
          <p className="merchant-auth__sub">
            Check your inbox for a password reset link. It expires in 1 hour.
          </p>
          <Link href="/merchant/login" className="btn btn--ghost btn--large" style={{ marginTop: '0.5rem', display: 'inline-flex', justifyContent: 'center', width: '100%' }}>
            Back to sign in
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="merchant-auth">
      <div className="merchant-auth__card">
        <div className="merchant-auth__eyebrow">Merchant Portal</div>
        <h1 className="merchant-auth__title">Reset your password</h1>
        <p className="merchant-auth__sub">
          Enter your email and we&apos;ll send a reset link to your inbox.
        </p>

        <form action={async (fd) => { await action(fd); setSent(true) }}>
          <div className="merchant-field">
            <label htmlFor="email">Email address</label>
            <input type="email" id="email" name="email" placeholder="you@store.com" required />
          </div>

          {state.status === 'error' && (
            <div className="merchant-error">{state.message}</div>
          )}

          <div className="merchant-submit">
            <button type="submit" className="btn btn--primary btn--large" disabled={pending}>
              {pending ? 'Sending…' : 'Send reset link'}
            </button>
          </div>
        </form>

        <p className="merchant-auth__footer">
          <Link href="/merchant/login">← Back to sign in</Link>
        </p>
      </div>
    </main>
  )
}
