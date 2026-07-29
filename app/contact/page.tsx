import type { Metadata } from 'next'
import Link from 'next/link'
import './contact.css'
import ContactForm from './ContactForm'

export const metadata: Metadata = {
  title: 'Box It Up | Contact',
  description:
    'Contact Box It Up — reach out for store partnerships, support, or general enquiries.',
  icons: { icon: '/logo_icon_gradiant.png' },
}

export default function ContactPage() {
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
            Contact
          </div>
          <h1 className="contact-title">
            We&apos;d love to
            <br />
            hear from <span className="hero__headline-accent">you.</span>
          </h1>
          <p className="contact-subtitle">
            Questions, feedback, or partnership enquiries — send us a message and we&apos;ll get
            back to you within a few business days.
          </p>
        </div>

        {/* ── Form + direct contact ── */}
        <div className="contact-grid">
          <div className="contact-form-card">
            <ContactForm />
          </div>

          <aside className="contact-aside">
            <div className="contact-aside__block">
              <h2 className="contact-aside__title">Email us</h2>
              <a href="mailto:boxitupofficial@gmail.com" className="contact-aside__email">
                boxitupofficial@gmail.com
              </a>
              <p className="contact-aside__note">Taipei, Taiwan</p>
            </div>

            <div className="contact-aside__block">
              <h2 className="contact-aside__title">Quick links</h2>
              <ul className="contact-aside__links">
                <li>
                  <Link href="/business">Run a store? Request early access →</Link>
                </li>
                <li>
                  <Link href="/careers">Open roles →</Link>
                </li>
                <li>
                  <a href="/#faq">Read the FAQ →</a>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
