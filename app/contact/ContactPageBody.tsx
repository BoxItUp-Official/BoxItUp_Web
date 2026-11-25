import Link from 'next/link'
import ContactForm from './ContactForm'
import { CONTACT_CONTENT } from './contactContent'
import { basePath, type Locale } from '../homeContent'
import './contact.css'

const CONTACT_EMAIL = 'boxitupofficial@gmail.com'

/** Shared by /contact, /tw/contact and /cn/contact. */
export default function ContactPageBody({ locale }: { locale: Locale }) {
  const c = CONTACT_CONTENT[locale]
  const base = basePath(locale)

  return (
    <main className="contact-page">
      <div className="container">
        {/* ── Header ── */}
        <div className="contact-head">
          <div className="section-label section-label--icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            {c.label}
          </div>
          <h1 className="contact-title">
            {/* Any space before the accent belongs in the copy — English needs
                one, CJK must not have one. */}
            {c.title}
            <span className="hero__headline-accent">{c.titleAccent}</span>
            {c.titleTail}
          </h1>
          <p className="contact-subtitle">{c.subtitle}</p>
        </div>

        {/* ── Form + direct contact ── */}
        <div className="contact-grid">
          <div className="contact-form-card">
            <ContactForm t={c.form} />
          </div>

          <aside className="contact-aside">
            <div className="contact-aside__block">
              <h2 className="contact-aside__title">{c.emailTitle}</h2>
              <a href={`mailto:${CONTACT_EMAIL}`} className="contact-aside__email">
                {CONTACT_EMAIL}
              </a>
              <p className="contact-aside__note">{c.location}</p>
            </div>

            <div className="contact-aside__block">
              <h2 className="contact-aside__title">{c.linksTitle}</h2>
              <ul className="contact-aside__links">
                <li><Link href={`${base}/business`}>{c.linkBusiness}</Link></li>
                <li><Link href={`${base}/careers`}>{c.linkCareers}</Link></li>
                <li><a href={`${base}/#faq`}>{c.linkFaq}</a></li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
