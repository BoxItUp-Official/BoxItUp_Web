'use client'

import { useActionState, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { saveMerchantProfile, type OnboardingState } from '../actions'
import AvatarPicker from '../dashboard/profile/AvatarPicker'
import BusinessHours from '../dashboard/profile/BusinessHours'

const CATEGORIES = [
  'Bakery', 'Café', 'Restaurant', 'Convenience Store',
  'Supermarket', 'Deli / Butcher', 'Fresh Market / Produce', 'Other',
]
const CITIES = [
  'Taipei', 'New Taipei', 'Taoyuan', 'Taichung',
  'Tainan', 'Kaohsiung', 'Hsinchu', 'Keelung', 'Other',
]

const initial: OnboardingState = { status: 'idle', message: '' }

export default function MerchantOnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [userId, setUserId] = useState<string | null>(null)
  const [state, action, pending] = useActionState(saveMerchantProfile, initial)

  useEffect(() => {
    const check = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        if (process.env.NODE_ENV !== 'development') router.replace('/merchant/login')
        return
      }
      setUserId(user.id)
      const { data } = await supabase.from('merchants').select('onboarding_complete').eq('id', user.id).single()
      if (data?.onboarding_complete) router.replace('/merchant/dashboard')
    }
    check()
  }, [router])

  const [fields, setFields] = useState({
    store_name: '', category: '', description: '', address: '', city: '',
    contact_name: '', phone: '', line_id: '', website: '', instagram: '', business_reg_no: '',
  })
  const update = (key: keyof typeof fields, value: string) =>
    setFields((prev) => ({ ...prev, [key]: value }))

  // AI auto-fill
  const [aiName, setAiName] = useState('')
  const [aiCity, setAiCity] = useState('')
  const [aiKeywords, setAiKeywords] = useState('')
  const [aiLoading, setAiLoading] = useState(false)
  const [aiError, setAiError] = useState('')
  const [aiDone, setAiDone] = useState(false)

  async function runAutofill() {
    if (!aiName.trim()) { setAiError('Enter your store name first.'); return }
    setAiLoading(true); setAiError(''); setAiDone(false)
    try {
      const res = await fetch('/api/onboarding/autofill', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ store_name: aiName, city: aiCity, keywords: aiKeywords }),
      })
      if (!res.ok) throw new Error()
      const data = await res.json()
      setFields((prev) => ({
        ...prev,
        store_name: aiName || prev.store_name,
        city: aiCity || prev.city,
        category: data.category ?? prev.category,
        description: data.description ?? prev.description,
      }))
      setAiDone(true)
    } catch {
      setAiError('Could not generate right now — please fill the fields in manually.')
    } finally { setAiLoading(false) }
  }

  const validStep1 = fields.store_name.trim() && fields.category
  const validStep2 = fields.address.trim() && fields.city

  const steps = ['Store', 'Location', 'Contact', 'Review']

  return (
    <main className="merchant-onboarding">
      {/* Step indicators */}
      <div className="merchant-onboarding__steps">
        {steps.map((label, i) => {
          const n = i + 1
          const done = step > n
          const active = step === n
          return (
            <div key={n} style={{ display: 'flex', alignItems: 'center' }}>
              <div className="merchant-step">
                <div className={`merchant-step__dot${active ? ' merchant-step__dot--active' : done ? ' merchant-step__dot--done' : ''}`}>
                  {done ? '✓' : n}
                </div>
                <span className={`merchant-step__label${active ? ' merchant-step__label--active' : ''}`}>{label}</span>
              </div>
              {i < steps.length - 1 && (
                <div className={`merchant-step__connector${done ? ' merchant-step__connector--done' : ''}`} />
              )}
            </div>
          )
        })}
      </div>

      <div className="merchant-onboarding__card">
        <form
          action={action}
          onKeyDown={(e) => { if (e.key === 'Enter' && (e.target as HTMLElement).tagName !== 'TEXTAREA') e.preventDefault() }}
        >
          {/* ── Step 1: Store basics ── */}
          <div hidden={step !== 1}>
            <h2 className="merchant-onboarding__title">Tell us about your store</h2>
            <p className="merchant-onboarding__sub">The essentials customers will see on your Box It Up profile.</p>

            {/* AI auto-fill */}
            <div className="onboarding-ai">
              <div className="onboarding-ai__head">
                <span className="onboarding-ai__spark">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3l1.9 4.8L18.7 9.7l-4.8 1.9L12 16.4l-1.9-4.8L5.3 9.7l4.8-1.9z" />
                    <path d="M19 14l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z" />
                  </svg>
                </span>
                <div>
                  <div className="onboarding-ai__title">Auto-fill with AI</div>
                  <div className="onboarding-ai__sub">Enter a few details and we&apos;ll draft your category and description.</div>
                </div>
              </div>
              <div className="onboarding-ai__inputs">
                <input type="text" placeholder="Store name" value={aiName} onChange={(e) => setAiName(e.target.value)} />
                <select value={aiCity} onChange={(e) => setAiCity(e.target.value)}>
                  <option value="">City (optional)</option>
                  {CITIES.map((c) => <option key={c}>{c}</option>)}
                </select>
                <input type="text" placeholder="Keywords — e.g. sourdough, coffee, pastries" value={aiKeywords} onChange={(e) => setAiKeywords(e.target.value)} />
              </div>
              <button type="button" className="onboarding-ai__btn" onClick={runAutofill} disabled={aiLoading}>
                {aiLoading ? 'Drafting…' : 'Auto-fill with AI'}
              </button>
              {aiError && <p className="onboarding-ai__error">{aiError}</p>}
              {aiDone && !aiError && <p className="onboarding-ai__done">Draft ready — review and tweak the fields below.</p>}
            </div>

            <div className="onboarding-ai__divider"><span>or fill in manually</span></div>

            <div className="merchant-field">
              <label>Store avatar</label>
              <AvatarPicker category={fields.category} storeName={fields.store_name || 'Store'} userId={userId} />
            </div>
            <div className="merchant-field">
              <label>Store name *</label>
              <input type="text" name="store_name" placeholder="e.g. Sunrise Bakery" value={fields.store_name} onChange={(e) => update('store_name', e.target.value)} />
            </div>
            <div className="merchant-field">
              <label>Category *</label>
              <select name="category" value={fields.category} onChange={(e) => update('category', e.target.value)}>
                <option value="">Select a category</option>
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="merchant-field">
              <label>Store description</label>
              <textarea name="description" placeholder="What makes your store special, what kinds of items you typically have..." value={fields.description} onChange={(e) => update('description', e.target.value)} />
            </div>

            <div className="merchant-onboarding__actions">
              <button type="button" className="btn btn--primary btn--large" disabled={!validStep1} onClick={() => setStep(2)}>Continue →</button>
            </div>
          </div>

          {/* ── Step 2: Location & hours ── */}
          <div hidden={step !== 2}>
            <h2 className="merchant-onboarding__title">Location &amp; hours</h2>
            <p className="merchant-onboarding__sub">Where customers pick up, and when you&apos;re open.</p>

            <div className="merchant-field">
              <label>Street address *</label>
              <input type="text" name="address" placeholder="e.g. No. 10, Zhongshan N. Rd., Sec. 2" value={fields.address} onChange={(e) => update('address', e.target.value)} />
            </div>
            <div className="merchant-field">
              <label>City / District *</label>
              <select name="city" value={fields.city} onChange={(e) => update('city', e.target.value)}>
                <option value="">Select a city</option>
                {CITIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="merchant-field">
              <label>Business hours</label>
              <BusinessHours />
            </div>

            <div className="merchant-onboarding__actions">
              <button type="button" className="btn btn--secondary btn--large" onClick={() => setStep(1)}>← Back</button>
              <button type="button" className="btn btn--primary btn--large" disabled={!validStep2} onClick={() => setStep(3)}>Continue →</button>
            </div>
          </div>

          {/* ── Step 3: Contact & business ── */}
          <div hidden={step !== 3}>
            <h2 className="merchant-onboarding__title">Contact &amp; business details</h2>
            <p className="merchant-onboarding__sub">How people reach you. All optional — you can add these later.</p>

            <div className="merchant-field">
              <label>Contact person</label>
              <input type="text" name="contact_name" placeholder="Owner or manager name" value={fields.contact_name} onChange={(e) => update('contact_name', e.target.value)} />
            </div>
            <div className="merchant-field">
              <label>Phone number</label>
              <input type="tel" name="phone" placeholder="+886 2 1234 5678" value={fields.phone} onChange={(e) => update('phone', e.target.value)} />
            </div>
            <div className="merchant-field">
              <label>LINE ID</label>
              <input type="text" name="line_id" placeholder="Your store LINE ID" value={fields.line_id} onChange={(e) => update('line_id', e.target.value)} />
              <span className="merchant-field__hint">How customers contact you on LINE after purchase.</span>
            </div>
            <div className="merchant-field">
              <label>Website</label>
              <input type="url" name="website" placeholder="https://your-store.com" value={fields.website} onChange={(e) => update('website', e.target.value)} />
            </div>
            <div className="merchant-field">
              <label>Instagram</label>
              <input type="text" name="instagram" placeholder="@yourstore" value={fields.instagram} onChange={(e) => update('instagram', e.target.value)} />
            </div>
            <div className="merchant-field">
              <label>Business registration no. (統一編號)</label>
              <input type="text" name="business_reg_no" placeholder="8-digit tax ID" inputMode="numeric" value={fields.business_reg_no} onChange={(e) => update('business_reg_no', e.target.value)} />
            </div>

            <div className="merchant-onboarding__actions">
              <button type="button" className="btn btn--secondary btn--large" onClick={() => setStep(2)}>← Back</button>
              <button type="button" className="btn btn--primary btn--large" onClick={() => setStep(4)}>Review →</button>
            </div>
          </div>

          {/* ── Step 4: Review & submit ── */}
          <div hidden={step !== 4}>
            <h2 className="merchant-onboarding__title">Review your details</h2>
            <p className="merchant-onboarding__sub">Everything look right? You can update all of this later in your dashboard.</p>

            <div className="merchant-review">
              {[
                ['Store name', fields.store_name],
                ['Category', fields.category],
                ['Description', fields.description || '—'],
                ['Address', fields.address],
                ['City', fields.city],
                ['Contact person', fields.contact_name || '—'],
                ['Phone', fields.phone || '—'],
                ['LINE ID', fields.line_id || '—'],
                ['Website', fields.website || '—'],
                ['Instagram', fields.instagram || '—'],
                ['Business reg. no.', fields.business_reg_no || '—'],
              ].map(([label, value]) => (
                <div key={label} className="merchant-review__row">
                  <span className="merchant-review__label">{label}</span>
                  <span className="merchant-review__value">{value}</span>
                </div>
              ))}
            </div>

            {state.status === 'error' && <div className="merchant-error">{state.message}</div>}

            <div className="merchant-onboarding__actions">
              <button type="button" className="btn btn--secondary btn--large" onClick={() => setStep(3)}>← Back</button>
              <button type="submit" className="btn btn--primary btn--large" disabled={pending}>
                {pending ? 'Saving…' : 'Complete setup'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  )
}
