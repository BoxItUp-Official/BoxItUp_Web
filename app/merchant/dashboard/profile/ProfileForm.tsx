'use client'

import { useActionState } from 'react'
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
  }
}

const initial: DashboardState = { status: 'idle', message: '' }

export default function ProfileForm({ merchant }: Props) {
  const [state, action, pending] = useActionState(updateMerchantProfile, initial)

  return (
    <form action={action} className="merchant-form-card">
      {state.status === 'success' && (
        <div className="merchant-success">{state.message}</div>
      )}
      {state.status === 'error' && (
        <div className="merchant-error">{state.message}</div>
      )}

      <div className="merchant-field">
        <label htmlFor="store_name">Store name *</label>
        <input
          id="store_name"
          name="store_name"
          type="text"
          defaultValue={merchant.store_name}
          required
        />
      </div>

      <div className="merchant-field">
        <label htmlFor="category">Category *</label>
        <select id="category" name="category" defaultValue={merchant.category ?? ''} required>
          <option value="">Select a category</option>
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>

      <div className="merchant-field">
        <label htmlFor="address">Street address *</label>
        <input
          id="address"
          name="address"
          type="text"
          defaultValue={merchant.address ?? ''}
          required
        />
      </div>

      <div className="merchant-field">
        <label htmlFor="city">City / District *</label>
        <select id="city" name="city" defaultValue={merchant.city ?? ''} required>
          <option value="">Select a city</option>
          {CITIES.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>

      <div className="merchant-field">
        <label htmlFor="phone">Phone number</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          defaultValue={merchant.phone ?? ''}
          placeholder="+886 2 1234 5678"
        />
      </div>

      <div className="merchant-field">
        <label htmlFor="line_id">LINE ID</label>
        <input
          id="line_id"
          name="line_id"
          type="text"
          defaultValue={merchant.line_id ?? ''}
          placeholder="Your store LINE ID"
        />
        <span className="merchant-field__hint">Customers will contact you here after purchase.</span>
      </div>

      <div className="merchant-field">
        <label htmlFor="description">Store description</label>
        <textarea
          id="description"
          name="description"
          defaultValue={merchant.description ?? ''}
          placeholder="Tell customers what makes your store special..."
        />
      </div>

      <div className="merchant-onboarding__actions" style={{ marginTop: '1rem' }}>
        <button type="submit" className="btn btn--primary btn--large" disabled={pending}>
          {pending ? 'Saving…' : 'Save changes'}
        </button>
      </div>
    </form>
  )
}
