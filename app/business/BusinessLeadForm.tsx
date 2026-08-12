'use client'

import { useActionState } from 'react'
import { submitBusinessLead, type BusinessLeadState } from './actions'
import type { BusinessContent } from './businessContent'

const initial: BusinessLeadState = { status: 'idle', message: '' }

export default function BusinessLeadForm({ t }: { t: BusinessContent['form'] }) {
  const [state, action, pending] = useActionState(submitBusinessLead, initial)

  if (state.status === 'success') {
    return (
      <div className="lead-form lead-form--done">
        <span className="lead-form__check" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
        </span>
        <h3>{t.doneTitle}</h3>
        <p>{state.message}</p>
      </div>
    )
  }

  return (
    <form action={action} className="lead-form">
      {state.status === 'error' && <div className="lead-form__error">{state.message}</div>}

      <div className="lead-form__row">
        <div className="lead-field">
          <label htmlFor="store_name">{t.storeName}</label>
          <input id="store_name" name="store_name" type="text" required placeholder={t.storeNamePlaceholder} />
        </div>
        <div className="lead-field">
          <label htmlFor="contact_name">{t.contactName}</label>
          <input id="contact_name" name="contact_name" type="text" required placeholder={t.contactNamePlaceholder} />
        </div>
      </div>

      <div className="lead-form__row">
        <div className="lead-field">
          <label htmlFor="email">{t.email}</label>
          <input id="email" name="email" type="email" required placeholder="you@store.com" />
        </div>
        <div className="lead-field">
          <label htmlFor="phone">{t.phone}</label>
          <input id="phone" name="phone" type="tel" placeholder="+886 2 1234 5678" />
        </div>
      </div>

      <div className="lead-form__row">
        <div className="lead-field">
          <label htmlFor="category">{t.category}</label>
          <select id="category" name="category" defaultValue="">
            <option value="">{t.categoryPlaceholder}</option>
            {t.categories.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
        </div>
        <div className="lead-field">
          <label htmlFor="city">{t.city}</label>
          <select id="city" name="city" defaultValue="">
            <option value="">{t.cityPlaceholder}</option>
            {t.cities.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
        </div>
      </div>

      <div className="lead-field">
        <label htmlFor="notes">{t.notes}</label>
        <textarea id="notes" name="notes" rows={3} placeholder={t.notesPlaceholder} />
      </div>

      <button type="submit" className="btn btn--primary btn--large" disabled={pending}>
        {pending ? t.submitting : t.submit}
      </button>
      <p className="lead-form__note">{t.note}</p>
    </form>
  )
}
