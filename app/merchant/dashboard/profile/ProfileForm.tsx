'use client'

import { useActionState } from 'react'
import { updateMerchantProfile, type DashboardState } from '../actions'
import AvatarPicker from './AvatarPicker'
import BusinessHours from './BusinessHours'

const CATEGORIES = [
  'Bakery', 'Café', 'Restaurant', 'Convenience Store',
  'Supermarket', 'Deli / Butcher', 'Fresh Market / Produce', 'Other',
]
const CITIES = [
  'Taipei', 'New Taipei', 'Taoyuan', 'Taichung',
  'Tainan', 'Kaohsiung', 'Hsinchu', 'Keelung', 'Other',
]

interface Props {
  userId: string | null
  merchant: {
    store_name: string
    category: string | null
    address: string | null
    city: string | null
    phone: string | null
    line_id: string | null
    description: string | null
    photo_url?: string | null
    avatar_icon?: string | null
    contact_name?: string | null
    website?: string | null
    instagram?: string | null
    business_reg_no?: string | null
    business_hours?: Record<string, { open: boolean; start: string; end: string }> | null
  }
}

const initial: DashboardState = { status: 'idle', message: '' }

export default function ProfileForm({ merchant, userId }: Props) {
  const [state, action, pending] = useActionState(updateMerchantProfile, initial)

  return (
    <form action={action}>
      {state.status === 'success' && (
        <div className="merchant-success" style={{ marginBottom: '1.25rem' }}>{state.message}</div>
      )}
      {state.status === 'error' && (
        <div className="merchant-error" style={{ marginBottom: '1.25rem' }}>{state.message}</div>
      )}

      {/* ── Section: Identity ── */}
      <div className="merchant-form-section">
        <div className="merchant-form-section__header">
          <div className="merchant-form-section__title">Store identity</div>
          <div className="merchant-form-section__sub">How your store appears to customers</div>
        </div>
        <div className="merchant-form-card">
          <div className="merchant-field">
            <label>Store avatar</label>
            <AvatarPicker
              category={merchant.category}
              storeName={merchant.store_name}
              userId={userId}
              initialPhotoUrl={merchant.photo_url}
              initialAvatarIcon={merchant.avatar_icon}
            />
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

      {/* ── Section: Business hours ── */}
      <div className="merchant-form-section">
        <div className="merchant-form-section__header">
          <div className="merchant-form-section__title">Business hours</div>
          <div className="merchant-form-section__sub">When your store is open to customers</div>
        </div>
        <div className="merchant-form-card">
          <BusinessHours value={merchant.business_hours} />
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
            <label htmlFor="contact_name">Contact person</label>
            <input id="contact_name" name="contact_name" type="text" defaultValue={merchant.contact_name ?? ''} placeholder="e.g. Owner or manager name" />
          </div>
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

      {/* ── Section: Online presence ── */}
      <div className="merchant-form-section">
        <div className="merchant-form-section__header">
          <div className="merchant-form-section__title">Online presence</div>
          <div className="merchant-form-section__sub">Help customers find and trust your store</div>
        </div>
        <div className="merchant-form-card">
          <div className="merchant-field">
            <label htmlFor="website">Website</label>
            <input id="website" name="website" type="url" defaultValue={merchant.website ?? ''} placeholder="https://your-store.com" />
          </div>
          <div className="merchant-field">
            <label htmlFor="instagram">Instagram</label>
            <input id="instagram" name="instagram" type="text" defaultValue={merchant.instagram ?? ''} placeholder="@yourstore" />
          </div>
        </div>
      </div>

      {/* ── Section: Business details ── */}
      <div className="merchant-form-section">
        <div className="merchant-form-section__header">
          <div className="merchant-form-section__title">Business details</div>
          <div className="merchant-form-section__sub">Used for invoicing and verification</div>
        </div>
        <div className="merchant-form-card">
          <div className="merchant-field">
            <label htmlFor="business_reg_no">Business registration no. (統一編號)</label>
            <input id="business_reg_no" name="business_reg_no" type="text" defaultValue={merchant.business_reg_no ?? ''} placeholder="8-digit tax ID" inputMode="numeric" />
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
