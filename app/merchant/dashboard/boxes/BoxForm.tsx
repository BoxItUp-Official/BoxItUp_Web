'use client'

import { useActionState, useState } from 'react'
import Link from 'next/link'
import type { DashboardState } from '../actions'
import PhotoUpload from '../PhotoUpload'

// Sunday first, per request
const ALL_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const ALL_TAGS = [
  'Bakery', 'Café', 'Meal', 'Dessert', 'Drinks', 'Snacks', 'Fruit & Veg', 'Deli',
  'Vegetarian', 'Vegan', 'Halal', 'Organic', 'Local', 'Premium', 'Surprise',
]
const ALL_ALLERGENS = ['Gluten', 'Dairy', 'Eggs', 'Peanuts', 'Tree nuts', 'Soy', 'Shellfish', 'Fish', 'Sesame']

interface Box {
  id: string
  name: string
  description: string | null
  price: number
  original_value: number | null
  quantity: number
  pickup_start: string
  pickup_end: string
  photo_url: string | null
  available_days: string[]
  tags: string[]
  allergens?: string[] | null
}

interface Props {
  action: (prev: DashboardState, formData: FormData) => Promise<DashboardState>
  box?: Box
  userId: string | null
}

const initial: DashboardState = { status: 'idle', message: '' }

