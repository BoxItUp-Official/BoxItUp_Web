'use client'

import { useState } from 'react'
import { markOrderPickedUp, cancelOrder } from '../actions'

type Order = {
  id: string
  box_name: string | null
  customer_name: string | null
  customer_phone: string | null
  pickup_code: string
  scheduled_pickup_start: string | null
  scheduled_pickup_end: string | null
  price: number
  status: 'pending' | 'picked_up' | 'cancelled'
  created_at: string
  picked_up_at: string | null
}

type Filter = 'all' | 'pending' | 'picked_up' | 'cancelled'

const STATUS_LABEL: Record<string, string> = {
  pending: 'Pending',
  picked_up: 'Picked up',
  cancelled: 'Cancelled',
}

const STATUS_BADGE: Record<string, string> = {
  pending: 'merchant-badge--pending',
  picked_up: 'merchant-badge--active',
  cancelled: 'merchant-badge--inactive',
}

function formatTime(t: string | null) {
  if (!t) return '—'
  return t.slice(0, 5)
}

function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

export default function OrdersClient({ orders }: { orders: Order[] }) {
  const [filter, setFilter] = useState<Filter>('all')

  const counts = {
    all: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    picked_up: orders.filter(o => o.status === 'picked_up').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
  }

  const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter)

  // Summary stats
  const todayStr = new Date().toDateString()
  const todayOrders = orders.filter(o => new Date(o.created_at).toDateString() === todayStr)
  const todayRevenue = todayOrders
    .filter(o => o.status !== 'cancelled')
    .reduce((sum, o) => sum + o.price, 0)

  return (
    <>
      {/* ── Summary bar ── */}
      <div className="orders-summary">
        <div className="orders-summary__stat">
          <span className="orders-summary__num">{todayOrders.length}</span>
          <span className="orders-summary__label">orders today</span>
        </div>
        <div className="orders-summary__divider" />
        <div className="orders-summary__stat">
          <span className="orders-summary__num">{counts.pending}</span>
          <span className="orders-summary__label">pending pickup</span>
        </div>
        <div className="orders-summary__divider" />
        <div className="orders-summary__stat">
          <span className="orders-summary__num">NT${todayRevenue.toFixed(0)}</span>
          <span className="orders-summary__label">today&apos;s revenue</span>
        </div>
      </div>

      {/* ── Filter tabs ── */}
      <div className="orders-tabs">
        {(['all', 'pending', 'picked_up', 'cancelled'] as Filter[]).map(f => (
          <button
            key={f}
            type="button"
            className={`orders-tab${filter === f ? ' orders-tab--active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f === 'all' ? 'All' : STATUS_LABEL[f]}
            <span className="orders-tab__count">{counts[f]}</span>
          </button>
        ))}
      </div>

      {/* ── Orders list ── */}
      {filtered.length === 0 ? (
        <div className="merchant-empty">
          <div className="merchant-empty__icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
          </div>
          <div className="merchant-empty__title">
            {filter === 'all' ? 'No orders yet' : `No ${STATUS_LABEL[filter].toLowerCase()} orders`}
          </div>
          <div className="merchant-empty__body">
            {filter === 'all'
              ? 'Orders will appear here when customers reserve your boxes through the app.'
              : 'Try switching to a different filter above.'}
          </div>
        </div>
      ) : (
        <div className="orders-list">
          {filtered.map(order => (
            <div key={order.id} className={`order-card order-card--${order.status}`}>
              {/* Header row */}
              <div className="order-card__header">
                <div className="order-card__code-wrap">
                  <span className="order-card__code-label">Pickup code</span>
                  <span className="order-card__code">{order.pickup_code}</span>
                </div>
                <span className={`merchant-badge ${STATUS_BADGE[order.status]}`}>
                  {STATUS_LABEL[order.status]}
                </span>
              </div>

              {/* Body */}
              <div className="order-card__body">
                <div className="order-card__info">
                  <div className="order-card__box-name">
                    {order.box_name ?? 'Box (deleted)'}
                  </div>
                  <div className="order-card__meta-row">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                    </svg>
                    Pickup {formatTime(order.scheduled_pickup_start)}–{formatTime(order.scheduled_pickup_end)}
                  </div>
                  {order.customer_name && (
                    <div className="order-card__meta-row">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
                      </svg>
                      {order.customer_name}
                      {order.customer_phone && ` · ${order.customer_phone}`}
                    </div>
                  )}
                  <div className="order-card__meta-row order-card__meta-row--muted">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    {formatDate(order.created_at)}
                  </div>
                </div>

                <div className="order-card__right">
                  <div className="order-card__price">NT${order.price.toFixed(0)}</div>

                  {order.status === 'pending' && (
                    <div className="order-card__actions">
                      <form action={markOrderPickedUp}>
                        <input type="hidden" name="id" value={order.id} />
                        <button type="submit" className="btn btn--primary btn--sm">
                          Mark picked up
                        </button>
                      </form>
                      <form action={cancelOrder}>
                        <input type="hidden" name="id" value={order.id} />
                        <button
                          type="submit"
                          className="merchant-table-action merchant-table-action--danger"
                          onClick={e => { if (!confirm('Cancel this order?')) e.preventDefault() }}
                        >
                          Cancel
                        </button>
                      </form>
                    </div>
                  )}

                  {order.status === 'picked_up' && order.picked_up_at && (
                    <div className="order-card__picked-time">
                      Picked up at {new Date(order.picked_up_at).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
