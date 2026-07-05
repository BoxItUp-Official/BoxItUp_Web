'use client'

import { useActionState } from 'react'
import { resetPassword, type AuthState } from '../actions'

const initial: AuthState = { status: 'idle', message: '' }

export default function AccountResetPasswordPage() {
  const [state, action, pending] = useActionState(resetPassword, initial)

  if (state.status === 'success' as string) {
    return (
      <main className="account-auth">
        <div className="account-auth__card" style={{ textAlign: 'center' }}>
          <div style={{
            width: '3.5rem', height: '3.5rem', borderRadius: '50%',
            background: '#d4edda', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: '1.5rem', margin: '0 auto 1.25rem',
          }}>✓</div>
          <h1 className="account-auth__title">Password updated!</h1>
          <p className="account-auth__sub">
            Your password has been changed. You can now sign in with your new password.
          </p>
          <a href="/account/login" className="btn btn--primary btn--large" style={{ display: 'inline-flex', justifyContent: 'center', width: '100%', marginTop: '0.5rem' }}>
            Sign in
          </a>
        </div>
      </main>
    )
  }

  return (
    <main className="account-auth">
      <div className="account-auth__card">
        <div className="account-auth__eyebrow">My Account</div>
        <h1 className="account-auth__title">Set new password</h1>
        <p className="account-auth__sub">Choose a strong password for your account.</p>

        <form action={action}>
          <div className="account-field">
            <label htmlFor="password">New password</label>
            <input type="password" id="password" name="password" placeholder="At least 8 characters" required />
          </div>
          <div className="account-field">
            <label htmlFor="confirm">Confirm new password</label>
            <input type="password" id="confirm" name="confirm" placeholder="Repeat password" required />
          </div>

          {state.status === 'error' && (
            <div className="account-error">{state.message}</div>
          )}

          <div className="account-submit">
            <button type="submit" className="btn btn--primary btn--large" disabled={pending}>
              {pending ? 'Updating…' : 'Update password'}
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
