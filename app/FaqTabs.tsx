'use client'

import { useState } from 'react'

// TODO(content): review answers — drafted from the product mechanics.
const FAQS = {
  customer: [
    {
      q: "What's inside a surprise box?",
      a: "A curated pick of that day's surplus — fresh items the store simply made too many of. Contents change daily, and that's the fun: you always get more value than you paid for.",
    },
    {
      q: 'Can I choose what goes in the box?',
      a: 'Not the exact items — the surprise is what makes the price possible. You do choose the store and the box type (bakery, café, meals…), and stores list allergen info where it applies.',
    },
    {
      q: 'Is the food fresh?',
      a: "Yes. Surplus doesn't mean expired — it's food made today that just didn't sell out. Every partner store follows the same food-safety rules as everything else they sell.",
    },
    {
      q: 'How do I pick up my box?',
      a: 'After you reserve, you get a pickup code in the app. Show it at the store during the pickup window (usually near closing time) and enjoy.',
    },
    {
      q: 'How do I pay?',
      a: 'You pay in the app when you reserve, so pickup is quick and contactless. Payment options will be announced at launch.',
    },
  ],
  merchant: [
    {
      q: 'How can my store join?',
      a: 'Sign up through the Merchant Portal — onboarding takes minutes, and you can list your first surprise box the same day, with no upfront cost.',
    },
    {
      q: 'Is there a fee to partner?',
      a: 'No upfront cost to join. Fee details will be shared during onboarding before you list anything — no surprises.',
    },
    {
      q: 'How much time does it take each day?',
      a: 'About two minutes: set the price, quantity and pickup window for whatever you have left. Orders then land straight in your dashboard.',
    },
  ],
} as const

type Tab = keyof typeof FAQS

export default function FaqTabs() {
  const [tab, setTab] = useState<Tab>('customer')
  // -1 = all collapsed; users open a question themselves.
  const [open, setOpen] = useState(-1)

  const list = FAQS[tab]

  function switchTab(t: Tab) {
    setTab(t)
    setOpen(-1)
  }

  return (
    <div className="faq2">
      <div className="faq2__aside">
        <div className="faq2__switch">
          <button type="button" className={`faq2__switch-btn${tab === 'customer' ? ' faq2__switch-btn--active' : ''}`} onClick={() => switchTab('customer')}>For Customers</button>
          <button type="button" className={`faq2__switch-btn${tab === 'merchant' ? ' faq2__switch-btn--active' : ''}`} onClick={() => switchTab('merchant')}>For Merchants</button>
        </div>
        <div className="faq2__contact">
          <h4>Still have a question?</h4>
          <p>We&apos;re happy to help — reach out any time.</p>
          <a href="/contact" className="btn btn--secondary btn--sm">Contact us →</a>
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
