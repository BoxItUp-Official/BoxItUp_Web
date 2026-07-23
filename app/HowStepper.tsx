'use client'

import { useState } from 'react'

type Step = { title: string; desc: string; icon: React.ReactNode }

const CUSTOMER_STEPS: Step[] = [
  { title: 'Download & sign up', desc: 'Get the app and see surprise boxes from stores near you in seconds.', icon: <><path d="M12 3v12M7 10l5 5 5-5" /><path d="M5 21h14" /></> },
  { title: 'Choose your box', desc: "Browse today's surprise boxes and pick the one that catches your eye.", icon: <><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><path d="M3 6h18M16 10a4 4 0 0 1-8 0" /></> },
  { title: 'Pay & get your code', desc: 'Pay in the app, get your pickup code instantly, then collect at the store.', icon: <><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20M6 15h4" /></> },
]

const MERCHANT_STEPS: Step[] = [
  { title: "List today's box", desc: "Set price, quantity and pickup window for what's left today — takes two minutes.", icon: <><path d="M12 5v14M5 12h14" /></> },
  { title: 'Receive orders', desc: 'Customers reserve and pay in the app — orders land straight in your dashboard.', icon: <><path d="M22 12h-6l-2 3h-4l-2-3H2" /><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" /></> },
  { title: 'Customers pick up', desc: 'Check the pickup code, hand over the box — quick and contactless.', icon: <><path d="M20 6 9 17l-5-5" /></> },
  { title: 'Settle daily', desc: 'See exactly what you recovered from waste, day by day, in your dashboard.', icon: <><path d="M3 3v18h18" /><path d="M7 14l4-4 3 3 5-6" /></> },
]

function StepRail({ steps }: { steps: Step[] }) {
  const [active, setActive] = useState(0)
  return (
    <div className="stepper">
      <div className="stepper__rail" role="tablist">
        {steps.map((s, i) => (
          <button
            key={s.title}
            type="button"
            role="tab"
            aria-selected={i === active}
            className={`stepper__node${i === active ? ' stepper__node--active' : ''}${i < active ? ' stepper__node--done' : ''}`}
            onClick={() => setActive(i)}
          >
            <span className="stepper__num">{String(i + 1).padStart(2, '0')}</span>
            <span className="stepper__node-label">{s.title}</span>
          </button>
        ))}
        <span
          className="stepper__progress"
          style={{ width: `${(active / (steps.length - 1)) * 100}%` }}
          aria-hidden="true"
        />
      </div>

      <div className="stepper__panel" key={active}>
        <span className="stepper__panel-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{steps[active].icon}</svg>
        </span>
        <div className="stepper__panel-body">
          <span className="stepper__panel-step">Step {active + 1} of {steps.length}</span>
          <h4 className="stepper__panel-title">{steps[active].title}</h4>
          <p className="stepper__panel-desc">{steps[active].desc}</p>
        </div>
        <div className="stepper__panel-nav">
          <button type="button" className="stepper__arrow" disabled={active === 0} onClick={() => setActive((a) => Math.max(0, a - 1))} aria-label="Previous step">←</button>
          <button type="button" className="stepper__arrow" disabled={active === steps.length - 1} onClick={() => setActive((a) => Math.min(steps.length - 1, a + 1))} aria-label="Next step">→</button>
        </div>
      </div>
    </div>
  )
}

export default function HowStepper() {
  const [side, setSide] = useState<'customer' | 'merchant'>('customer')
  return (
    <div className="how-stepper">
      <div className="how-stepper__toggle">
        <button type="button" className={`how-stepper__toggle-btn${side === 'customer' ? ' how-stepper__toggle-btn--active' : ''}`} onClick={() => setSide('customer')}>I want to eat</button>
        <button type="button" className={`how-stepper__toggle-btn${side === 'merchant' ? ' how-stepper__toggle-btn--active' : ''}`} onClick={() => setSide('merchant')}>I run a store</button>
      </div>
      <StepRail key={side} steps={side === 'customer' ? CUSTOMER_STEPS : MERCHANT_STEPS} />
    </div>
  )
}
