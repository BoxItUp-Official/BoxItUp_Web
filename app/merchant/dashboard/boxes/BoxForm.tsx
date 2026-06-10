'use client'

import { useActionState, useState } from 'react'
import Link from 'next/link'
import type { DashboardState } from '../actions'

const ALL_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const ALL_TAGS = ['Bakery', 'Café', 'Meal', 'Dessert', 'Vegetarian', 'Vegan', 'Halal', 'Gluten-free', 'Dairy-free', 'Surprise']

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
}

interface Props {
  action: (prev: DashboardState, formData: FormData) => Promise<DashboardState>
  box?: Box
}

const initial: DashboardState = { status: 'idle', message: '' }

export default function BoxForm({ action, box }: Props) {
  const [state, formAction, pending] = useActionState(action, initial)
  const isEdit = Boolean(box)

  const [photoUrl, setPhotoUrl] = useState(box?.photo_url ?? '')
  const [selectedDays, setSelectedDays] = useState<string[]>(
    box?.available_days ?? ALL_DAYS
  )
  const [selectedTags, setSelectedTags] = useState<string[]>(box?.tags ?? [])

  function toggleDay(day: string) {
    setSelectedDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    )
  }

  function toggleTag(tag: string) {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )
  }

  return (
    <form action={formAction}>
      {box && <input type="hidden" name="id" value={box.id} />}
      {selectedDays.map(d => <input key={d} type="hidden" name="available_days" value={d} />)}
      {selectedTags.map(t => <input key={t} type="hidden" name="tags" value={t} />)}

      {state.status === 'error' && (
        <div className="merchant-error" style={{ maxWidth: 620, marginBottom: '1.25rem' }}>{state.message}</div>
      )}

      {/* ── Section: Box identity ── */}
      <div className="merchant-form-section">
        <div className="merchant-form-section__header">
          <div className="merchant-form-section__title">Box details</div>
          <div className="merchant-form-section__sub">What customers will see in the app</div>
        </div>
        <div className="merchant-form-card">
          <div className="merchant-field">
            <label htmlFor="name">Box name *</label>
            <input id="name" name="name" type="text" defaultValue={box?.name ?? ''} placeholder="e.g. Bakery Surprise Box" required />
          </div>

          <div className="merchant-field">
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" defaultValue={box?.description ?? ''} placeholder="What might be inside? Any allergen notes?" />
          </div>

          <div className="merchant-field">
            <label htmlFor="photo_url">Box photo URL</label>
            <input
              id="photo_url"
              name="photo_url"
              type="url"
              value={photoUrl}
              onChange={e => setPhotoUrl(e.target.value)}
              placeholder="https://your-cdn.com/box-photo.jpg"
            />
            <span className="merchant-field__hint">Link to a photo of your box. Use a high-quality image for better customer appeal.</span>
            {photoUrl && (
              <div className="merchant-photo-preview">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photoUrl} alt="Box preview" onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
              </div>
            )}
          </div>

          <div className="merchant-field">
            <label>Tags</label>
            <div className="merchant-chip-group">
              {ALL_TAGS.map(tag => (
                <button
                  key={tag}
                  type="button"
                  className={`merchant-chip${selectedTags.includes(tag) ? ' merchant-chip--active' : ''}`}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
            <span className="merchant-field__hint">Help customers find your box. Select all that apply.</span>
          </div>
        </div>
      </div>

      {/* ── Section: Pricing ── */}
      <div className="merchant-form-section">
        <div className="merchant-form-section__header">
          <div className="merchant-form-section__title">Pricing</div>
          <div className="merchant-form-section__sub">Show customers how much they save</div>
        </div>
        <div className="merchant-form-card">
          <div className="merchant-field-row">
            <div className="merchant-field">
              <label htmlFor="price">Box price (NTD) *</label>
              <input id="price" name="price" type="number" min="1" step="1" defaultValue={box?.price ?? ''} placeholder="150" required />
            </div>
            <div className="merchant-field">
              <label htmlFor="original_value">Original value (NTD)</label>
              <input id="original_value" name="original_value" type="number" min="1" step="1" defaultValue={box?.original_value ?? ''} placeholder="400" />
              <span className="merchant-field__hint">Customers see the savings %.</span>
            </div>
          </div>
          {/* Savings preview */}
        </div>
      </div>

      {/* ── Section: Availability ── */}
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
                <button
                  key={day}
                  type="button"
                  className={`merchant-day-btn${selectedDays.includes(day) ? ' merchant-day-btn--active' : ''}`}
                  onClick={() => toggleDay(day)}
                >
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

      <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '0.5rem' }}>
        <Link href="/merchant/dashboard/boxes" className="btn btn--ghost btn--large">
          Cancel
        </Link>
        <button type="submit" className="btn btn--primary btn--large" disabled={pending}>
          {pending ? 'Saving…' : isEdit ? 'Save changes' : 'Create box'}
        </button>
      </div>
    </form>
  )
}
