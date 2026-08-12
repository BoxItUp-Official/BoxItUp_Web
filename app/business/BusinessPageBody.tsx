import BusinessLeadForm from './BusinessLeadForm'
import { BUSINESS_CONTENT } from './businessContent'
import type { Locale } from '../homeContent'
import './business.css'

/* Icons are locale-independent — paired with the perk copy by position. */
const PERK_ICONS: React.ReactNode[] = [
  <path key="i" d="M12 2l2.4 7.2H22l-6 4.4 2.3 7.2L12 16.4 5.7 20.8 8 13.6l-6-4.4h7.6z" />,
  <g key="i"><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M3 11h18M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></g>,
  <path key="i" d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" />,
]

/** Shared by /business, /tw/business and /cn/business. */
export default function BusinessPageBody({ locale }: { locale: Locale }) {
  const c = BUSINESS_CONTENT[locale]

  return (
    <main className="biz">
      <div className="container">
        <div className="biz__grid">
          {/* Left — pitch */}
          <div className="biz__intro">
            <span className="biz__badge">{c.badge}</span>
            <h1 className="biz__title">
              {c.title}
              <span className="hero__headline-accent">{c.titleAccent}</span>
              {c.titleTail}
            </h1>
            <p className="biz__lead">{c.lead}</p>

            <ul className="biz__perks">
              {c.perks.map((p, i) => (
                <li key={p.title} className="biz-perk">
                  <span className="biz-perk__icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{PERK_ICONS[i]}</svg>
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
            <h2 className="biz__form-title">{c.formTitle}</h2>
            <p className="biz__form-sub">{c.formSub}</p>
            <BusinessLeadForm t={c.form} />
          </div>
        </div>
      </div>
    </main>
  )
}