export default function BoxForm({ action, box, userId }: Props) {
  const [state, formAction, pending] = useActionState(action, initial)
  const isEdit = Boolean(box)

  const [selectedDays, setSelectedDays] = useState<string[]>(box?.available_days ?? ALL_DAYS)
  const [selectedTags, setSelectedTags] = useState<string[]>(box?.tags ?? [])
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>(box?.allergens ?? [])
  const [price, setPrice] = useState<string>(box?.price ? String(box.price) : '')
  const [original, setOriginal] = useState<string>(box?.original_value ? String(box.original_value) : '')

  const toggle = (list: string[], set: (v: string[]) => void, v: string) =>
    set(list.includes(v) ? list.filter(x => x !== v) : [...list, v])

  // Live savings preview
  const priceN = parseFloat(price)
  const originalN = parseFloat(original)
  const showSavings = !isNaN(priceN) && !isNaN(originalN) && originalN > priceN && priceN > 0
  const savingsPct = showSavings ? Math.round((1 - priceN / originalN) * 100) : 0
  const savedAmt = showSavings ? Math.round(originalN - priceN) : 0

  return (
    <form action={formAction} className="merchant-form-page">
      {box && <input type="hidden" name="id" value={box.id} />}
      {selectedDays.map(d => <input key={d} type="hidden" name="available_days" value={d} />)}
      {selectedTags.map(t => <input key={t} type="hidden" name="tags" value={t} />)}
      {selectedAllergens.map(a => <input key={a} type="hidden" name="allergens" value={a} />)}

      {state.status === 'error' && (
        <div className="merchant-error" style={{ marginBottom: '1.25rem' }}>{state.message}</div>
      )}

      {/* ── Box identity ── */}
      <div className="merchant-form-section">
        <div className="merchant-form-section__header">
          <div className="merchant-form-section__title">Box details</div>
          <div className="merchant-form-section__sub">What customers will see in the app</div>
        </div>
        <div className="merchant-form-card">
          <div className="merchant-field">
            <label>Box photo</label>
            <PhotoUpload name="photo_url" userId={userId} initialUrl={box?.photo_url} hint="A clear, appetising photo helps your box sell." />
          </div>

          <div className="merchant-field">
            <label htmlFor="name">Box name *</label>
            <input id="name" name="name" type="text" defaultValue={box?.name ?? ''} placeholder="e.g. Bakery Surprise Box" required />
          </div>

          <div className="merchant-field">
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" defaultValue={box?.description ?? ''} placeholder="What might be inside? What makes it a great deal?" />
          </div>

          <div className="merchant-field">
            <label>Tags</label>
            <div className="merchant-chip-group">
              {ALL_TAGS.map(tag => (
                <button key={tag} type="button"
                  className={`merchant-chip${selectedTags.includes(tag) ? ' merchant-chip--active' : ''}`}
                  onClick={() => toggle(selectedTags, setSelectedTags, tag)}>
                  {tag}
                </button>
              ))}
            </div>
            <span className="merchant-field__hint">Help customers find your box. Select all that apply.</span>
          </div>
        </div>
      </div>

      {/* ── Allergens (independent) ── */}
      <div className="merchant-form-section">
        <div className="merchant-form-section__header">
          <div className="merchant-form-section__title">Allergens</div>
          <div className="merchant-form-section__sub">Let customers know what the box may contain</div>
        </div>
        <div className="merchant-form-card">
          <div className="merchant-field">
            <label>Contains</label>
            <div className="merchant-chip-group">
              {ALL_ALLERGENS.map(a => (
                <button key={a} type="button"
                  className={`merchant-chip merchant-chip--allergen${selectedAllergens.includes(a) ? ' merchant-chip--active' : ''}`}
                  onClick={() => toggle(selectedAllergens, setSelectedAllergens, a)}>
                  {a}
                </button>
              ))}
            </div>
            <span className="merchant-field__hint">Select any allergens that may be present. Leave empty if none apply.</span>
          </div>
        </div>
      </div>

      {/* ── Pricing ── */}
      <div className="merchant-form-section">
        <div className="merchant-form-section__header">
          <div className="merchant-form-section__title">Pricing</div>
          <div className="merchant-form-section__sub">Show customers how much they save</div>
        </div>
        <div className="merchant-form-card">
          <div className="merchant-field-row merchant-field-row--top">
            <div className="merchant-field">
              <label htmlFor="price">Box price (NTD) *</label>
              <div className="merchant-input-prefix">
                <span>NT$</span>
                <input id="price" name="price" type="number" min="1" step="1" value={price} onChange={e => setPrice(e.target.value)} placeholder="150" required />
              </div>
            </div>
            <div className="merchant-field">
              <label htmlFor="original_value">Original value (NTD)</label>
              <div className="merchant-input-prefix">
                <span>NT$</span>
                <input id="original_value" name="original_value" type="number" min="1" step="1" value={original} onChange={e => setOriginal(e.target.value)} placeholder="400" />
              </div>
            </div>
          </div>

          {/* Savings preview */}
          <div className={`box-savings${showSavings ? ' box-savings--on' : ''}`}>
            {showSavings ? (
              <>
                <span className="box-savings__badge">−{savingsPct}%</span>
                <span className="box-savings__text">Customers save <strong>NT${savedAmt}</strong> per box — a great deal that sells fast.</span>
              </>
            ) : (
              <span className="box-savings__text box-savings__text--muted">Enter a box price below the original value to show customers their savings.</span>
            )}
          </div>
        </div>
      </div>

      {/* ── Availability ── */}
      <div className="merchant-form-section">
        <div className="merchant-form-section__header">
          <div className="merchant-form-section__title">Availability</div>
          <div className="merchant-form-section__sub">When and how many boxes are available</div>
        </div>
        <div className="merchant-form-card">
          <div className="merchant-field">
            <label>Available days *</label>
            <div className="merchant-day-selector">
              {ALL_DAYS.map(day => (
                <button key={day} type="button"
                  className={`merchant-day-btn${selectedDays.includes(day) ? ' merchant-day-btn--active' : ''}`}
                  onClick={() => toggle(selectedDays, setSelectedDays, day)}>
                  {day}
                </button>
              ))}
            </div>
            <span className="merchant-field__hint">Select the days this box is available.</span>
          </div>

          <div className="merchant-field-row">
            <div className="merchant-field">
              <label htmlFor="pickup_start">Pickup from *</label>
              <input id="pickup_start" name="pickup_start" type="time" defaultValue={box?.pickup_start ?? '17:00'} required />
            </div>
            <div className="merchant-field">
              <label htmlFor="pickup_end">Pickup until *</label>
              <input id="pickup_end" name="pickup_end" type="time" defaultValue={box?.pickup_end ?? '19:00'} required />
            </div>
          </div>

          <div className="merchant-field">
            <label htmlFor="quantity">Boxes per day *</label>
            <input id="quantity" name="quantity" type="number" min="1" step="1" defaultValue={box?.quantity ?? 5} placeholder="5" required />
            <span className="merchant-field__hint">How many boxes available per pickup day.</span>
          </div>
        </div>
      </div>

      <div className="box-form__actions">
        <Link href="/merchant/dashboard/boxes" className="btn btn--secondary btn--large">Cancel</Link>
        <button type="submit" className="btn btn--primary btn--large" disabled={pending}>
          {pending ? 'Saving…' : isEdit ? 'Save changes' : 'Create box'}
        </button>
      </div>
    </form>
  )
}
