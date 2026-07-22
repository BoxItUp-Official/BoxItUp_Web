import SiteFooter from '@/components/SiteFooter'
import FaqTabs from './FaqTabs'

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
      {/* ── 1 · HERO — big type, left-aligned, abstract box illustration ── */}
      <section className="hero hero--type" id="home">
        <div className="hero--type__inner container">
          <div className="hero--type__text">
            <span className="hero__badge">Reducing food waste, one box at a time</span>
            <h1 className="hero__headline">
              Every box holds a <span className="hero__headline-accent">surprise.</span>
              <br />
              Every meal deserves a <span className="hero__headline-accent">chance.</span>
            </h1>
            <p className="hero__subtext">
              Box It Up connects you with surprise boxes of surplus food from beloved local
              stores — quality food at kinder prices, with less going to waste.
            </p>
            <div className="hero__cta-group">
              <a href="#download" className="btn btn--primary btn--large">Download the App</a>
              <a href="/merchant/signup" className="btn btn--secondary btn--large">Partner with Us</a>
            </div>
            <div className="hero--type__stats">
              <div className="hero--type__stat">
                <strong>50%+</strong>
                <span>Saved per box</span>
              </div>
              <div className="hero--type__stat-divider" />
              <div className="hero--type__stat">
                <strong>3</strong>
                <span>Steps to your first box</span>
              </div>
            </div>
          </div>

          {/* Abstract box illustration — solid color shapes, no photo dependency */}
          <div className="hero-illustration" aria-hidden="true">
            <div className="hero-illustration__box hero-illustration__box--back" />
            <div className="hero-illustration__box hero-illustration__box--mid">
              <span className="hero-illustration__ribbon" />
            </div>
            <div className="hero-illustration__box hero-illustration__box--front">
              <span className="hero-illustration__ribbon" />
              <span className="hero-illustration__tag">−50%</span>
            </div>
          </div>
        </div>

        <div className="hero__scroll-indicator hero__scroll-indicator--centered" id="scrollIndicator">
          <span>Scroll to explore</span>
          <div className="scroll-arrow" />
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

      {/* ── 3 · OUR STORY — problem → belief → solution, big & short ── */}
      <section className="story section" id="about">
        <div className="container">
          <div className="section-label">Our Story</div>
          <h2 className="section-title section-title--center">
            Why we started <span className="hero__headline-accent">Box It Up.</span>
          </h2>

          <div className="story-flow">
            <div className="story-flow__step">
              <span className="story-flow__index">01</span>
              <h3 className="story-flow__title">Good food, thrown away.</h3>
              <p className="story-flow__text">Every night, great food gets tossed — just because the day is over.</p>
            </div>
            <div className="story-flow__arrow" aria-hidden="true">
              <svg width="40" height="24" viewBox="0 0 40 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M2 12h34M28 4l8 8-8 8" /></svg>
            </div>
            <div className="story-flow__step">
              <span className="story-flow__index">02</span>
              <h3 className="story-flow__title">It deserves better.</h3>
              <p className="story-flow__text">Good food should be eaten, not wasted — and rescuing it should feel delightful.</p>
            </div>
            <div className="story-flow__arrow" aria-hidden="true">
              <svg width="40" height="24" viewBox="0 0 40 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M2 12h34M28 4l8 8-8 8" /></svg>
            </div>
            <div className="story-flow__step story-flow__step--accent">
              <span className="story-flow__index">03</span>
              <h3 className="story-flow__title">So we built Box It Up.</h3>
              <p className="story-flow__text">Surplus becomes a surprise box — great food, saved, at a price worth celebrating.</p>
            </div>
          </div>

          <div className="section-more">
            <a href="/about" className="btn btn--secondary btn--large">Learn more about us →</a>
          </div>
        </div>
      </section>

      {/* ── 4 · WHY BOX IT UP — For Customers / For Merchants ── */}
      <section className="why section" id="why">
        <div className="container">
          <div className="section-label">Why Box It Up</div>
          <h2 className="section-title section-title--center">
            Good for you. Good for stores.
            <br />
            Good for the planet.
          </h2>

          {/* For Customers */}
          <div className="why-block">
            <h3 className="how-track__label">For Customers</h3>
            <div className="why__grid">
              {[
                { title: 'Surprise Experience', text: 'Unboxing your daily pick is the best part of the day.', icon: <path d="M12 3l2.5 5.5L20 11l-5.5 2.5L12 19l-2.5-5.5L4 11l5.5-2.5z" /> },
                { title: 'Discover Local Brands', text: 'Meet neighborhood stores you would have walked right past.', icon: <><circle cx="12" cy="10" r="3" /><path d="M12 21s-7-6.5-7-11a7 7 0 0 1 14 0c0 4.5-7 11-7 11z" /></> },
                { title: 'Premium Quality', text: 'The same craft and freshness — at a much friendlier price.', icon: <><path d="M12 2l2.4 7.2H22l-6 4.4 2.3 7.2L12 16.4 5.7 20.8 8 13.6l-6-4.4h7.6z" /></> },
                { title: 'Sustainable Choice', text: 'Every box you rescue keeps good food off the landfill.', icon: <><path d="M12 22c4-3 8-7 8-12A8 8 0 0 0 4 10c0 5 4 9 8 12z" /><path d="M12 15V8M9 11l3-3 3 3" /></> },
              ].map((r) => (
                <div key={r.title} className="why-item">
                  <span className="why-item__icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{r.icon}</svg>
                  </span>
                  <h4 className="why-item__title">{r.title}</h4>
                  <p className="why-item__text">{r.text}</p>
                </div>
              ))}
            </div>
            <div className="why-block__cta">
              <a href="#download" className="btn btn--primary">Download the app</a>
            </div>
          </div>

          {/* For Merchants */}
          <div className="why-block">
            <h3 className="how-track__label">For Merchants</h3>
            <div className="why__grid">
              {[
                { title: 'Extra Revenue', text: "Turn tonight's surplus into income instead of a loss.", icon: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M3 11h18M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></> },
                { title: 'Reach New Customers', text: 'Get discovered by people who live right around the corner.', icon: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" /></> },
                { title: 'Minimal Effort', text: 'List a surprise box in under two minutes a day.', icon: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></> },
                { title: 'Brand Goodwill', text: 'Tell a sustainability story your customers can feel good about.', icon: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" /> },
              ].map((r) => (
                <div key={r.title} className="why-item">
                  <span className="why-item__icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{r.icon}</svg>
                  </span>
                  <h4 className="why-item__title">{r.title}</h4>
                  <p className="why-item__text">{r.text}</p>
                </div>
              ))}
            </div>
            <div className="why-block__cta">
              <a href="/merchant/signup" className="btn btn--primary">Become a partner</a>
            </div>
          </div>
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

          <div className="how-grid">
          <div className="how-track">
            <h3 className="how-track__label">For Customers</h3>
            <ol className="sequence">
              <li className="sequence__item">
                <span className="sequence__dot">01</span>
                <div className="sequence__content">
                  <h4 className="sequence__title">Download &amp; sign up</h4>
                  <p className="sequence__desc">Get the app and see surprise boxes from stores near you.</p>
                </div>
              </li>
              <li className="sequence__item">
                <span className="sequence__dot">02</span>
                <div className="sequence__content">
                  <h4 className="sequence__title">Choose your box</h4>
                  <p className="sequence__desc">Browse today&apos;s surprise boxes and pick the one you want.</p>
                </div>
              </li>
              <li className="sequence__item">
                <span className="sequence__dot">03</span>
                <div className="sequence__content">
                  <h4 className="sequence__title">Pay &amp; get your code</h4>
                  <p className="sequence__desc">Pay in the app, get your pickup code instantly, then collect.</p>
                </div>
              </li>
            </ol>
          </div>

          <div className="how-track">
            <h3 className="how-track__label">For Merchants</h3>
            <ol className="sequence">
              <li className="sequence__item">
                <span className="sequence__dot">01</span>
                <div className="sequence__content">
                  <h4 className="sequence__title">List today&apos;s box</h4>
                  <p className="sequence__desc">Set price, quantity and pickup window for what&apos;s left today.</p>
                </div>
              </li>
              <li className="sequence__item">
                <span className="sequence__dot">02</span>
                <div className="sequence__content">
                  <h4 className="sequence__title">Receive orders</h4>
                  <p className="sequence__desc">Customers reserve and pay in the app — right into your dashboard.</p>
                </div>
              </li>
              <li className="sequence__item">
                <span className="sequence__dot">03</span>
                <div className="sequence__content">
                  <h4 className="sequence__title">Customers pick up</h4>
                  <p className="sequence__desc">Check the pickup code, hand over the box — quick and contactless.</p>
                </div>
              </li>
              <li className="sequence__item">
                <span className="sequence__dot">04</span>
                <div className="sequence__content">
                  <h4 className="sequence__title">Settle daily</h4>
                  <p className="sequence__desc">See exactly what you recovered from waste, day by day.</p>
                </div>
              </li>
            </ol>
          </div>
          </div>
        </div>
      </section>

      {/* ── 6 · IMPACT — data + paragraph ── */}
      <section className="impact section" id="impact">
        <div className="container">
          <div className="section-label">Impact</div>
          <h2 className="section-title section-title--center">Every box counts.</h2>
          <div className="impact-grid">
            <div className="impact-card">
              <span className="impact-card__num">33%</span>
              <span className="impact-card__label">Environmental Impact</span>
              <p className="impact-card__text">
                Roughly a third of all food produced worldwide is wasted. Every box you rescue
                keeps good food — and the water, land and energy behind it — out of the landfill.
              </p>
            </div>
            <div className="impact-card">
              <span className="impact-card__num">100%</span>
              <span className="impact-card__label">Community</span>
              <p className="impact-card__text">
                Every box supports an independent local bakery, café or restaurant — keeping
                value and flavour in the neighbourhoods we live in.
              </p>
            </div>
            <div className="impact-card">
              <span className="impact-card__num impact-card__num--soon">Soon</span>
              <span className="impact-card__label">Future Vision</span>
              <p className="impact-card__text">
                A live impact dashboard — boxes rescued, CO₂e avoided, stores supported.
                Real numbers coming after launch.
              </p>
            </div>
          </div>
          <div className="section-more">
            <a href="/impact" className="btn btn--secondary">Learn more about our impact →</a>
          </div>
        </div>
      </section>

      {/* ── 7 · FAQ ── */}
      <section className="faq section" id="faq">
        <div className="container">
          <div className="section-label">FAQ</div>
          <h2 className="section-title section-title--center">Questions? Answered.</h2>
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
