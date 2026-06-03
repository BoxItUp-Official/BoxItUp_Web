'use client'

import { useActionState } from 'react'
import { submitContact, type ContactFormState } from '@/app/contact/actions'

const initialState: ContactFormState = { status: 'idle', message: '' }

export default function ContactFormCn() {
  const [state, action, pending] = useActionState(submitContact, initialState)

  if (state.status === 'success') {
    return (
      <div className="contact-success">
        <div className="contact-success__icon">✓</div>
        <h3 className="contact-success__title">消息已发送！</h3>
        <p className="contact-success__body">感谢您的联系，我们将尽快回复您。</p>
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
          <label htmlFor="email">电子邮件 <span aria-hidden>*</span></label>
          <input type="email" id="email" name="email" placeholder="you@example.com" required />
        </div>
      </div>

      <div className="contact-form__row">
        <div className="contact-field">
          <label htmlFor="inquiry-type">联系主题 <span aria-hidden>*</span></label>
          <select id="inquiry-type" name="inquiry-type" required>
            <option value="">请选择主题</option>
            <option value="store">商店合作</option>
            <option value="builder">早期协作 / 学生职位</option>
            <option value="user">一般咨询</option>
            <option value="feedback">产品反馈</option>
          </select>
        </div>
        <div className="contact-field">
          <label htmlFor="organization">公司 / 学校</label>
          <input type="text" id="organization" name="organization" placeholder="选填" />
        </div>
      </div>

      <div className="contact-field">
        <label htmlFor="message">消息内容 <span aria-hidden>*</span></label>
        <textarea
          id="message"
          name="message"
          placeholder="请简述您的需求、想法或问题。"
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
          {pending ? '发送中…' : '发送消息'}
        </button>
      </div>
    </form>
  )
}
