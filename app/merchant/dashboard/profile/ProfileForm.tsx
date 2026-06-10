'use client'

import { useActionState, useState } from 'react'
import { updateMerchantProfile, type DashboardState } from '../actions'

const CATEGORIES = [
  'Bakery', 'Café', 'Restaurant', 'Convenience Store',
  'Supermarket', 'Deli / Butcher', 'Fresh Market / Produce', 'Other',
]
const CITIES = [
  'Taipei', 'New Taipei', 'Taoyuan', 'Taichung',
  'Tainan', 'Kaohsiung', 'Hsinchu', 'Keelung', 'Other',
]

interface Props {
  merchant: {
    store_name: string
    category: string | null
    address: string | null
    city: string | null
    phone: string | null
    line_id: string | null
    description: string | null
    photo_url?: string | null
  }
}

const initial: DashboardState = { status: 'idle', message: '' }

export default function ProfileForm({ merchant }: Props) {
  const [state, action, pending] = useActionState(updateMerchantProfile, initial)
  const [photoUrl, setPhotoUrl] = useState(merchant.photo_url ?? '')

  return (
    <form action={action}>
      {state.status === 'success' && (
        <div className="merchant-success" style={{ maxWidth: 620, marginBottom: '1.25rem' }}>
          {state.message}
        </div>
      )}
      {state.status === 'error' && (
        <div className="merchant-error" style={{ maxWidth: 620, marginBottom: '1.25rem' }}>
          {state.message}
        </div>
      )}

      {/* ── Section: Identity ── */}
      <div className="merchant-form-section">
        <div className="merchant-form-section__header">
          <div className="merchant-form-section__title">Store identity</div>
          <div className="merchant-form-section__sub">How your store appears to customers</div>
        </div>
        <div className="merchant-form-card">
          <div className="merchant-field">
            <label htmlFor="photo_url">Store photo URL</label>
            <input
              id="photo_url"
              name="photo_url"
              type="url"
              value={photoUrl}
              onChange={e => setPhotoUrl(e.target.value)}
              placeholder="https://your-cdn.com/store-photo.jpg"
            />
            <span className="merchant-field__hint">A banner photo of your store or products shown on your listing.</span>
            {photoUrl && (
              <div className="merchant-photo-preview merchant-photo-preview--wide">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photoUrl} alt="Store preview" onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
              </div>
            )}
          </div>

          <div className="merchant-field">
            <label htmlFor="store_name">Store name *</label>
            <input id="store_name" name="store_name" type="text" defaultValue={merchant.store_name} required />
          </div>

          <div className="merchant-field">
            <label htmlFor="category">Category *</label>
            <select id="category" name="category" defaultValue={merchant.category ?? ''} required>
              <option value="">Select a category</option>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>

          <div className="merchant-field">
            <label htmlFor="description">Store description</label>
            <textarea
              id="description"
              name="description"
              defaultValue={merchant.description ?? ''}
              placeholder="Tell customers what makes your store special, what kinds of items you typically have..."
            />
          </div>
        </div>
      </div>

      {/* ── Section: Location ── */}
      <div className="merchant-form-section">
        <div className="merchant-form-section__header">
          <div className="merchant-form-section__title">Location</div>
          <div className="merchant-form-section__sub">Where customers come to pick up their boxes</div>
        </div>
        <div className="merchant-form-card">
          <div className="merchant-field">
            <label htmlFor="address">Street address *</label>
            <input id="address" name="address" type="text" defaultValue={merchant.address ?? ''} required placeholder="e.g. No. 10, Zhongshan N. Rd., Sec. 2" />
          </div>
          <div className="merchant-field">
            <label htmlFor="city">City / District *</label>
            <select id="city" name="city" defaultValue={merchant.city ?? ''} required>
              <option value="">Select a city</option>
              {CITIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* ── Section: Contact ── */}
      <div className="merchant-form-section">
        <div className="merchant-form-section__header">
          <div className="merchant-form-section__title">Contact</div>
          <div className="merchant-form-section__sub">How customers and our team reach you</div>
        </div>
        <div className="merchant-form-card">
          <div className="merchant-field">
            <label htmlFor="phone">Phone number</label>
            <input id="phone" name="phone" type="tel" defaultValue={merchant.phone ?? ''} placeholder="+886 2 1234 5678" />
          </div>
          <div className="merchant-field">
            <label htmlFor="line_id">LINE ID</label>
            <input id="line_id" name="line_id" type="text" defaultValue={merchant.line_id ?? ''} placeholder="Your store LINE ID" />
            <span className="merchant-field__hint">Customers will contact you here after purchase.</span>
          </div>
        </div>
      </div>

      <div style={{ paddingTop: '0.5rem' }}>
        <button type="submit" className="btn btn--primary btn--large" disabled={pending}>
          {pending ? 'Saving…' : 'Save changes'}
        </button>
      </div>
    </form>
  )
}
