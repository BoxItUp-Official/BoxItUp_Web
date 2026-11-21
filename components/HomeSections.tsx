import FaqTabs from '@/app/FaqTabs'
import WhyTabs from '@/app/WhyTabs'
import HowStepper from '@/app/HowStepper'
import { HOME_CONTENT, basePath, type Locale } from '@/app/homeContent'
import BlurText from '@/components/reactbits/BlurText'
import ClickSpark from '@/components/reactbits/ClickSpark'
import CountUp from '@/components/reactbits/CountUp'
import ScrollReveal from '@/components/reactbits/ScrollReveal'
import ShinyText from '@/components/reactbits/ShinyText'
import HeroHeadline from '@/components/motion/HeroHeadline'
import HeroMedia from '@/components/motion/HeroMedia'
import IntroSplash from '@/components/motion/IntroSplash'
import { ImpactBar, MotionRoot, Reveal, ScrollProgress } from '@/components/motion/Reveal'

// Brand colours for the React Bits effects (style.css :root).
// The darker orange stays readable at small sizes on the paper colours.
const ORANGE_TEXT = '#A84800'
// Dark ink shows on the orange button, orange shows on the page around it.
const SPARKS = ['#1A1714', '#EB6A00', '#F1A71F']

/** "33%" → a number that counts up; anything else ("Soon", "即將推出") stays as text. */
function Figure({ value }: { value: string }) {
  const m = value.match(/^(\d+)(%?)$/)
  if (!m) return <>{value}</>
  return <CountUp to={Number(m[1])} suffix={m[2]} duration={2.2} />
}

/** A section heading that comes in word by word (Chinese: character by character). */
function Title({
  locale,
  className,
  text,
  accent,
  tail,
}: {
  locale: Locale
  className: string
  text: string
  accent?: string
  tail?: string
}) {
  return (
    <BlurText
      as="h2"
      className={className}
      segments={[
        { text },
        ...(accent ? [{ text: accent, className: 'hero__headline-accent' }] : []),
        ...(tail ? [{ text: tail }] : []),
      ]}
      trigger="view"
      rootMargin="-8% 0px"
      delay={locale === 'en' ? 55 : 26}
      stepDuration={0.38}
      distance={14}
      blur={2.5}
    />
  )
}

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
    <MotionRoot>
      {/* Everything is visible if scripts never run. */}
      <noscript>
        <style>{`.paper-home *{opacity:1!important;transform:none!important;filter:none!important;clip-path:none!important}`}</style>
      </noscript>
      <IntroSplash />
      <ScrollProgress />
      {/* data-motion: these sections animate themselves, so ScrollAnimations leaves them alone. */}
      <main className="paper-home" data-motion>
      {/* ── 1 · HERO — slogan-first, real photo, minimal text ── */}
      <section className="hero hero--split" id="home">
        <div className="hero--split__inner container">
          <div className="hero--split__text">
            <Reveal onLoad y={18} className="paper-badge-wrap">
              <span className="hero__badge">
                <ShinyText text={c.hero.badge} color={ORANGE_TEXT} shineColor="#F39A45" speed={3.2} delay={2.5} />
              </span>
            </Reveal>
            {/* Word by word out of a soft blur (Chinese: character by character) */}
            <HeroHeadline
              as="h1"
              className="hero__headline hero__headline--slogan"
              segments={[
                { text: c.hero.headline },
                { text: c.hero.headlineAccent, className: 'hero__headline-accent' },
                { text: c.hero.headlineTail },
              ]}
              animateBy="words"
              delay={locale === 'en' ? 62 : 32}
              stepDuration={0.44}
              distance={20}
              blur={3}
            />
            <Reveal onLoad delay={0.62} y={18}>
              <p className="hero__subtext hero__subtext--tight">{c.hero.subtext}</p>
            </Reveal>
            <Reveal onLoad delay={0.74} y={18}>
              <ClickSpark className="hero__cta-group" style={{ width: 'auto', height: 'auto' }} sparkColor={SPARKS} sparkCount={12} sparkRadius={58} sparkSize={15}>
                <a href="#download" className="btn btn--primary btn--large">{c.hero.ctaPrimary}</a>
                <a href={businessHref} className="btn btn--ghost-line btn--large">
                  {c.hero.ctaSecondary}
                </a>
              </ClickSpark>
            </Reveal>
          </div>

          <HeroMedia alt={c.hero.photoAlt} box={c.hero.chipBox} meta={c.hero.chipMeta} near={c.hero.chipNear} />
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
              {/* Any space before the accent word belongs in the copy — CJK
                  must not get one, English must. */}
              <Title locale={locale} className="story-editorial__title" text={c.about.title} accent={c.about.titleAccent} tail={c.about.titleTail} />
              <a href={`${base}/about`} className="btn btn--secondary btn--large">{c.about.cta}</a>
            </div>

            {/* Right — the story itself */}
            <div className="story-editorial__body">
              {/* Lights up as you scroll through it */}
              <ScrollReveal
                as="p"
                containerClassName="story-editorial__lead"
                splitBy={locale === 'en' ? 'words' : 'chars'}
                baseOpacity={0.3}
                enableBlur={false}
                baseRotation={0}
                stagger={locale === 'en' ? 0.05 : 0.02}
                // Finishes when the paragraph is a little above the middle of the screen, so it is read as it lights up.
                wordAnimationEnd="bottom 45%"
              >
                {c.about.lead}
              </ScrollReveal>
              <Reveal y={36}>
                <p className="story-editorial__text">{c.about.text}</p>
              </Reveal>
              <Reveal y={36} delay={0.12}>
                <blockquote className="story-quote">
                  <p className="story-quote__text">{c.about.quote}</p>
                  <footer className="story-quote__by">{c.about.quoteBy}</footer>
                </blockquote>
              </Reveal>
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
          <Title locale={locale} className="section-title" text={c.why.title} />

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
          <Title locale={locale} className="section-title" text={c.how.title} />

          <Reveal><HowStepper content={c.how} /></Reveal>
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
              <span className="impact-feature__num"><Figure value={c.impact.num} /></span>
              {/^\d+%$/.test(c.impact.num) && <ImpactBar percent={parseInt(c.impact.num, 10)} />}
              <Reveal y={30}>
                <p className="impact-feature__text">{c.impact.text}</p>
              </Reveal>
            </div>
            <div className="impact-feature__side">
              {c.impact.rows.map((row, i) => (
                <Reveal key={row.title} y={36} delay={i * 0.14}>
                  <div className="impact-feature__row">
                    <strong><Figure value={row.num} /></strong>
                    <div>
                      <h4>{row.title}</h4>
                      <p>{row.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
              <Reveal y={24} delay={0.3}>
                <a href={`${base}/impact`} className="btn btn--secondary">{c.impact.cta}</a>
              </Reveal>
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
          <Title locale={locale} className="section-title" text={c.faq.title} />
          <Reveal><FaqTabs content={c.faq} contactHref={`${base}/contact`} /></Reveal>
        </div>
      </section>

      {/* ── 8 · FINAL CTA — download ── */}
      <section className="cta-section section" id="download">
        <div className="container">
          <Reveal className="cta-section__inner" y={36}>
            <span className="cta-section__badge">{c.cta.badge}</span>
            <Title locale={locale} className="cta-section__headline" text={c.cta.headline} />
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
          </Reveal>
        </div>
      </section>
      </main>
    </MotionRoot>
  )
}
