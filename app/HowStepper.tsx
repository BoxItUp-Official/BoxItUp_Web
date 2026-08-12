'use client'

import { useState } from 'react'
import type { HomeContent, Step } from './homeContent'

/* Icons are locale-independent — paired with the copy by position. */
const CUSTOMER_ICONS: React.ReactNode[] = [
  <g key="i"><path d="M12 3v12M7 10l5 5 5-5" /><path d="M5 21h14" /></g>,
  <g key="i"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><path d="M3 6h18M16 10a4 4 0 0 1-8 0" /></g>,
  <g key="i"><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20M6 15h4" /></g>,
]

const MERCHANT_ICONS: React.ReactNode[] = [
  <path key="i" d="M12 5v14M5 12h14" />,
  <g key="i"><path d="M22 12h-6l-2 3h-4l-2-3H2" /><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" /></g>,
  <path key="i" d="M20 6 9 17l-5-5" />,
  <g key="i"><path d="M3 3v18h18" /><path d="M7 14l4-4 3 3 5-6" /></g>,
]

function StepRail({
  steps,
  icons,
  stepOf,
}: {
  steps: Step[]
  icons: React.ReactNode[]
  stepOf: string
}) {
  const [active, setActive] = useState(0)
  return (
    <div className="stepper">
      <div
        className="stepper__rail"
        role="tablist"
        style={{ '--cols': steps.length } as React.CSSProperties}
      >
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
          style={{ '--progress': active / (steps.length - 1) } as React.CSSProperties}
          aria-hidden="true"
        />
      </div>

      <div className="stepper__panel" key={active}>
        <span className="stepper__panel-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{icons[active]}</svg>
        </span>
        <div className="stepper__panel-body">
          <span className="stepper__panel-step">
            {stepOf.replace('{n}', String(active + 1)).replace('{total}', String(steps.length))}
          </span>
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

export default function HowStepper({ content }: { content: HomeContent['how'] }) {
  const [side, setSide] = useState<'customer' | 'merchant'>('customer')
  const isCustomer = side === 'customer'
  return (
    <div className="how-stepper">
      <div className="how-stepper__toggle">
        <button type="button" className={`how-stepper__toggle-btn${isCustomer ? ' how-stepper__toggle-btn--active' : ''}`} onClick={() => setSide('customer')}>{content.toggleCustomer}</button>
        <button type="button" className={`how-stepper__toggle-btn${!isCustomer ? ' how-stepper__toggle-btn--active' : ''}`} onClick={() => setSide('merchant')}>{content.toggleMerchant}</button>
      </div>
      <StepRail
        key={side}
        steps={isCustomer ? content.customer : content.merchant}
        icons={isCustomer ? CUSTOMER_ICONS : MERCHANT_ICONS}
        stepOf={content.stepOf}
      />
    </div>
  )
}
