'use client'

import { useActionState, useState } from 'react'
import { saveMerchantProfile, type OnboardingState } from '../actions'

const CATEGORIES = [
  'Bakery',
  'Café',
  'Restaurant',
  'Convenience Store',
  'Supermarket',
  'Deli / Butcher',
  'Fresh Market / Produce',
  'Other',
]

const CITIES = [
  'Taipei', 'New Taipei', 'Taoyuan', 'Taichung',
  'Tainan', 'Kaohsiung', 'Hsinchu', 'Keelung', 'Other',
]

const initial: OnboardingState = { status: 'idle', message: '' }

export default function MerchantOnboardingPage() {
  const [step, setStep] = useState(1)
  const [state, action, pending] = useActionState(saveMerchantProfile, initial)

  // Client-side field state for review step
  const [fields, setFields] = useState({
    store_name: '', category: '', address: '', city: '',
    phone: '', line_id: '', description: '',
  })

  function update(key: keyof typeof fields, value: string) {
    setFields((prev) => ({ ...prev, [key]: value }))
  }

  function validateStep1() {
    return fields.store_name.trim() && fields.category && fields.address.trim() && fields.city
  }

  const steps = [
    { label: 'Store info' },
    { label: 'Contact' },
    { label: 'Review' },
  ]

  return (
    <main className="merchant-onboarding">
      {/* Step indicators */}
      <div className="merchant-onboarding__steps">
        {steps.map((s, i) => {
          const n = i + 1
          const done = step > n
          const active = step === n
          return (
            <div key={n} style={{ display: 'flex', alignItems: 'center' }}>
              <div className="merchant-step">
                <div className={`merchant-step__dot${active ? ' merchant-step__dot--active' : done ? ' merchant-step__dot--done' : ''}`}>
                  {done ? '✓' : n}
                </div>
                <span className={`merchant-step__label${active ? ' merchant-step__label--active' : ''}`}>
                  {s.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={`merchant-step__connector${done ? ' merchant-step__connector--done' : ''}`} />
              )}
            </div>
          )
        })}
      </div>

      <div className="merchant-onboarding__card">
        {/* ── Step 1: Store basics ── */}
        {step === 1 && (
          <>
            <h2 className="merchant-onboarding__title">Tell us about your store</h2>
            <p className="merchant-onboarding__sub">Basic information that will appear on your Box It Up profile.</p>

            <div className="merchant-field">
              <label>Store name *</label>
              <input
                type="text"
                placeholder="e.g. Sunrise Bakery"
                value={fields.store_name}
                onChange={(e) => update('store_name', e.target.value)}
              />
            </div>

            <div className="merchant-field">
              <label>Category *</label>
              <select value={fields.category} onChange={(e) => update('category', e.target.value)}>
                <option value="">Select a category</option>
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>

            <div className="merchant-field">
              <label>Street address *</label>
              <input
                type="text"
                placeholder="e.g. No. 10, Zhongshan N. Rd., Sec. 2"
                value={fields.address}
                onChange={(e) => update('address', e.target.value)}
              />
            </div>

            <div className="merchant-field">
              <label>City / District *</label>
              <select value={fields.city} onChange={(e) => update('city', e.target.value)}>
                <option value="">Select a city</option>
                {CITIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>

            <div className="merchant-onboarding__actions">
              <button
                type="button"
                className="btn btn--primary btn--large"
                disabled={!validateStep1()}
                onClick={() => setStep(2)}
              >
                Continue →
              </button>
            </div>
          </>
        )}

        {/* ── Step 2: Contact & description ── */}
        {step === 2 && (
          <>
            <h2 className="merchant-onboarding__title">Contact &amp; description</h2>
            <p className="merchant-onboarding__sub">Help customers and our team reach you. All fields optional.</p>

            <div className="merchant-field">
              <label>Phone number</label>
              <input
                type="tel"
                placeholder="+886 2 1234 5678"
                value={fields.phone}
                onChange={(e) => update('phone', e.target.value)}
              />
            </div>

            <div className="merchant-field">
              <label>LINE ID</label>
              <input
                type="text"
                placeholder="Your store LINE ID"
                value={fields.line_id}
                onChange={(e) => update('line_id', e.target.value)}
              />
              <span className="merchant-field__hint">This is how customers contact you on LINE after purchase.</span>
            </div>

            <div className="merchant-field">
              <label>Store description</label>
              <textarea
                placeholder="Tell customers what makes your store special, what kinds of items you typically have..."
                value={fields.description}
                onChange={(e) => update('description', e.target.value)}
              />
            </div>

            <div className="merchant-onboarding__actions">
              <button type="button" className="btn btn--ghost btn--large" onClick={() => setStep(1)}>
                ← Back
              </button>
              <button type="button" className="btn btn--primary btn--large" onClick={() => setStep(3)}>
                Review →
              </button>
            </div>
          </>
        )}

        {/* ── Step 3: Review & submit ── */}
        {step === 3 && (
          <form action={action}>
            {/* Hidden fields carrying all values */}
            <input type="hidden" name="store_name" value={fields.store_name} />
            <input type="hidden" name="category" value={fields.category} />
            <input type="hidden" name="address" value={fields.address} />
            <input type="hidden" name="city" value={fields.city} />
            <input type="hidden" name="phone" value={fields.phone} />
            <input type="hidden" name="line_id" value={fields.line_id} />
            <input type="hidden" name="description" value={fields.description} />

            <h2 className="merchant-onboarding__title">Review your details</h2>
            <p className="merchant-onboarding__sub">Everything look right? You can update these later.</p>

            <div className="merchant-review">
              {[
                ['Store name', fields.store_name],
                ['Category', fields.category],
                ['Address', fields.address],
                ['City', fields.city],
                ['Phone', fields.phone || '—'],
                ['LINE ID', fields.line_id || '—'],
                ['Description', fields.description || '—'],
              ].map(([label, value]) => (
                <div key={label} className="merchant-review__row">
                  <span className="merchant-review__label">{label}</span>
                  <span className="merchant-review__value">{value}</span>
                </div>
              ))}
            </div>

            {state.status === 'error' && (
              <div className="merchant-error">{state.message}</div>
            )}

            <div className="merchant-onboarding__actions">
              <button type="button" className="btn btn--ghost btn--large" onClick={() => setStep(2)}>
                ← Back
              </button>
              <button type="submit" className="btn btn--primary btn--large" disabled={pending}>
                {pending ? 'Saving…' : 'Complete setup'}
              </button>
            </div>
          </form>
        )}
      </div>
    </main>
  )
}
