'use client'

import { useActionState } from 'react'
import { submitContact, type ContactFormState } from '@/app/contact/actions'

const initialState: ContactFormState = { status: 'idle', message: '' }

export default function ContactFormTw() {
  const [state, action, pending] = useActionState(submitContact, initialState)

  if (state.status === 'success') {
    return (
      <div className="contact-success">
        <div className="contact-success__icon">✓</div>
        <h3 className="contact-success__title">訊息已送出！</h3>
        <p className="contact-success__body">感謝您的聯絡，我們將儘快回覆您。</p>
      </div>
    )
  }

  return (
    <form className="contact-form" action={action}>
      <div className="contact-form__row">
        <div className="contact-field">
          <label htmlFor="name">姓名 <span aria-hidden>*</span></label>
          <input type="text" id="name" name="name" placeholder="您的姓名" required />
        </div>
        <div className="contact-field">
          <label htmlFor="email">電子郵件 <span aria-hidden>*</span></label>
          <input type="email" id="email" name="email" placeholder="you@example.com" required />
        </div>
      </div>

      <div className="contact-form__row">
        <div className="contact-field">
          <label htmlFor="inquiry-type">聯絡主旨 <span aria-hidden>*</span></label>
          <select id="inquiry-type" name="inquiry-type" required>
            <option value="">請選擇主旨</option>
            <option value="store">商店合作</option>
            <option value="builder">早期協作 / 學生職缺</option>
            <option value="user">一般詢問</option>
            <option value="feedback">產品回饋</option>
          </select>
        </div>
        <div className="contact-field">
          <label htmlFor="organization">公司 / 學校</label>
          <input type="text" id="organization" name="organization" placeholder="選填" />
        </div>
      </div>

      <div className="contact-field">
        <label htmlFor="message">訊息內容 <span aria-hidden>*</span></label>
        <textarea
          id="message"
          name="message"
          placeholder="請簡述您的需求、想法或問題。"
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
          {pending ? '傳送中…' : '送出訊息'}
        </button>
      </div>
    </form>
  )
}
