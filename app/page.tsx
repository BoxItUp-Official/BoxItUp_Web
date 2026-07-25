import SiteFooter from '@/components/SiteFooter'
import FaqTabs from './FaqTabs'
import WhyTabs from './WhyTabs'
import HowStepper from './HowStepper'

/**
 * Homepage — new IA (2026-07), per product spec:
 * Hero → We Partner With → Our Story → Why Box It Up → How It Works
 * → Impact → FAQ → Final CTA
 * Each section is a summary; "Learn more" links go to /about and /impact.
 */

// TODO(content): review drafted copy — placeholders marked "Coming soon" are
// intentional until real partners / metrics / store links exist.

// Sample stores (placeholders) so the marquee reads as a real partner strip.
// TODO(content): swap for real partner names / logos.
const TRUST_ITEMS = [
  'Sunrise Bakery', 'Daily Grind Café', 'Green Leaf Market', 'Mochi & Co.',
  'Corner Deli', 'Fresh Table', 'Bao House', 'Sweet Crumb',
  'Urban Pantry', 'The Rolling Pin', 'Morning Toast', 'Leaf & Bean',
]

export default function HomePage() {
  return (
    <>
      {/* ── 1 · HERO — slogan-first, real photo, minimal text ── */}
      <section className="hero hero--split" id="home">
        <div className="hero--split__inner container">
          <div className="hero--split__text">
            <span className="hero__badge">
              Rescue good food · save money · fight waste
            </span>
            <h1 className="hero__headline hero__headline--slogan">
              Save the food.
              <br />
              <span className="hero__headline-accent">Save the day.</span>
            </h1>
            <p className="hero__subtext hero__subtext--tight">
              Surprise boxes of surplus food from local stores — for a fraction of the price.
            </p>
            <div className="hero__cta-group">
              <a href="#download" className="btn btn--primary btn--large">Download the App</a>
              <a href="/merchant/signup" className="btn btn--ghost-line btn--large">
                I&apos;m a store →
              </a>
            </div>
          </div>

          <div className="hero--split__media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/hero-bakery.jpg" alt="Fresh bakery goods rescued through Box It Up" className="hero--split__photo" />
            <div className="hero--split__chip hero--split__chip--price">
              <span className="hero--split__chip-save">−50%</span>
              <div>
                <strong>Bakery Rescue Box</strong>
                <span>NT$150 · pickup 18:30</span>
              </div>
            </div>
            <div className="hero--split__chip hero--split__chip--near">
              <span className="hero--split__chip-dot" />
              12 stores near you
            </div>
          </div>
        </div>
      </section>

      {/* ── 2 · WE PARTNER WITH — marquee (placeholders until real logos) ── */}
      <section className="trust" id="trust">
        <div className="container">
          <p className="trust__label">We Partner With</p>
        </div>
        <div className="trust__marquee" aria-hidden="true">
          <div className="trust__track">
            {[...TRUST_ITEMS, ...TRUST_ITEMS].map((item, i) => (
              <span key={i} className="trust__chip">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l1-5h16l1 5M4 9v11h16V9M4 9h16" /><path d="M9 20v-6h6v6" />
                </svg>
                {item}
              </span>
            ))}
          </div>
        </div>
        <p className="trust__hint">Sample stores — real partners coming soon</p>
      </section>

      {/* ── 3 · OUR STORY — editorial two-column ── */}
      <section className="story section" id="about">
        <div className="container">
          <div className="story-editorial">
            <div className="story-editorial__text">
              <div className="section-label section-label--icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 6.5C10.5 5 8 4 5 4v13c3 0 5.5 1 7 2.5 1.5-1.5 4-2.5 7-2.5V4c-3 0-5.5 1-7 2.5z" /></svg>
                Our Story
              </div>
              <h2 className="story-editorial__title">
                Good food shouldn&apos;t
                <br />
                end up in the <span className="hero__headline-accent">bin.</span>
              </h2>
              <p className="story-editorial__lead">
                Every night, bakeries and cafés toss perfectly good food — just because the day
                is over. We thought there had to be a better way.
              </p>
              <p className="story-editorial__body">
                So we built Box It Up: surplus becomes a surprise box, stores recover their value,
                and you get great food for less. Everyone wins — and nothing good goes to waste.
              </p>
              <a href="/about" className="btn btn--secondary btn--large">Learn more about us →</a>
            </div>

            <aside className="story-quote">
              <span className="story-quote__mark" aria-hidden="true">&ldquo;</span>
              <p className="story-quote__text">Every meal deserves to be enjoyed — not wasted.</p>
              <span className="story-quote__by">The Box It Up belief</span>
            </aside>
          </div>
        </div>
      </section>

      {/* ── 4 · WHY BOX IT UP — big-number spec list, no icon-circle cards ── */}
      <section className="why section" id="why">
        <div className="container">
          <div className="section-label">Why Box It Up</div>
          <h2 className="section-title">
            Good for you. Good for stores.
            <br />
            Good for the planet.
          </h2>

          <WhyTabs />
        </div>
      </section>

      {/* ── 5 · HOW IT WORKS — two tracks ── */}
      <section className="how-it-works section" id="how-it-works">
        <div className="container">
          <div className="section-label">How It Works</div>
          <h2 className="section-title">
            Three simple steps,
            <br />
            whichever side you&apos;re on.
          </h2>

          <HowStepper />
        </div>
      </section>

      {/* ── 6 · IMPACT — data + paragraph ── */}
      <section className="impact section" id="impact">
        <div className="container">
          <div className="impact-feature">
            <div className="impact-feature__hero">
              <div className="section-label">Impact</div>
              <span className="impact-feature__num">33%</span>
              <p className="impact-feature__text">
                of all food produced worldwide is wasted. Every box rescued through Box It Up
                keeps good food — and the water, land and energy behind it — out of the landfill.
              </p>
            </div>
            <div className="impact-feature__side">
              <div className="impact-feature__row">
                <strong>100%</strong>
                <div>
                  <h4>Community-first</h4>
                  <p>Every box supports an independent local store, keeping value in the neighbourhood.</p>
                </div>
              </div>
              <div className="impact-feature__row">
                <strong>Soon</strong>
                <div>
                  <h4>Live impact dashboard</h4>
                  <p>Boxes rescued, CO₂e avoided, stores supported — real numbers after launch.</p>
                </div>
              </div>
              <a href="/impact" className="btn btn--secondary">Learn more about our impact →</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7 · FAQ ── */}
      <section className="faq section" id="faq">
        <div className="container">
          <div className="section-label section-label--icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3" /><path d="M12 17h.01" /></svg>
            FAQ
          </div>
          <h2 className="section-title">Questions? Answered.</h2>
          <FaqTabs />
        </div>
      </section>

      {/* ── 8 · FINAL CTA — download ── */}
      <section className="cta-section section" id="download">
        <div className="container">
          <div className="cta-section__inner">
            <span className="cta-section__badge">Join the movement</span>
            <h2 className="cta-section__headline">
              Ready to rescue
              <br />
              your first box?
            </h2>
            <p className="cta-section__subtext">
              Download Box It Up and discover surprise boxes from stores near you — or bring
              your store on board and give tonight&apos;s surplus a second chance.
            </p>
            <div className="cta-section__actions store-badges">
              {/* TODO: replace with real store links once the app ships */}
              <span className="store-badge store-badge--soon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.4c1.39.07 2.35.74 3.15.8 1.2-.24 2.35-.93 3.62-.84 1.55.12 2.71.74 3.47 1.89-3.19 1.88-2.44 5.98.57 7.14-.6 1.6-1.4 3.2-2.81 3.89zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
                <span>
                  <small>Coming soon on the</small>
                  App Store
                </span>
              </span>
              <span className="store-badge store-badge--soon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3 20.5V3.5c0-.6.4-1.1.9-1.3l10.3 10.3L3.9 21.8c-.5-.2-.9-.7-.9-1.3zm13.8-5.4L6.05 21.34l8.49-8.49 2.26 2.25zm3.35-3.35c.4.3.65.77.65 1.25s-.25.95-.65 1.25l-2.15 1.25-2.5-2.5 2.5-2.5 2.15 1.25zM6.05 2.66L16.8 8.9l-2.26 2.25-8.49-8.49z"/></svg>
                <span>
                  <small>Coming soon on</small>
                  Google Play
                </span>
              </span>
            </div>
            <p className="cta-section__note">
              Free to join · App launching soon ·{' '}
              <a href="/merchant/signup" className="cta-section__merchant-link">Partner with us as a store →</a>
            </p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  )
}
