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
      a: "Not the exact items — the surprise is what makes the price possible. You do choose the store and the box type (bakery, café, meals…), and stores list allergen info where it applies.",
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
  ],
} as const

type Tab = keyof typeof FAQS

export default function FaqTabs() {
  const [tab, setTab] = useState<Tab>('customer')

  return (
    <>
      <div className="faq-tabs">
        <button
          type="button"
          className={`faq-tab${tab === 'customer' ? ' faq-tab--active' : ''}`}
          onClick={() => setTab('customer')}
        >
          For Customers
        </button>
        <button
          type="button"
          className={`faq-tab${tab === 'merchant' ? ' faq-tab--active' : ''}`}
          onClick={() => setTab('merchant')}
        >
          For Merchants
        </button>
      </div>

      <div className="faq__list">
        {FAQS[tab].map((f) => (
          <details key={f.q} className="faq-item">
            <summary className="faq-item__q">
              {f.q}
              <span className="faq-item__icon" aria-hidden="true">+</span>
            </summary>
            <p className="faq-item__a">{f.a}</p>
          </details>
        ))}
      </div>
    </>
  )
}
