'use client'

import { useActionState } from 'react'
import { submitContact, type ContactFormState } from './actions'
import type { ContactContent } from './contactContent'

const initialState: ContactFormState = { status: 'idle', message: '' }

export default function ContactForm({ t }: { t: ContactContent['form'] }) {
  const [state, action, pending] = useActionState(submitContact, initialState)

  if (state.status === 'success') {
    return (
      <div className="contact-success">
        <div className="contact-success__icon">✓</div>
        <h3 className="contact-success__title">{t.successTitle}</h3>
        <p className="contact-success__body">{t.successBody}</p>
      </div>
    )
  }

  // The action returns a code, not a sentence, so each locale shows its own text.
  const errorText =
    state.code === 'missing' ? t.errMissing
    : state.code === 'email' ? t.errEmail
    : t.errServer

  return (
    <form className="contact-form" action={action}>
      <div className="contact-form__row">
        <div className="contact-field">
          <label htmlFor="name">{t.name} <span aria-hidden>*</span></label>
          <input type="text" id="name" name="name" placeholder={t.namePlaceholder} required />
        </div>
        <div className="contact-field">
          <label htmlFor="email">{t.email} <span aria-hidden>*</span></label>
          <input type="email" id="email" name="email" placeholder={t.emailPlaceholder} required />
        </div>
      </div>

      <div className="contact-form__row">
        <div className="contact-field">
          <label htmlFor="inquiry-type">{t.topic} <span aria-hidden>*</span></label>
          <select id="inquiry-type" name="inquiry-type" required defaultValue="">
            <option value="">{t.topicPlaceholder}</option>
            {t.topics.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
        <div className="contact-field">
          <label htmlFor="organization">{t.organization}</label>
          <input type="text" id="organization" name="organization" placeholder={t.organizationPlaceholder} />
        </div>
      </div>

      <div className="contact-field">
        <label htmlFor="message">{t.message} <span aria-hidden>*</span></label>
        <textarea id="message" name="message" placeholder={t.messagePlaceholder} required />
      </div>

      {state.status === 'error' && (
        <div className="contact-form__error" role="alert">{errorText}</div>
      )}

      <div className="contact-submit">
        <button type="submit" className="btn btn--primary btn--large" disabled={pending}>
          {pending ? t.submitting : t.submit}
        </button>
      </div>
    </form>
  )
}
