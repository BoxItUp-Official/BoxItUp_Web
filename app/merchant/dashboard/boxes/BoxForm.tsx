'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import type { DashboardState } from '../actions'

interface Box {
  id: string
  name: string
  description: string | null
  price: number
  original_value: number | null
  quantity: number
  pickup_start: string
  pickup_end: string
}

interface Props {
  action: (prev: DashboardState, formData: FormData) => Promise<DashboardState>
  box?: Box
}

const initial: DashboardState = { status: 'idle', message: '' }

export default function BoxForm({ action, box }: Props) {
  const [state, formAction, pending] = useActionState(action, initial)
  const isEdit = Boolean(box)

  return (
    <form action={formAction} className="merchant-form-card">
      {box && <input type="hidden" name="id" value={box.id} />}

      {state.status === 'error' && (
        <div className="merchant-error">{state.message}</div>
      )}

      <div className="merchant-field">
        <label htmlFor="name">Box name *</label>
        <input
          id="name"
          name="name"
          type="text"
          defaultValue={box?.name ?? ''}
          placeholder="e.g. Bakery Surprise Box"
          required
        />
        <span className="merchant-field__hint">This is what customers see in the app.</span>
      </div>

      <div className="merchant-field">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          defaultValue={box?.description ?? ''}
          placeholder="What might be inside? Any allergen notes?"
        />
      </div>

      <div className="merchant-field-row">
        <div className="merchant-field">
          <label htmlFor="price">Price (NTD) *</label>
          <input
            id="price"
            name="price"
            type="number"
            min="1"
            step="1"
            defaultValue={box?.price ?? ''}
            placeholder="e.g. 150"
            required
          />
        </div>
        <div className="merchant-field">
          <label htmlFor="original_value">Original value (NTD)</label>
          <input
            id="original_value"
            name="original_value"
            type="number"
            min="1"
            step="1"
            defaultValue={box?.original_value ?? ''}
            placeholder="e.g. 400"
          />
          <span className="merchant-field__hint">Shows savings to customers.</span>
        </div>
      </div>

      <div className="merchant-field">
        <label htmlFor="quantity">Daily quantity *</label>
        <input
          id="quantity"
          name="quantity"
          type="number"
          min="1"
          step="1"
          defaultValue={box?.quantity ?? 5}
          placeholder="e.g. 5"
          required
        />
        <span className="merchant-field__hint">How many boxes available per day.</span>
      </div>

      <div className="merchant-field-row">
        <div className="merchant-field">
          <label htmlFor="pickup_start">Pickup from *</label>
          <input
            id="pickup_start"
            name="pickup_start"
            type="time"
            defaultValue={box?.pickup_start ?? '17:00'}
            required
          />
        </div>
        <div className="merchant-field">
          <label htmlFor="pickup_end">Pickup until *</label>
          <input
            id="pickup_end"
            name="pickup_end"
            type="time"
            defaultValue={box?.pickup_end ?? '19:00'}
            required
          />
        </div>
      </div>

      <div className="merchant-onboarding__actions" style={{ marginTop: '1rem' }}>
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
