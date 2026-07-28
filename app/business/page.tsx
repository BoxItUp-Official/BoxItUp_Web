import type { Metadata } from 'next'
import BusinessLeadForm from './BusinessLeadForm'
import './business.css'

export const metadata: Metadata = {
  title: 'Business Early Access | Box It Up',
  description:
    'Register your store for early access to Box It Up — turn surplus food into revenue when we open to partner stores.',
  icons: { icon: '/logo_icon_gradiant.png' },
}

const PERKS = [
  {
    title: 'First in line',
    text: 'Get onboarded before we open publicly, and start listing from day one.',
    icon: <><path d="M12 2l2.4 7.2H22l-6 4.4 2.3 7.2L12 16.4 5.7 20.8 8 13.6l-6-4.4h7.6z" /></>,
  },
  {
    title: 'Turn surplus into revenue',
    text: "Recover value from food you'd otherwise throw away — no upfront cost.",
    icon: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M3 11h18M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></>,
  },
  {
    title: 'Shape the product',
    text: 'Early partners help decide what we build next for stores like yours.',
    icon: <><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" /></>,
  },
]

export default function BusinessPage() {
  return (
    <>
      <main className="biz">
        <div className="container">
          <div className="biz__grid">
            {/* Left — pitch */}
            <div className="biz__intro">
              <span className="biz__badge">Early access · Partner stores</span>
              <h1 className="biz__title">
                Bring your store
                <br />
                to <span className="hero__headline-accent">Box It Up.</span>
              </h1>
              <p className="biz__lead">
                We&apos;re opening to partner stores soon. Register your interest and we&apos;ll
                reach out as soon as sign-ups go live — with onboarding help to get your first
                surprise box listed.
              </p>

              <ul className="biz__perks">
                {PERKS.map((p) => (
                  <li key={p.title} className="biz-perk">
                    <span className="biz-perk__icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{p.icon}</svg>
                    </span>
                    <div>
                      <h3>{p.title}</h3>
                      <p>{p.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right — form */}
            <div className="biz__form-card">
              <h2 className="biz__form-title">Request early access</h2>
              <p className="biz__form-sub">Takes under a minute. We&apos;ll only use this to contact you about partnering.</p>
              <BusinessLeadForm />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
