import type { Metadata } from 'next'
import './contact.css'

export const metadata: Metadata = {
  title: 'Box It Up | Contact',
  description:
    'Contact Box It Up — reach out for store partnerships, early collaboration, or general inquiries.',
  icons: { icon: '/logo_icon.png' },
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
                  Let&apos;s talk about what Box It Up can build next
                </h1>
                <p className="contact-subtitle">
                  Whether you&apos;re a store interested in partnering, a student who wants to help
                  build with us, or someone with feedback or ideas, we&apos;d love to hear from
                  you.
                </p>
              </div>

              <aside className="contact-hero__aside">
                <h2 className="contact-hero__aside-title">Best reasons to reach out</h2>
                <div className="contact-hero__aside-list">
                  <div className="contact-hero__aside-item">
                    <strong>Store partnerships</strong>
                    <span>
                      Explore how Box It Up can help your business create visibility and
                      better-value offers.
                    </span>
                  </div>
                  <div className="contact-hero__aside-item">
                    <strong>Early collaboration</strong>
                    <span>
                      Students and builders can reach out if they want hands-on startup experience
                      and ownership.
                    </span>
                  </div>
                  <div className="contact-hero__aside-item">
                    <strong>Product feedback</strong>
                    <span>
                      Share ideas, user pain points, or opportunities that could shape the platform
                      early.
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
                  Want to turn surplus inventory into an opportunity and reach new customers through
                  curated offers?
                </p>
                <a
                  href="mailto:boxitupofficial@gmail.com?subject=Store%20Partnership%20Inquiry"
                  className="contact-card__link"
                >
                  Contact our partnership team →
                </a>
              </article>

              <article className="contact-card">
                <div className="contact-card__label">For builders</div>
                <h3 className="contact-card__title">Build with us</h3>
                <p className="contact-card__desc">
                  We&apos;re looking for early collaborators and motivated students who want to help
                  shape Box It Up from the ground up.
                </p>
                <a
                  href="mailto:boxitupofficial@gmail.com?subject=Early%20Collaboration%20with%20Box%20It%20Up"
                  className="contact-card__link"
                >
                  Tell us about yourself →
                </a>
              </article>

              <article className="contact-card">
                <div className="contact-card__label">General</div>
                <h3 className="contact-card__title">Questions, ideas, or feedback</h3>
                <p className="contact-card__desc">
                  Reach out for product feedback, user questions, media opportunities, or anything
                  else worth discussing.
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
                  Fill out the form below and we&apos;ll route it to the right place. To make
                  submissions functional, connect this form to a Supabase table, Formspree, or an
                  API route.
                </p>

                <form className="contact-form">
                  <div className="contact-form__row">
                    <div className="contact-field">
                      <label htmlFor="name">Name</label>
                      <input type="text" id="name" name="name" placeholder="Your name" />
                    </div>
                    <div className="contact-field">
                      <label htmlFor="email">Email</label>
                      <input type="email" id="email" name="email" placeholder="you@example.com" />
                    </div>
                  </div>

                  <div className="contact-form__row">
                    <div className="contact-field">
                      <label htmlFor="inquiry-type">I&apos;m reaching out about</label>
                      <select id="inquiry-type" name="inquiry-type">
                        <option value="">Select a topic</option>
                        <option value="store">Store partnership</option>
                        <option value="builder">Early collaboration / student role</option>
                        <option value="user">General inquiry</option>
                        <option value="feedback">Product feedback</option>
                      </select>
                    </div>
                    <div className="contact-field">
                      <label htmlFor="organization">Organization / School</label>
                      <input
                        type="text"
                        id="organization"
                        name="organization"
                        placeholder="Optional"
                      />
                    </div>
                  </div>

                  <div className="contact-field">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Tell us a bit more about your interest, idea, or question."
                    />
                  </div>

                  <div className="contact-note">
                    Note: this form is visual-only until a backend or Supabase table is connected.
                  </div>

                  <div className="contact-submit">
                    <button type="button" className="btn btn--primary btn--large">
                      Send message
                    </button>
                  </div>
                </form>
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
                    <strong>Phone</strong>
                    <span>+886 123 456 789</span>
                  </div>
                  <div className="contact-info-item">
                    <strong>Location</strong>
                    <span>Taipei, Taiwan</span>
                  </div>
                </div>

                <div className="contact-faq">
                  <div className="contact-faq__item">
                    <strong>Are you hiring paid roles right now?</strong>
                    <p>
                      We&apos;re currently focused on early collaboration and building traction.
                      Some roles may begin as unpaid, project-based, or exploratory opportunities
                      while we grow.
                    </p>
                  </div>
                  <div className="contact-faq__item">
                    <strong>Who should apply to build with Box It Up?</strong>
                    <p>
                      Students and early builders who want meaningful startup exposure, ownership,
                      and resume depth are especially encouraged to reach out.
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
