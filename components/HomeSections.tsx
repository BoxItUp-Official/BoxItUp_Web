import FaqTabs from '@/app/FaqTabs'
import WhyTabs from '@/app/WhyTabs'
import HowStepper from '@/app/HowStepper'
import { HOME_CONTENT, basePath, type Locale } from '@/app/homeContent'

/**
 * The homepage, shared by every locale.
 *
 * Structure (new IA, 2026-07):
 *   Hero → We Partner With → About Us → Why Box It Up → How It Works
 *   → Impact → FAQ → Final CTA
 *
 * `/`, `/tw` and `/cn` all render this component and differ only in the copy
 * pulled from `app/homeContent.ts`, so the three languages cannot drift apart.
 */
export default function HomeSections({ locale }: { locale: Locale }) {
  const c = HOME_CONTENT[locale]
  const base = basePath(locale)
  const businessHref = `${base}/business`

  return (
    <>
      {/* ── 1 · HERO — slogan-first, real photo, minimal text ── */}
      <section className="hero hero--split" id="home">
        <div className="hero--split__inner container">
          <div className="hero--split__text">
            <span className="hero__badge">{c.hero.badge}</span>
            <h1 className="hero__headline hero__headline--slogan">
              {c.hero.headline}
              <span className="hero__headline-accent">{c.hero.headlineAccent}</span>
              {c.hero.headlineTail}
            </h1>
            <p className="hero__subtext hero__subtext--tight">{c.hero.subtext}</p>
            <div className="hero__cta-group">
              <a href="#download" className="btn btn--primary btn--large">{c.hero.ctaPrimary}</a>
              <a href={businessHref} className="btn btn--ghost-line btn--large">
                {c.hero.ctaSecondary}
              </a>
            </div>
          </div>

          <div className="hero--split__media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/hero-bakery.jpg" alt={c.hero.photoAlt} className="hero--split__photo" />
            <div className="hero--split__chip hero--split__chip--price">
              <span className="hero--split__chip-save">−50%</span>
              <div>
                <strong>{c.hero.chipBox}</strong>
                <span>{c.hero.chipMeta}</span>
              </div>
            </div>
            <div className="hero--split__chip hero--split__chip--near">
              <span className="hero--split__chip-dot" />
              {c.hero.chipNear}
            </div>
          </div>
        </div>
      </section>

      {/* ── 2 · WE PARTNER WITH — marquee (placeholders until real logos) ── */}
      <section className="trust" id="trust">
        <div className="container">
          <p className="trust__label">{c.trust.label}</p>
        </div>
        <div className="trust__marquee" aria-hidden="true">
          <div className="trust__track">
            {[...c.trust.items, ...c.trust.items].map((item, i) => (
              <span key={i} className="trust__chip">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l1-5h16l1 5M4 9v11h16V9M4 9h16" /><path d="M9 20v-6h6v6" />
                </svg>
                {item}
              </span>
            ))}
          </div>
        </div>
        <p className="trust__hint">{c.trust.hint}</p>
      </section>

      {/* ── 3 · ABOUT US — editorial two-column ── */}
      <section className="story section" id="about">
        <div className="container">
          <div className="story-editorial">
            {/* Left — headline + CTA */}
            <div className="story-editorial__head">
              <div className="section-label section-label--icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 6.5C10.5 5 8 4 5 4v13c3 0 5.5 1 7 2.5 1.5-1.5 4-2.5 7-2.5V4c-3 0-5.5 1-7 2.5z" /></svg>
                {c.about.label}
              </div>
              <h2 className="story-editorial__title">
                {/* Any space before the accent word belongs in the copy — CJK
                    must not get one, English must. */}
                {c.about.title}
                <span className="hero__headline-accent">{c.about.titleAccent}</span>
                {c.about.titleTail}
              </h2>
              <a href={`${base}/about`} className="btn btn--secondary btn--large">{c.about.cta}</a>
            </div>

            {/* Right — the story itself */}
            <div className="story-editorial__body">
              <p className="story-editorial__lead">{c.about.lead}</p>
              <p className="story-editorial__text">{c.about.text}</p>
              <blockquote className="story-quote">
                <p className="story-quote__text">{c.about.quote}</p>
                <footer className="story-quote__by">{c.about.quoteBy}</footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4 · WHY BOX IT UP ── */}
      <section className="why section" id="why">
        <div className="container">
          <div className="section-label section-label--icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l2.4 7.2H22l-6 4.4 2.3 7.2L12 16.4 5.7 20.8 8 13.6l-6-4.4h7.6z" /></svg>
            {c.why.label}
          </div>
          <h2 className="section-title">{c.why.title}</h2>

          <WhyTabs content={c.why} businessHref={businessHref} />
        </div>
      </section>

      {/* ── 5 · HOW IT WORKS — two tracks ── */}
      <section className="how-it-works section" id="how-it-works">
        <div className="container">
          <div className="section-label section-label--icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6M10 22h4" /><path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z" /></svg>
            {c.how.label}
          </div>
          <h2 className="section-title">{c.how.title}</h2>

          <HowStepper content={c.how} />
        </div>
      </section>

      {/* ── 6 · IMPACT — data + paragraph ── */}
      <section className="impact section" id="impact">
        <div className="container">
          <div className="impact-feature">
            <div className="impact-feature__hero">
              <div className="section-label section-label--icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c4.5-3 8-7 8-12A8 8 0 0 0 4 10c0 5 3.5 9 8 12z" /><path d="M12 22V8M9 12l3-4 3 4" /></svg>
                {c.impact.label}
              </div>
              <span className="impact-feature__num">{c.impact.num}</span>
              <p className="impact-feature__text">{c.impact.text}</p>
            </div>
            <div className="impact-feature__side">
              {c.impact.rows.map((row) => (
                <div key={row.title} className="impact-feature__row">
                  <strong>{row.num}</strong>
                  <div>
                    <h4>{row.title}</h4>
                    <p>{row.text}</p>
                  </div>
                </div>
              ))}
              <a href={`${base}/impact`} className="btn btn--secondary">{c.impact.cta}</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7 · FAQ ── */}
      <section className="faq section" id="faq">
        <div className="container">
          <div className="section-label section-label--icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3" /><path d="M12 17h.01" /></svg>
            {c.faq.label}
          </div>
          <h2 className="section-title">{c.faq.title}</h2>
          <FaqTabs content={c.faq} contactHref={`${base}/contact`} />
        </div>
      </section>

      {/* ── 8 · FINAL CTA — download ── */}
      <section className="cta-section section" id="download">
        <div className="container">
          <div className="cta-section__inner">
            <span className="cta-section__badge">{c.cta.badge}</span>
            <h2 className="cta-section__headline">{c.cta.headline}</h2>
            <p className="cta-section__subtext">{c.cta.subtext}</p>
            <div className="cta-section__actions store-badges">
              {/* TODO: replace with real store links once the app ships */}
              <span className="store-badge store-badge--soon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.4c1.39.07 2.35.74 3.15.8 1.2-.24 2.35-.93 3.62-.84 1.55.12 2.71.74 3.47 1.89-3.19 1.88-2.44 5.98.57 7.14-.6 1.6-1.4 3.2-2.81 3.89zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
                <span>
                  <small>{c.cta.soonPrefixApple}</small>
                  App Store
                </span>
              </span>
              <span className="store-badge store-badge--soon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3 20.5V3.5c0-.6.4-1.1.9-1.3l10.3 10.3L3.9 21.8c-.5-.2-.9-.7-.9-1.3zm13.8-5.4L6.05 21.34l8.49-8.49 2.26 2.25zm3.35-3.35c.4.3.65.77.65 1.25s-.25.95-.65 1.25l-2.15 1.25-2.5-2.5 2.5-2.5 2.15 1.25zM6.05 2.66L16.8 8.9l-2.26 2.25-8.49-8.49z"/></svg>
                <span>
                  <small>{c.cta.soonPrefixGoogle}</small>
                  Google Play
                </span>
              </span>
            </div>
            <p className="cta-section__note">
              {c.cta.note}
              <a href={businessHref} className="cta-section__merchant-link">{c.cta.noteLink}</a>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
