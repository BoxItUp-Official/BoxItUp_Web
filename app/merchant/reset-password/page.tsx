'use client'

import { useActionState } from 'react'
import { resetPassword, type AuthState } from '../actions'

const initial: AuthState = { status: 'idle', message: '' }

export default function ResetPasswordPage() {
  const [state, action, pending] = useActionState(resetPassword, initial)

  if (state.status === 'success' as string) {
    return (
      <main className="merchant-auth">
        <div className="merchant-auth__card" style={{ textAlign: 'center' }}>
          <div style={{
            width: '3.5rem', height: '3.5rem', borderRadius: '50%',
            background: '#d4edda', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: '1.5rem', margin: '0 auto 1.25rem',
          }}>✓</div>
          <h1 className="merchant-auth__title">Password updated!</h1>
          <p className="merchant-auth__sub">
            Your password has been changed. You can now sign in with your new password.
          </p>
          <a href="/merchant/login" className="btn btn--primary btn--large" style={{ display: 'inline-flex', justifyContent: 'center', width: '100%', marginTop: '0.5rem' }}>
            Sign in
          </a>
        </div>
      </main>
    )
  }

  return (
    <main className="merchant-auth">
      <div className="merchant-auth__card">
        <div className="merchant-auth__eyebrow">Merchant Portal</div>
        <h1 className="merchant-auth__title">Set new password</h1>
        <p className="merchant-auth__sub">Choose a strong password for your account.</p>

        <form action={action}>
          <div className="merchant-field">
            <label htmlFor="password">New password</label>
            <input type="password" id="password" name="password" placeholder="At least 8 characters" required />
          </div>
          <div className="merchant-field">
            <label htmlFor="confirm">Confirm new password</label>
            <input type="password" id="confirm" name="confirm" placeholder="Repeat password" required />
          </div>

          {state.status === 'error' && (
            <div className="merchant-error">{state.message}</div>
          )}

          <div className="merchant-submit">
            <button type="submit" className="btn btn--primary btn--large" disabled={pending}>
              {pending ? 'Updating…' : 'Update password'}
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
