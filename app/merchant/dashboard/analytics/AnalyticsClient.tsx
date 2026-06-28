'use client'

import { useState } from 'react'
import { formatMoney, currencySymbol } from '@/lib/currency'

type Order = {
  id: string
  box_name: string | null
  price: number
  status: 'pending' | 'picked_up' | 'cancelled'
  created_at: string
}

type Range = 7 | 14 | 30 | 90

function buildTimeSeries(orders: Order[], range: number) {
  return Array.from({ length: range }, (_, i) => {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    d.setDate(d.getDate() - (range - 1 - i))
    const dateStr = d.toDateString()
    const dayOrders = orders.filter(o => new Date(o.created_at).toDateString() === dateStr)
    const revenue = dayOrders
      .filter(o => o.status !== 'cancelled')
      .reduce((s, o) => s + o.price, 0)
    const count = dayOrders.length

    const labelEvery = range <= 14 ? 1 : 7
    let label: string
    if (i === range - 1) {
      label = 'Today'
    } else if (range <= 14) {
      label = d.toLocaleDateString('en-US', { weekday: 'short' })
    } else {
      label = (i % labelEvery === 0) ? d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''
    }

    return { label, revenue, count, isToday: i === range - 1 }
  })
}

export default function AnalyticsClient({ orders, currency = 'TWD' }: { orders: Order[]; currency?: string }) {
  const [range, setRange] = useState<Range>(7)

  const cutoff = new Date()
  cutoff.setHours(0, 0, 0, 0)
  cutoff.setDate(cutoff.getDate() - range)
  const rangeOrders = orders.filter(o => new Date(o.created_at) >= cutoff)

  // KPIs
  const nonCancelled = rangeOrders.filter(o => o.status !== 'cancelled')
  const totalRevenue = nonCancelled.reduce((s, o) => s + o.price, 0)
  const resolved = rangeOrders.filter(o => o.status !== 'pending')
  const completionRate =
    resolved.length > 0
      ? Math.round((resolved.filter(o => o.status === 'picked_up').length / resolved.length) * 100)
      : null
  const avgOrderValue =
    nonCancelled.length > 0 ? Math.round(totalRevenue / nonCancelled.length) : 0

  // Time series for bar chart
  const timeSeries = buildTimeSeries(orders, range)
  const maxRevenue = Math.max(...timeSeries.map(d => d.revenue), 1)

  // Status breakdown
  const statusCounts = {
    picked_up: rangeOrders.filter(o => o.status === 'picked_up').length,
    pending: rangeOrders.filter(o => o.status === 'pending').length,
    cancelled: rangeOrders.filter(o => o.status === 'cancelled').length,
  }
  const statusTotal = rangeOrders.length || 1

  // Top boxes by revenue
  const boxMap = new Map<string, { revenue: number; orders: number }>()
  nonCancelled.forEach(o => {
    const name = o.box_name ?? 'Unknown Box'
    const existing = boxMap.get(name) ?? { revenue: 0, orders: 0 }
    boxMap.set(name, { revenue: existing.revenue + o.price, orders: existing.orders + 1 })
  })
  const topBoxes = [...boxMap.entries()]
    .map(([name, stats]) => ({ name, ...stats }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5)
  const maxBoxRevenue = Math.max(...topBoxes.map(b => b.revenue), 1)

  const STATUS_CONFIG = [
    { key: 'picked_up' as const, label: 'Picked up', color: 'var(--clr-accent)' },
    { key: 'pending' as const, label: 'Pending', color: '#f59e0b' },
    { key: 'cancelled' as const, label: 'Cancelled', color: '#94a3b8' },
  ]

  return (
    <>
      {/* ── Range selector ── */}
      <div className="analytics-range-bar">
        <span className="analytics-range-label">Period:</span>
        {([7, 14, 30, 90] as Range[]).map(r => (
          <button
            key={r}
            type="button"
            className={`analytics-range-btn${range === r ? ' analytics-range-btn--active' : ''}`}
            onClick={() => setRange(r)}
          >
            {r} days
          </button>
        ))}
      </div>

      {/* ── KPI row ── */}
      <div className="analytics-kpis">
        <div className="analytics-kpi analytics-kpi--accent">
          <div className="analytics-kpi__label">Revenue</div>
          <div className="analytics-kpi__value">{formatMoney(totalRevenue, currency)}</div>
          <div className="analytics-kpi__note">Confirmed orders</div>
        </div>
        <div className="analytics-kpi">
          <div className="analytics-kpi__label">Orders</div>
          <div className="analytics-kpi__value">{rangeOrders.length}</div>
          <div className="analytics-kpi__note">Total placed</div>
        </div>
        <div className="analytics-kpi">
          <div className="analytics-kpi__label">Completion rate</div>
          <div className="analytics-kpi__value">
            {completionRate !== null ? `${completionRate}%` : '—'}
          </div>
          <div className="analytics-kpi__note">Picked up / resolved</div>
        </div>
        <div className="analytics-kpi">
          <div className="analytics-kpi__label">Avg. order value</div>
          <div className="analytics-kpi__value">
            {avgOrderValue ? formatMoney(avgOrderValue, currency) : '—'}
          </div>
          <div className="analytics-kpi__note">Per confirmed order</div>
        </div>
      </div>

      {/* ── Daily revenue chart ── */}
      <div className="analytics-chart-card">
        <div className="analytics-chart-header">
          <h2 className="analytics-chart-title">Daily revenue</h2>
          <span className="analytics-chart-subtitle">Last {range} days · {currencySymbol(currency)}</span>
        </div>
        {rangeOrders.length === 0 ? (
          <p className="analytics-empty">No orders in this period yet.</p>
        ) : (
          <div className={`analytics-bars analytics-bars--${range >= 30 ? 'dense' : 'wide'}`}>
            {timeSeries.map((day, i) => (
              <div
                key={i}
                className={`analytics-bar-col${day.isToday ? ' analytics-bar-col--today' : ''}`}
                title={`${day.isToday ? 'Today' : day.label || ''}: ${formatMoney(day.revenue, currency)} · ${day.count} orders`}
              >
                <div className="analytics-bar-track">
                  <div
                    className="analytics-bar-fill"
                    style={{ height: `${Math.max((day.revenue / maxRevenue) * 100, day.revenue > 0 ? 4 : 0)}%` }}
                  />
                </div>
                {day.label && (
                  <span className="analytics-bar-label">{day.label}</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Bottom row: status + top boxes ── */}
      <div className="analytics-bottom-row">
        {/* Status breakdown */}
        <div className="analytics-chart-card">
          <div className="analytics-chart-header">
            <h2 className="analytics-chart-title">Order status</h2>
          </div>

          {/* Stacked bar */}
          <div className="analytics-stacked-bar">
            {STATUS_CONFIG.map(s => {
              const count = statusCounts[s.key]
              const pct = (count / statusTotal) * 100
              if (pct === 0) return null
              return (
                <div
                  key={s.key}
                  className="analytics-stacked-bar__seg"
                  style={{ width: `${pct}%`, background: s.color }}
                  title={`${s.label}: ${count}`}
                />
              )
            })}
          </div>

          {/* Rows */}
          <div className="analytics-status-list">
            {STATUS_CONFIG.map(s => {
              const count = statusCounts[s.key]
              const pct = Math.round((count / statusTotal) * 100)
              return (
                <div key={s.key} className="analytics-status-row">
                  <div className="analytics-status-row__top">
                    <div className="analytics-status-row__dot-label">
                      <span className="analytics-status-dot" style={{ background: s.color }} />
                      <span className="analytics-status-row__label">{s.label}</span>
                    </div>
                    <div className="analytics-status-row__right">
                      <span className="analytics-status-row__pct">{pct}%</span>
                      <span className="analytics-status-row__count">{count}</span>
                    </div>
                  </div>
                  <div className="analytics-status-row__track">
                    <div
                      className="analytics-status-row__fill"
                      style={{ width: `${pct}%`, background: s.color }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Top boxes */}
        <div className="analytics-chart-card">
          <div className="analytics-chart-header">
            <h2 className="analytics-chart-title">Top boxes</h2>
            <span className="analytics-chart-subtitle">by revenue</span>
          </div>
          {topBoxes.length === 0 ? (
            <p className="analytics-empty">No data for this period.</p>
          ) : (
            <div className="analytics-top-boxes">
              {topBoxes.map((box, i) => (
                <div key={box.name} className="analytics-box-row">
                  <div className="analytics-box-row__rank">{i + 1}</div>
                  <div className="analytics-box-row__body">
                    <div className="analytics-box-row__top">
                      <span className="analytics-box-row__name">{box.name}</span>
                      <span className="analytics-box-row__rev">
                        {formatMoney(box.revenue, currency)}
                      </span>
                    </div>
                    <div className="analytics-box-row__track">
                      <div
                        className="analytics-box-row__fill"
                        style={{ width: `${(box.revenue / maxBoxRevenue) * 100}%` }}
                      />
                    </div>
                    <div className="analytics-box-row__meta">{box.orders} orders</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
