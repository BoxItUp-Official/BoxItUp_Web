'use client'

import Link from 'next/link'
import { useActionState } from 'react'
import { changeTodayQuantity, publishToday, setTodayActive, type DashboardState } from './actions'
import { formatMoney } from '@/lib/currency'

const IDLE: DashboardState = { status: 'idle', message: '' }

export type TodayRow = {
  key: string
  name: string
  price: number
  pickup: string // "18:00–20:00"
  // A template that can still be published today.
  template?: { id: string; defaultQuantity: number; windowPassed: boolean }
  // Today's listing, once published.
  bag?: { id: string; total: number; remaining: number; active: boolean; ended: boolean }
}

function Message({ state }: { state: DashboardState }) {
  if (state.status === 'idle') return null
  return <div className={`today-row__msg today-row__msg--${state.status}`}>{state.message}</div>
}

function LiveControls({ bag }: { bag: NonNullable<TodayRow['bag']> }) {
  const [state, action, pending] = useActionState(changeTodayQuantity, IDLE)
  const reserved = bag.total - bag.remaining
  return (
    <>
      <div className="today-row__stock">
        <strong>{bag.remaining}</strong> of {bag.total} left
        {reserved > 0 && <span className="today-row__reserved"> · {reserved} reserved</span>}
      </div>
      {!bag.ended && (
        <div className="today-row__actions">
          <form action={action} className="today-row__qty">
            <input type="hidden" name="bag_id" value={bag.id} />
            <input
              type="number"
              name="quantity"
              min={Math.max(reserved, 1)}
              defaultValue={bag.total}
              aria-label="Total quantity today"
            />
            <button type="submit" className="merchant-table-action merchant-table-action--neutral" disabled={pending}>
              {pending ? 'Saving…' : 'Set total'}
            </button>
          </form>
          <form action={setTodayActive}>
            <input type="hidden" name="bag_id" value={bag.id} />
            <input type="hidden" name="active" value={String(!bag.active)} />
            <button type="submit" className="merchant-table-action merchant-table-action--neutral">
              {bag.active ? 'Pause' : 'Resume'}
            </button>
          </form>
        </div>
      )}
      <Message state={state} />
    </>
  )
}

function PublishControls({ template }: { template: NonNullable<TodayRow['template']> }) {
  const [state, action, pending] = useActionState(publishToday, IDLE)
  if (template.windowPassed) {
    return <div className="today-row__note">Today’s pickup window has passed.</div>
  }
  return (
    <>
      <form action={action} className="today-row__qty">
        <input type="hidden" name="box_id" value={template.id} />
        <input type="number" name="quantity" min={1} defaultValue={template.defaultQuantity} aria-label="How many today" />
        <button type="submit" className="btn btn--primary btn--sm" disabled={pending}>
          {pending ? 'Publishing…' : 'Publish today'}
        </button>
      </form>
      <Message state={state} />
    </>
  )
}

// What is on sale in the app today, and the one-click way to put a template live.
export default function TodayPanel({ rows, currency }: { rows: TodayRow[]; currency: string }) {
  return (
    <section className="today-panel">
      <div className="overview-recent-head">
        <div className="merchant-section-title" style={{ margin: 0 }}>Today in the app</div>
        <Link href="/merchant/dashboard/boxes" className="overview-recent__viewall">Manage boxes →</Link>
      </div>

      {rows.length === 0 ? (
        <div className="merchant-empty">
          <div className="merchant-empty__title">No boxes yet</div>
          <div className="merchant-empty__body">Create a box template, then publish it here each day.</div>
          <Link href="/merchant/dashboard/boxes/new" className="btn btn--primary">Create a box</Link>
        </div>
      ) : (
        <div className="today-list">
          {rows.map(row => {
            const live = row.bag && row.bag.active && !row.bag.ended
            const badge = row.bag
              ? row.bag.ended
                ? { cls: 'merchant-badge--inactive', label: 'Ended' }
                : row.bag.active
                  ? { cls: 'merchant-badge--active', label: 'Live' }
                  : { cls: 'merchant-badge--inactive', label: 'Paused' }
              : { cls: 'merchant-badge--pending', label: 'Not published' }
            return (
              <div key={row.key} className={`today-row${live ? ' today-row--live' : ''}`}>
                <div className="today-row__info">
                  <div className="today-row__name">
                    {row.name}
                    <span className={`merchant-badge ${badge.cls}`}>{badge.label}</span>
                  </div>
                  <div className="today-row__meta">
                    {formatMoney(row.price, currency)} · Pickup {row.pickup}
                  </div>
                </div>
                <div className="today-row__side">
                  {row.bag ? <LiveControls bag={row.bag} /> : row.template ? <PublishControls template={row.template} /> : null}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}
