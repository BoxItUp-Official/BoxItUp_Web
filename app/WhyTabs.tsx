'use client'

import { useState } from 'react'
import { Stagger, StaggerItem } from '@/components/motion/Reveal'
import type { HomeContent } from './homeContent'

/* Icons are locale-independent — paired with the copy by position. */
const CUSTOMER_ICONS: React.ReactNode[] = [
  <path key="i" d="M12 3l2.5 5.5L20 11l-5.5 2.5L12 19l-2.5-5.5L4 11l5.5-2.5z" />,
  <g key="i"><circle cx="12" cy="10" r="3" /><path d="M12 21s-7-6.5-7-11a7 7 0 0 1 14 0c0 4.5-7 11-7 11z" /></g>,
  <path key="i" d="M12 2l2.4 7.2H22l-6 4.4 2.3 7.2L12 16.4 5.7 20.8 8 13.6l-6-4.4h7.6z" />,
  <g key="i"><path d="M12 22c4-3 8-7 8-12A8 8 0 0 0 4 10c0 5 4 9 8 12z" /><path d="M12 15V8M9 11l3-3 3 3" /></g>,
]

const MERCHANT_ICONS: React.ReactNode[] = [
  <g key="i"><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M3 11h18M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></g>,
  <g key="i"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" /></g>,
  <g key="i"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></g>,
  <path key="i" d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />,
]

export default function WhyTabs({
  content,
  businessHref,
}: {
  content: HomeContent['why']
  businessHref: string
}) {
  const [tab, setTab] = useState<'customer' | 'merchant'>('customer')
  const reasons = tab === 'customer' ? content.customer : content.merchant
  const icons = tab === 'customer' ? CUSTOMER_ICONS : MERCHANT_ICONS

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
          {content.tabCustomer}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'merchant'}
          className={`why-tabs__btn${tab === 'merchant' ? ' why-tabs__btn--active' : ''}`}
          onClick={() => setTab('merchant')}
        >
          {content.tabMerchant}
        </button>
        <span className={`why-tabs__glider why-tabs__glider--${tab}`} aria-hidden="true" />
      </div>

      <Stagger className="why-tabs__grid" key={tab}>
        {reasons.map((r, i) => (
          <StaggerItem key={r.title} className="why-tile">
            <span className="why-tile__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{icons[i]}</svg>
            </span>
            <div>
              <h4 className="why-tile__title">{r.title}</h4>
              <p className="why-tile__text">{r.text}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>

      <div className="why-tabs__cta">
        {tab === 'customer' ? (
          <a href="#download" className="btn btn--primary btn--large">{content.ctaCustomer}</a>
        ) : (
          <a href={businessHref} className="btn btn--primary btn--large">{content.ctaMerchant}</a>
        )}
      </div>
    </div>
  )
}
