'use client'

import { useActionState } from 'react'
import { saveCustomerProfile, type OnboardingState } from '../actions'

const initial: OnboardingState = { status: 'idle', message: '' }

export default function AccountOnboardingPage() {
  const [state, action, pending] = useActionState(saveCustomerProfile, initial)

  return (
    <main className="account-auth">
      <div className="account-auth__card">
        <div className="account-auth__eyebrow">One more step</div>
        <h1 className="account-auth__title">Tell us a bit about you</h1>
        <p className="account-auth__sub">
          Just your name and phone number — stores need this to reach you about pickup.
        </p>

        <form action={action}>
          <div className="account-field">
            <label htmlFor="full_name">Full name *</label>
            <input type="text" id="full_name" name="full_name" placeholder="Your name" required />
          </div>
          <div className="account-field">
            <label htmlFor="phone">Phone number *</label>
            <input type="tel" id="phone" name="phone" placeholder="For pickup coordination" required />
          </div>

          {state.status === 'error' && (
            <div className="account-error">{state.message}</div>
          )}

          <div className="account-submit">
            <button type="submit" className="btn btn--primary btn--large" disabled={pending}>
              {pending ? 'Saving…' : 'Continue to boxes'}
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
