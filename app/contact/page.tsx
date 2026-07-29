import type { Metadata } from 'next'
import './contact.css'
import ContactForm from './ContactForm'

export const metadata: Metadata = {
  title: 'Box It Up | Contact',
  description:
    'Contact Box It Up — reach out for store partnerships, early collaboration, or general inquiries.',
  icons: { icon: '/logo_icon_gradiant.png' },
}

export default function ContactPage() {
  return (
    <div
      style={{
        background: 'linear-gradient(160deg, #ffffff 0%, #f4f4f4 52%, #d9d9d9 100%)',
        minHeight: '100vh',
      }}
    >
      <main>
        {/* ── HERO ── */}
        <section className="contact-hero">
          <div className="container">
            <div className="contact-hero__inner">
              <div className="contact-hero__content">
                <div className="contact-eyebrow">Get in touch</div>
                <h1 className="contact-title">
                  We&apos;d love to hear from you
                </h1>
                <p className="contact-subtitle">
                  Whether you run a store, need a hand with an order, or just have a question
                  about Box It Up — send us a message and we&apos;ll get back to you.
                </p>
              </div>

              <aside className="contact-hero__aside">
                <h2 className="contact-hero__aside-title">What we can help with</h2>
                <div className="contact-hero__aside-list">
                  <div className="contact-hero__aside-item">
                    <strong>Store partnerships</strong>
                    <span>
                      Explore how Box It Up can help your business create visibility and
                      better-value offers.
                    </span>
                  </div>
                  <div className="contact-hero__aside-item">
                    <strong>Customer support</strong>
                    <span>
                      Questions about an order, a pickup, or your account — we&apos;re happy to
                      help.
                    </span>
                  </div>
                  <div className="contact-hero__aside-item">
                    <strong>Press &amp; general enquiries</strong>
                    <span>
                      Media requests, feedback, or anything else you&apos;d like to talk about.
                    </span>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* ── CONTACT CARDS ── */}
        <section className="contact-entry">
          <div className="container">
            <div className="contact-entry__grid">
              <article className="contact-card">
                <div className="contact-card__label">For stores</div>
                <h3 className="contact-card__title">Partner with Box It Up</h3>
                <p className="contact-card__desc">
                  Turn tonight&apos;s surplus into revenue and reach new customers nearby.
                  Partner sign-ups open soon — register your interest now.
                </p>
                <a href="/business" className="contact-card__link">
                  Request early access →
                </a>
              </article>

              <article className="contact-card">
                <div className="contact-card__label">For customers</div>
                <h3 className="contact-card__title">Need a hand?</h3>
                <p className="contact-card__desc">
                  Something wrong with an order or pickup, or a question about how Box It Up
                  works? Our team is here to help.
                </p>
                <a
                  href="mailto:boxitupofficial@gmail.com?subject=Support%20Request"
                  className="contact-card__link"
                >
                  Get support →
                </a>
              </article>

              <article className="contact-card">
                <div className="contact-card__label">General</div>
                <h3 className="contact-card__title">Questions, ideas, or feedback</h3>
                <p className="contact-card__desc">
                  Press enquiries, product feedback, or anything else worth discussing — we read
                  every message.
                </p>
                <a
                  href="mailto:boxitupofficial@gmail.com?subject=General%20Inquiry%20for%20Box%20It%20Up"
                  className="contact-card__link"
                >
                  Send a message →
                </a>
              </article>
            </div>
          </div>
        </section>

        {/* ── CONTACT FORM + INFO ── */}
        <section className="contact-main">
          <div className="container">
            <div className="contact-main__grid">
              <div className="contact-form-wrap">
                <h2 className="contact-block-title">Send us a message</h2>
                <p className="contact-block-subtitle">
                  Fill out the form below and we&apos;ll route it to the right place.
                </p>
                <ContactForm />
              </div>

              <div className="contact-info-wrap">
                <h2 className="contact-block-title">Direct contact</h2>
                <p className="contact-block-subtitle">
                  Prefer email instead? Use the direct details below and we&apos;ll route your
                  message to the right place.
                </p>

                <div className="contact-info-list">
                  <div className="contact-info-item">
                    <strong>Email</strong>
                    <a href="mailto:boxitupofficial@gmail.com">boxitupofficial@gmail.com</a>
                  </div>
                  <div className="contact-info-item">
                    <strong>Location</strong>
                    <span>Taipei, Taiwan</span>
                  </div>
                </div>

                <div className="contact-faq">
                  <div className="contact-faq__item">
                    <strong>How do I get my store on Box It Up?</strong>
                    <p>
                      Partner sign-ups aren&apos;t open to the public yet. Register on our
                      <a href="/business"> business early access</a> page and we&apos;ll be in
                      touch as soon as they are.
                    </p>
                  </div>
                  <div className="contact-faq__item">
                    <strong>Are you hiring?</strong>
                    <p>
                      We&apos;re a small early-stage team. Open roles are listed on our
                      <a href="/careers"> careers</a> page.
                    </p>
                  </div>
                  <div className="contact-faq__item">
                    <strong>How quickly do you reply?</strong>
                    <p>
                      We aim to respond within a few business days depending on the type of inquiry
                      and the current stage of the project.
                    </p>
                  </div>
                </div>

                <div className="contact-socials">
                  <a href="#">Instagram</a>
                  <a href="#">LinkedIn</a>
                  <a href="#">Email</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
