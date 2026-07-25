'use client'

import { useActionState } from 'react'
import { submitBusinessLead, type BusinessLeadState } from './actions'

const CATEGORIES = [
  'Bakery', 'Café', 'Restaurant', 'Convenience Store',
  'Supermarket', 'Deli / Butcher', 'Fresh Market / Produce', 'Other',
]
const CITIES = [
  'Taipei', 'New Taipei', 'Taoyuan', 'Taichung',
  'Tainan', 'Kaohsiung', 'Hsinchu', 'Keelung', 'Other',
]

const initial: BusinessLeadState = { status: 'idle', message: '' }

export default function BusinessLeadForm() {
  const [state, action, pending] = useActionState(submitBusinessLead, initial)

  if (state.status === 'success') {
    return (
      <div className="lead-form lead-form--done">
        <span className="lead-form__check" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
        </span>
        <h3>Thanks — you&apos;re on the list.</h3>
        <p>{state.message}</p>
      </div>
    )
  }

  return (
    <form action={action} className="lead-form">
      {state.status === 'error' && <div className="lead-form__error">{state.message}</div>}

      <div className="lead-form__row">
        <div className="lead-field">
          <label htmlFor="store_name">Store name *</label>
          <input id="store_name" name="store_name" type="text" required placeholder="e.g. Sunrise Bakery" />
        </div>
        <div className="lead-field">
          <label htmlFor="contact_name">Your name *</label>
          <input id="contact_name" name="contact_name" type="text" required placeholder="Owner or manager" />
        </div>
      </div>

      <div className="lead-form__row">
        <div className="lead-field">
          <label htmlFor="email">Email *</label>
          <input id="email" name="email" type="email" required placeholder="you@store.com" />
        </div>
        <div className="lead-field">
          <label htmlFor="phone">Phone</label>
          <input id="phone" name="phone" type="tel" placeholder="+886 2 1234 5678" />
        </div>
      </div>

      <div className="lead-form__row">
        <div className="lead-field">
          <label htmlFor="category">Store type</label>
          <select id="category" name="category" defaultValue="">
            <option value="">Select a type</option>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="lead-field">
          <label htmlFor="city">City</label>
          <select id="city" name="city" defaultValue="">
            <option value="">Select a city</option>
            {CITIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div className="lead-field">
        <label htmlFor="notes">Anything else?</label>
        <textarea id="notes" name="notes" rows={3} placeholder="Tell us about your store, or what you'd like to know." />
      </div>

      <button type="submit" className="btn btn--primary btn--large" disabled={pending}>
        {pending ? 'Sending…' : 'Request early access'}
      </button>
      <p className="lead-form__note">No commitment — we&apos;ll simply let you know when partner sign-ups open.</p>
    </form>
  )
}
