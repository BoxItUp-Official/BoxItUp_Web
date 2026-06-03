'use client'

import { useActionState } from 'react'
import { submitContact, type ContactFormState } from './actions'

const initialState: ContactFormState = { status: 'idle', message: '' }

export default function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, initialState)

  if (state.status === 'success') {
    return (
      <div className="contact-success">
        <div className="contact-success__icon">✓</div>
        <h3 className="contact-success__title">Message sent!</h3>
        <p className="contact-success__body">{state.message}</p>
      </div>
    )
  }

  return (
    <form className="contact-form" action={action}>
      <div className="contact-form__row">
        <div className="contact-field">
          <label htmlFor="name">Name <span aria-hidden>*</span></label>
          <input type="text" id="name" name="name" placeholder="Your name" required />
        </div>
        <div className="contact-field">
          <label htmlFor="email">Email <span aria-hidden>*</span></label>
          <input type="email" id="email" name="email" placeholder="you@example.com" required />
        </div>
      </div>

      <div className="contact-form__row">
        <div className="contact-field">
          <label htmlFor="inquiry-type">I&apos;m reaching out about <span aria-hidden>*</span></label>
          <select id="inquiry-type" name="inquiry-type" required>
            <option value="">Select a topic</option>
            <option value="store">Store partnership</option>
            <option value="builder">Early collaboration / student role</option>
            <option value="user">General inquiry</option>
            <option value="feedback">Product feedback</option>
          </select>
        </div>
        <div className="contact-field">
          <label htmlFor="organization">Organization / School</label>
          <input type="text" id="organization" name="organization" placeholder="Optional" />
        </div>
      </div>

      <div className="contact-field">
        <label htmlFor="message">Message <span aria-hidden>*</span></label>
        <textarea
          id="message"
          name="message"
          placeholder="Tell us a bit more about your interest, idea, or question."
          required
        />
      </div>

      {state.status === 'error' && (
        <div className="contact-form__error" role="alert">
          {state.message}
        </div>
      )}

      <div className="contact-submit">
        <button type="submit" className="btn btn--primary btn--large" disabled={pending}>
          {pending ? 'Sending…' : 'Send message'}
        </button>
      </div>
    </form>
  )
}
