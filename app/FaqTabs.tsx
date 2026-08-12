'use client'

import { useState } from 'react'
import type { HomeContent } from './homeContent'

type Tab = 'customer' | 'merchant'

export default function FaqTabs({
  content,
  contactHref,
}: {
  content: HomeContent['faq']
  contactHref: string
}) {
  const [tab, setTab] = useState<Tab>('customer')
  // -1 = all collapsed; users open a question themselves.
  const [open, setOpen] = useState(-1)

  const list = tab === 'customer' ? content.customer : content.merchant

  function switchTab(t: Tab) {
    setTab(t)
    setOpen(-1)
  }

  return (
    <div className="faq2">
      <div className="faq2__aside">
        <div className="faq2__switch">
          <button type="button" className={`faq2__switch-btn${tab === 'customer' ? ' faq2__switch-btn--active' : ''}`} onClick={() => switchTab('customer')}>{content.tabCustomer}</button>
          <button type="button" className={`faq2__switch-btn${tab === 'merchant' ? ' faq2__switch-btn--active' : ''}`} onClick={() => switchTab('merchant')}>{content.tabMerchant}</button>
        </div>
        <div className="faq2__contact">
          <h4>{content.stillTitle}</h4>
          <p>{content.stillBody}</p>
          <a href={contactHref} className="btn btn--secondary btn--sm">{content.stillCta}</a>
        </div>
      </div>

      <ul className="faq2__list" key={tab}>
        {list.map((f, i) => {
          const isOpen = open === i
          return (
            <li key={f.q} className={`faq2__item${isOpen ? ' faq2__item--open' : ''}`}>
              <button type="button" className="faq2__q" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? -1 : i)}>
                <span>{f.q}</span>
                <span className="faq2__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M6 9l6 6 6-6" /></svg>
                </span>
              </button>
              <div className="faq2__a-wrap">
                <p className="faq2__a">{f.a}</p>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
