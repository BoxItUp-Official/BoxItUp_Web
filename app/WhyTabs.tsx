'use client'

import { useState } from 'react'

type Reason = { title: string; text: string; icon: React.ReactNode }

const CUSTOMER: Reason[] = [
  { title: 'Surprise experience', text: 'Unboxing your daily pick is the best part of the day.', icon: <path d="M12 3l2.5 5.5L20 11l-5.5 2.5L12 19l-2.5-5.5L4 11l5.5-2.5z" /> },
  { title: 'Discover local brands', text: 'Meet neighborhood stores you would have walked right past.', icon: <><circle cx="12" cy="10" r="3" /><path d="M12 21s-7-6.5-7-11a7 7 0 0 1 14 0c0 4.5-7 11-7 11z" /></> },
  { title: 'Premium quality', text: 'The same craft and freshness — at a much friendlier price.', icon: <path d="M12 2l2.4 7.2H22l-6 4.4 2.3 7.2L12 16.4 5.7 20.8 8 13.6l-6-4.4h7.6z" /> },
  { title: 'Sustainable choice', text: 'Every box you rescue keeps good food off the landfill.', icon: <><path d="M12 22c4-3 8-7 8-12A8 8 0 0 0 4 10c0 5 4 9 8 12z" /><path d="M12 15V8M9 11l3-3 3 3" /></> },
]

const MERCHANT: Reason[] = [
  { title: 'Extra revenue', text: "Turn tonight's surplus into income instead of a loss.", icon: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M3 11h18M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></> },
  { title: 'Reach new customers', text: 'Get discovered by people who live right around the corner.', icon: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" /></> },
  { title: 'Minimal effort', text: 'List a surprise box in under two minutes a day.', icon: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></> },
  { title: 'Brand goodwill', text: 'Tell a sustainability story your customers can feel good about.', icon: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" /> },
]

export default function WhyTabs() {
  const [tab, setTab] = useState<'customer' | 'merchant'>('customer')
  const reasons = tab === 'customer' ? CUSTOMER : MERCHANT

  return (
    <div className="why-tabs">
      <div className="why-tabs__switch" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'customer'}
          className={`why-tabs__btn${tab === 'customer' ? ' why-tabs__btn--active' : ''}`}
          onClick={() => setTab('customer')}
        >
          For Customers
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'merchant'}
          className={`why-tabs__btn${tab === 'merchant' ? ' why-tabs__btn--active' : ''}`}
          onClick={() => setTab('merchant')}
        >
          For Merchants
        </button>
        <span className={`why-tabs__glider why-tabs__glider--${tab}`} aria-hidden="true" />
      </div>

      <div className="why-tabs__grid" key={tab}>
        {reasons.map((r) => (
          <div key={r.title} className="why-tile">
            <span className="why-tile__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{r.icon}</svg>
            </span>
            <div>
              <h4 className="why-tile__title">{r.title}</h4>
              <p className="why-tile__text">{r.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="why-tabs__cta">
        {tab === 'customer' ? (
          <a href="#download" className="btn btn--primary btn--large">Download the app</a>
        ) : (
          <a href="/merchant/signup" className="btn btn--primary btn--large">Become a partner</a>
        )}
      </div>
    </div>
  )
}
