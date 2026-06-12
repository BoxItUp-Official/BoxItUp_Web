import HeroStats from '@/components/HeroStats'
import HeroParallax from '@/components/HeroParallax'
import ContactForm from '@/app/contact/ContactForm'
import '@/app/contact/contact.css'

const EN_STATS = [
  { target: 10, suffix: 'k +', label: 'Boxes sold' },
  { target: 100, suffix: ' +', label: 'Partner stores' },
  { target: 150, suffix: ' NTD', label: 'Per surprise box' },
]

export default function HomePage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="hero" id="home">
        <div className="hero__inner container">
          <div className="hero__content">
            <span className="hero__badge">Reducing food waste, one box at a time</span>
            <h1 className="hero__headline">
              Spend <span className="hero__headline-accent">less.</span>
              <br />
              Get <span className="hero__headline-accent">better value.</span>
              <br />
              Experience <span className="hero__headline-accent">more.</span>
            </h1>
            <p className="hero__subtext">
              Box It Up connects you with curated surprise boxes from local stores, turning excess
              inventory into great-value meals you can discover every day.
            </p>
            <div className="hero__cta-group">
              <a href="#signup" className="btn btn--primary">Get Started</a>
              <a href="/merchant/signup" className="btn btn--secondary">Sign up as a Business</a>
            </div>
            <HeroStats stats={EN_STATS} />
          </div>

          <HeroParallax>
          <div className="hero__visual hero__visual--product">
            <div className="hero__showcase">
              <div className="hero__bg-orb hero__bg-orb--1" />
              <div className="hero__bg-orb hero__bg-orb--2" />

              <div className="hero__floating-card hero__floating-card--offer">
                <span className="hero__floating-label">Today&apos;s Deal</span>
                <strong>Up to 30% off</strong>
                <span>Surprise boxes from nearby stores</span>
              </div>

              <div className="hero__floating-card hero__floating-card--mini">
                <span className="hero__mini-dot" />
                <div>
                  <strong>12 stores nearby</strong>
                  <span>Fresh picks around you</span>
                </div>
              </div>

              <div className="hero__phone">
                <div className="hero__phone-notch" />
                <div className="hero__phone-screen">
                  <div className="hero__app-header">
                    <span className="hero__app-brand">Box It Up</span>
                    <span className="hero__app-pill">Surprise Box</span>
                  </div>
                  <div className="hero__app-card hero__app-card--primary">
                    <div className="hero__app-card-top">
                      <span className="hero__app-tag">Featured</span>
                      <span className="hero__app-rating">★ 4.9</span>
                    </div>
                    <h3>Bakery Rescue Box</h3>
                    <p>Fresh pastries and bread saved from today&apos;s batch.</p>
                    <div className="hero__app-meta">
                      <span>NT$150</span>
                      <span>Pickup 18:30</span>
                    </div>
                  </div>
                  <div className="hero__app-list">
                    <div className="hero__app-list-item">
                      <div className="hero__app-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 8h1a4 4 0 010 8h-1"/><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>
                        </svg>
                      </div>
                      <div>
                        <strong>Café Set</strong>
                        <span>Drinks + dessert</span>
                      </div>
                      <b>NT$120</b>
                    </div>
                    <div className="hero__app-list-item">
                      <div className="hero__app-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="8" width="18" height="13" rx="2"/><path d="M3 12h18M12 8V5M8 8V6M16 8V6"/>
                        </svg>
                      </div>
                      <div>
                        <strong>Lunch Box</strong>
                        <span>Chef&apos;s daily selection</span>
                      </div>
                      <b>NT$150</b>
                    </div>
                  </div>
                </div>
              </div>

              <div className="hero__floating-card hero__floating-card--impact">
                <span className="hero__impact-number">10k+</span>
                <span className="hero__impact-text">Boxes sold with less waste</span>
              </div>
            </div>
          </div>
          </HeroParallax>
        </div>

        <div className="hero__scroll-indicator" id="scrollIndicator">
          <span>Scroll to explore</span>
          <div className="scroll-arrow" />
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="about section" id="about">
        <div className="container">
          <div className="section-label">About Us</div>
          <div className="about__inner">
            <div className="about__text">
              <h2 className="section-title">
                A smarter way to
                <br />
                fight food waste.
              </h2>
              <p className="about__body">
                Box It Up is a marketplace that connects local businesses with consumers through
                discounted surprise food boxes. Instead of letting unsold items go to waste, stores
                can turn them into a new revenue stream, while customers get access to high-value
                meals at lower prices.
              </p>
              <p className="about__body">
                Our platform helps businesses increase visibility, attract new customers, and
                monetize surplus inventory — all with minimal effort. For consumers, it&apos;s a
                smarter way to explore food, save money, and enjoy something new every day.
              </p>
              <a href="#how-it-works" className="btn btn--primary" style={{ marginTop: '2rem' }}>
                See How It Works
              </a>
            </div>
            <div className="about__metrics">
              <div className="metric-card">
                <span className="metric-card__number">1 in 3</span>
                <span className="metric-card__desc">food items produced globally is wasted</span>
              </div>
              <div className="metric-card">
                <span className="metric-card__number">8–10%</span>
                <span className="metric-card__desc">
                  of global greenhouse gas emissions come from food waste
                </span>
              </div>
              <div className="metric-card">
                <span className="metric-card__number">$1T+</span>
                <span className="metric-card__desc">
                  in economic losses from food waste annually
                </span>
              </div>
              <div className="metric-card metric-card--highlight">
                <span className="metric-card__number">Box It Up</span>
                <span className="metric-card__desc">
                  is here to turn this around — one box at a time.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="how-it-works section" id="how-it-works">
        <div className="container">
          <div className="section-label">How It Works</div>
          <h2 className="section-title section-title--center">
            Three simple steps
            <br />
            to make a difference.
          </h2>
          <p className="section-subtitle">
            Whether you&apos;re a store or a shopper, getting started takes minutes.
          </p>
          <div className="steps">
            <div className="step-card" data-step="01">
              <div className="step-card__icon-wrap">
                <svg className="step-card__icon" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="8" y="20" width="32" height="22" rx="4" stroke="currentColor" strokeWidth="2.5" />
                  <path d="M16 20V14a8 8 0 0116 0v6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="24" cy="31" r="3" fill="currentColor" />
                </svg>
              </div>
              <div className="step-card__number">01</div>
              <h3 className="step-card__title">Stores drop surprise deals</h3>
              <p className="step-card__desc">
                Partner stores regularly release curated boxes with great value — giving customers
                access to quality items at a better price.
              </p>
            </div>
            <div className="step-connector">
              <svg viewBox="0 0 60 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 10 Q30 0 60 10" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3" />
              </svg>
            </div>
            <div className="step-card" data-step="02">
              <div className="step-card__icon-wrap">
                <svg className="step-card__icon" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="6" y="14" width="36" height="26" rx="4" stroke="currentColor" strokeWidth="2.5" />
                  <path d="M6 22h36" stroke="currentColor" strokeWidth="2.5" />
                  <rect x="14" y="6" width="4" height="12" rx="2" fill="currentColor" />
                  <rect x="30" y="6" width="4" height="12" rx="2" fill="currentColor" />
                  <path d="M14 30h8M14 36h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <div className="step-card__number">02</div>
              <h3 className="step-card__title">Users purchase at a discount</h3>
              <p className="step-card__desc">
                Customers browse nearby boxes on the app, reserve one with a single tap, and pay a
                fraction of the original price — typically saving up to 70%.
              </p>
            </div>
            <div className="step-connector">
              <svg viewBox="0 0 60 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 10 Q30 20 60 10" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3" />
              </svg>
            </div>
            <div className="step-card" data-step="03">
              <div className="step-card__icon-wrap">
                <svg className="step-card__icon" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 6C14.06 6 6 14.06 6 24s8.06 18 18 18 18-8.06 18-18S33.94 6 24 6z" stroke="currentColor" strokeWidth="2.5" />
                  <path d="M16 24l6 6 10-12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="step-card__number">03</div>
              <h3 className="step-card__title">Users pick up and enjoy</h3>
              <p className="step-card__desc">
                At the designated pick-up time, customers collect their box directly from the store.
                Every box is a delightful surprise — and every pick-up saves food from landfill.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUE PROPOSITION ── */}
      <section className="value section" id="value">
        <div className="container">
          <div className="section-label">Why Box It Up</div>
          <h2 className="section-title section-title--center">
            Built for everyone
            <br />
            in the food chain.
          </h2>
          <p className="section-subtitle">Our platform creates meaningful value at every level.</p>
          <div className="value__grid">
            <div className="value-card">
              <div className="value-card__icon-wrap value-card__icon-wrap--customer">
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="24" cy="16" r="8" stroke="currentColor" strokeWidth="2.5" />
                  <path d="M8 40c0-8.837 7.163-16 16-16s16 7.163 16 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="value-card__title">For Customers</h3>
              <ul className="value-card__list">
                <li>Save up to 70% on quality food</li>
                <li>Discover new local restaurants and cafés</li>
                <li>Enjoy the thrill of a surprise every time</li>
                <li>Contribute to reducing food waste</li>
                <li>Easy pick-up — no delivery wait</li>
              </ul>
            </div>
            <div className="value-card value-card--featured">
              <div className="value-card__icon-wrap value-card__icon-wrap--business">
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="6" y="22" width="36" height="20" rx="3" stroke="currentColor" strokeWidth="2.5" />
                  <path d="M14 22V16a10 10 0 0120 0v6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M18 32h12M24 28v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <div className="value-card__featured-badge">Most Popular</div>
              <h3 className="value-card__title">For Businesses</h3>
              <ul className="value-card__list">
                <li>Turn unsold inventory into revenue</li>
                <li>Increase store visibility and foot traffic</li>
                <li>Boost your brand&apos;s sustainability image</li>
                <li>Zero extra effort — list in 2 minutes</li>
                <li>Data insights on demand and customer behavior</li>
              </ul>
            </div>
            <div className="value-card">
              <div className="value-card__icon-wrap value-card__icon-wrap--planet">
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="2.5" />
                  <path d="M8 24c4-6 8-10 16-10s12 4 16 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M8 24c4 6 8 10 16 10s12-4 16-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M24 8v32M8 24h32" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                </svg>
              </div>
              <h3 className="value-card__title">For Sustainability</h3>
              <ul className="value-card__list">
                <li>Reduce unnecessary food waste</li>
                <li>Divert tonnes of food from landfills</li>
                <li>Lower the carbon footprint of food systems</li>
                <li>Support a more efficient food system</li>
                <li>Measurable environmental impact</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED BOXES ── */}
      <section className="featured section" id="featured">
        <div className="container">
          <div className="section-label">Featured Today</div>
          <div className="featured__header">
            <h2 className="section-title">
              Boxes available
              <br />
              near you.
            </h2>
            <a href="#signup" className="btn btn--outline">View All Boxes</a>
          </div>
          <div className="featured__grid">
            {[
              {
                imgClass: 'feat-card__img--1',
                category: 'Bakery',
                discount: '-67%',
                avatarClass: 'feat-card__avatar--1',
                avatarText: 'GC',
                store: 'The Golden Crust',
                distance: '0.3 km away',
                title: 'Morning Surprise Box',
                desc: "A selection of freshly baked breads, pastries, and croissants from today's unsold stock.",
                price: '$6.00',
                oldPrice: '$18.00',
                pickup: 'Pick up 6–8 PM',
              },
              {
                imgClass: 'feat-card__img--2',
                category: 'Japanese',
                discount: '-67%',
                avatarClass: 'feat-card__avatar--2',
                avatarText: 'SK',
                store: 'Sakura Kitchen',
                distance: '0.8 km away',
                title: "Chef's Pick Box",
                desc: "A curated selection of sushi rolls, nigiri, and miso soup from the chef's daily preparation.",
                price: '$8.00',
                oldPrice: '$24.00',
                pickup: 'Pick up 8–9 PM',
              },
              {
                imgClass: 'feat-card__img--3',
                category: 'Café',
                discount: '-67%',
                avatarClass: 'feat-card__avatar--3',
                avatarText: 'BC',
                store: 'Bloom Coffee Co.',
                distance: '1.2 km away',
                title: 'Afternoon Delight Box',
                desc: 'Sandwiches, wraps, and sweet treats from our afternoon menu — all freshly made today.',
                price: '$5.00',
                oldPrice: '$15.00',
                pickup: 'Pick up 5–7 PM',
              },
              {
                imgClass: 'feat-card__img--4',
                category: 'Italian',
                discount: '-60%',
                avatarClass: 'feat-card__avatar--4',
                avatarText: 'NP',
                store: 'Napoli Pronto',
                distance: '1.5 km away',
                title: 'Pasta & Sides Box',
                desc: 'Generous portions of handmade pasta, bruschetta, and tiramisu — a full Italian experience.',
                price: '$9.00',
                oldPrice: '$22.00',
                pickup: 'Pick up 9–10 PM',
              },
            ].map((card) => (
              <div key={card.title} className="feat-card">
                <div className={`feat-card__img ${card.imgClass}`}>
                  <span className="feat-card__category">{card.category}</span>
                  <span className="feat-card__discount">{card.discount}</span>
                </div>
                <div className="feat-card__body">
                  <div className="feat-card__store-row">
                    <div className={`feat-card__avatar ${card.avatarClass}`}>{card.avatarText}</div>
                    <div>
                      <p className="feat-card__store-name">{card.store}</p>
                      <p className="feat-card__distance">{card.distance}</p>
                    </div>
                  </div>
                  <h3 className="feat-card__title">{card.title}</h3>
                  <p className="feat-card__desc">{card.desc}</p>
                  <div className="feat-card__footer">
                    <div className="feat-card__pricing">
                      <span className="feat-card__price">{card.price}</span>
                      <span className="feat-card__price-old">{card.oldPrice}</span>
                    </div>
                    <div className="feat-card__pickup">{card.pickup}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="testimonials section" id="testimonials">
        <div className="container">
          <div className="section-label">What People Say</div>
          <h2 className="section-title section-title--center">
            Loved by customers
            <br />
            and businesses alike.
          </h2>
          <div className="testimonials__grid">
            <div className="testimonial-card">
              <div className="testimonial-card__stars">★★★★★</div>
              <p className="testimonial-card__quote">
                &ldquo;I&apos;ve discovered so many amazing local spots through Box It Up. The
                surprise element makes it genuinely exciting — and the savings are real.&rdquo;
              </p>
              <div className="testimonial-card__author">
                <div className="testimonial-card__avatar">SL</div>
                <div>
                  <p className="testimonial-card__name">Sophie L.</p>
                  <p className="testimonial-card__role">Regular Customer</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card testimonial-card--featured">
              <div className="testimonial-card__stars">★★★★★</div>
              <p className="testimonial-card__quote">
                &ldquo;We used to throw away nearly 20% of our daily bakes. Since joining Box It
                Up, that number is almost zero — and we&apos;ve gained dozens of new
                regulars.&rdquo;
              </p>
              <div className="testimonial-card__author">
                <div className="testimonial-card__avatar">MR</div>
                <div>
                  <p className="testimonial-card__name">Marco R.</p>
                  <p className="testimonial-card__role">Owner, The Golden Crust</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-card__stars">★★★★★</div>
              <p className="testimonial-card__quote">
                &ldquo;As someone who cares about sustainability, Box It Up aligns perfectly with my
                values. It feels good knowing every box I buy keeps food out of landfill.&rdquo;
              </p>
              <div className="testimonial-card__author">
                <div className="testimonial-card__avatar">AK</div>
                <div>
                  <p className="testimonial-card__name">Aiko K.</p>
                  <p className="testimonial-card__role">Eco-conscious Shopper</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section section" id="signup">
        <div className="container">
          <div className="cta-section__inner">
            <div className="cta-section__badge">Join the movement</div>
            <h2 className="cta-section__headline">
              Join the movement to
              <br />
              reduce food waste.
            </h2>
            <p className="cta-section__subtext">
              Whether you&apos;re a hungry customer or a forward-thinking business, Box It Up has a
              place for you. Sign up today and start making a difference — one box at a time.
            </p>
            <div className="cta-section__actions">
              <a href="#signup" className="btn btn--primary btn--large">Download App</a>
              <a href="#how-it-works" className="btn btn--ghost btn--large">Learn More</a>
            </div>
            <p className="cta-section__note">Free to join. No commitment required.</p>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section className="home-contact section" id="contact">
        <div className="container">
          <div className="home-contact__inner">
            <div>
              <div className="section-label">Get in touch</div>
              <h2 className="home-contact__heading">
                Have a question or<br />want to work together?
              </h2>
              <p className="home-contact__sub">
                Whether you&apos;re a store interested in partnering, a student who wants to build with us, or just curious — drop us a message.
              </p>
              <div className="home-contact__reasons">
                <div className="home-contact__reason">
                  <div className="home-contact__reason-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 9l1-5h16l1 5"/><path d="M3 9h18v11a1 1 0 01-1 1H4a1 1 0 01-1-1V9z"/><path d="M9 21v-6h6v6"/>
                    </svg>
                  </div>
                  <div className="home-contact__reason-body">
                    <strong>Store partnerships</strong>
                    <span>Turn surplus inventory into a new revenue stream and reach new customers.</span>
                  </div>
                </div>
                <div className="home-contact__reason">
                  <div className="home-contact__reason-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
                    </svg>
                  </div>
                  <div className="home-contact__reason-body">
                    <strong>Early collaboration</strong>
                    <span>Students and builders can get hands-on startup experience and ownership.</span>
                  </div>
                </div>
                <div className="home-contact__reason">
                  <div className="home-contact__reason-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                    </svg>
                  </div>
                  <div className="home-contact__reason-body">
                    <strong>Feedback &amp; ideas</strong>
                    <span>Share user pain points or product ideas that could shape Box It Up early.</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="contact-form-wrap">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="container">
          <div className="footer__top">
            <div className="footer__brand">
              <a href="/" className="footer__logo">
                <img src="/app_logo.png" alt="Box It Up Logo" className="footer__logo-img" />
              </a>
              <p className="footer__tagline">
                Connecting surplus food with people who care — reducing waste, creating value, one
                box at a time.
              </p>
              <div className="footer__socials">
                <a href="#" className="footer__social" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                  </svg>
                </a>
                <a href="#" className="footer__social" aria-label="Twitter">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0016 2a4.48 4.48 0 00-4.48 4.48c0 .35.04.69.11 1.02A12.72 12.72 0 013 3.8a4.48 4.48 0 001.39 5.98A4.46 4.46 0 012.8 9v.06a4.48 4.48 0 003.59 4.39 4.5 4.5 0 01-2.02.08 4.48 4.48 0 004.18 3.11A8.98 8.98 0 012 19.54a12.72 12.72 0 006.88 2.02c8.26 0 12.78-6.84 12.78-12.78 0-.19 0-.39-.01-.58A9.14 9.14 0 0023 3z" />
                  </svg>
                </a>
                <a href="#" className="footer__social" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="footer__links-group">
              <h4 className="footer__links-title">Platform</h4>
              <ul className="footer__links">
                <li><a href="#how-it-works">How It Works</a></li>
                <li><a href="#featured">Browse Boxes</a></li>
                <li><a href="/merchant/signup">For Businesses</a></li>
                <li><a href="#signup">Sign Up</a></li>
              </ul>
            </div>
            <div className="footer__links-group">
              <h4 className="footer__links-title">Company</h4>
              <ul className="footer__links">
                <li><a href="#about">About Us</a></li>
                <li><a href="/careers">Careers</a></li>
                <li><a href="/contact">Partners</a></li>
              </ul>
            </div>
            <div className="footer__links-group">
              <h4 className="footer__links-title">Contact</h4>
              <ul className="footer__links footer__links--contact">
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  boxitupofficial@gmail.com
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.02 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
                  </svg>
                  +886 123 456 789
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  Taipei, Taiwan
                </li>
              </ul>
            </div>
          </div>
          <div className="footer__bottom">
            <p className="footer__copy">© 2026 Box It Up. All rights reserved.</p>
            <div className="footer__legal">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
              <a href="/cookie">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
