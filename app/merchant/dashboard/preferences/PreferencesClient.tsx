'use client'

import { useState } from 'react'

/* ── Reusable toggle switch ── */
function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      className={`pref-toggle${on ? ' pref-toggle--on' : ''}`}
      onClick={() => onChange(!on)}
    >
      <span className="pref-toggle__knob" />
    </button>
  )
}

/* ── A labelled settings row with a control on the right ── */
function Row({ title, desc, children }: { title: string; desc?: string; children: React.ReactNode }) {
  return (
    <div className="pref-row">
      <div className="pref-row__text">
        <div className="pref-row__title">{title}</div>
        {desc && <div className="pref-row__desc">{desc}</div>}
      </div>
      <div className="pref-row__control">{children}</div>
    </div>
  )
}

function Section({ title, sub, children }: { title: string; sub?: string; children: React.ReactNode }) {
  return (
    <section className="merchant-form-section">
      <div className="merchant-form-section__header">
        <h2 className="merchant-form-section__title">{title}</h2>
        {sub && <p className="merchant-form-section__sub">{sub}</p>}
      </div>
      <div className="merchant-form-card pref-card">{children}</div>
    </section>
  )
}

const PROVIDER_LABEL: Record<string, string> = {
  google: 'Google',
  apple: 'Apple',
  line: 'LINE',
  email: 'Email & password',
}

// 30-minute time options across the day, shown as 12-hour labels
const TIME_OPTIONS = Array.from({ length: 48 }, (_, i) => {
  const h = Math.floor(i / 2)
  const m = i % 2 === 0 ? '00' : '30'
  return `${String(h).padStart(2, '0')}:${m}`
})
function formatTime(t: string) {
  const [h, m] = t.split(':').map(Number)
  const ampm = h < 12 ? 'AM' : 'PM'
  const h12 = h % 12 === 0 ? 12 : h % 12
  return `${h12}:${String(m).padStart(2, '0')} ${ampm}`
}

export default function PreferencesClient({ email, providers }: { email: string; providers: string[] }) {
  // Notification toggles (UI state — backend wiring pending)
  const [notifNewOrder, setNotifNewOrder] = useState(true)
  const [notifDaily, setNotifDaily] = useState(true)
  const [notifWeekly, setNotifWeekly] = useState(false)
  const [notifUpdates, setNotifUpdates] = useState(true)

  // Display
  const [timezone, setTimezone] = useState('Asia/Taipei')

  // Store operations
  const [acceptingOrders, setAcceptingOrders] = useState(true)
  const [pickupStart, setPickupStart] = useState('18:00')
  const [pickupEnd, setPickupEnd] = useState('20:00')

  const allProviders = ['google', 'apple', 'line', 'email']

  return (
    <div className="pref-page">
      {/* ── Account & security ── */}
      <Section title="Account & security" sub="Your login details and connected accounts.">
        <Row title="Email" desc={email}>
          <button type="button" className="btn btn--secondary btn--sm" disabled>Change</button>
        </Row>
        <div className="pref-divider" />
        <Row title="Password" desc="Set or update your password.">
          <button type="button" className="btn btn--secondary btn--sm">Change password</button>
        </Row>
        <div className="pref-divider" />
        <div className="pref-row pref-row--block">
          <div className="pref-row__text">
            <div className="pref-row__title">Connected logins</div>
            <div className="pref-row__desc">Sign in faster with a linked account.</div>
          </div>
          <div className="pref-providers">
            {allProviders.map((p) => {
              const linked = providers.includes(p)
              return (
                <div key={p} className="pref-provider">
                  <span className="pref-provider__name">{PROVIDER_LABEL[p]}</span>
                  {linked
                    ? <span className="pref-chip pref-chip--on">Connected</span>
                    : <button type="button" className="btn btn--secondary btn--sm">Connect</button>}
                </div>
              )
            })}
          </div>
        </div>
        <div className="pref-divider" />
        <Row title="Sign out everywhere" desc="End all active sessions on other devices.">
          <button type="button" className="btn btn--secondary btn--sm">Sign out all</button>
        </Row>
      </Section>

      {/* ── Notifications ── */}
      <Section title="Notifications" sub="Choose which emails you receive.">
        <Row title="New order alerts" desc="Email me the moment a customer reserves a box.">
          <Toggle on={notifNewOrder} onChange={setNotifNewOrder} />
        </Row>
        <div className="pref-divider" />
        <Row title="Daily summary" desc="A recap of the day's orders and revenue each evening.">
          <Toggle on={notifDaily} onChange={setNotifDaily} />
        </Row>
        <div className="pref-divider" />
        <Row title="Weekly performance report" desc="Trends and top boxes, every Monday.">
          <Toggle on={notifWeekly} onChange={setNotifWeekly} />
        </Row>
        <div className="pref-divider" />
        <Row title="Product updates & tips" desc="Occasional news about new Box It Up features.">
          <Toggle on={notifUpdates} onChange={setNotifUpdates} />
        </Row>
      </Section>

      {/* ── Display ── */}
      <Section title="Display" sub="How dates and times appear to you.">
        <Row title="Timezone" desc="Used for pickup times and reports.">
          <select className="pref-select" value={timezone} onChange={(e) => setTimezone(e.target.value)}>
            <option value="Asia/Taipei">Taipei (GMT+8)</option>
            <option value="Asia/Shanghai">Shanghai (GMT+8)</option>
            <option value="Asia/Tokyo">Tokyo (GMT+9)</option>
          </select>
        </Row>
      </Section>

      {/* ── Store operations ── */}
      <Section title="Store operations" sub="Defaults that affect how your store runs.">
        <Row title="Accepting orders" desc={acceptingOrders ? 'Your store is open and visible to customers.' : 'Paused — your boxes are hidden from customers.'}>
          <Toggle on={acceptingOrders} onChange={setAcceptingOrders} />
        </Row>
        <div className="pref-divider" />
        <Row title="Default pickup window" desc="Pre-fills the time when you create a new box.">
          <div className="pref-time-range">
            <select className="pref-select pref-time-select" value={pickupStart} onChange={(e) => setPickupStart(e.target.value)}>
              {TIME_OPTIONS.map((t) => <option key={t} value={t}>{formatTime(t)}</option>)}
            </select>
            <span className="pref-time-range__sep">–</span>
            <select className="pref-select pref-time-select" value={pickupEnd} onChange={(e) => setPickupEnd(e.target.value)}>
              {TIME_OPTIONS.map((t) => <option key={t} value={t}>{formatTime(t)}</option>)}
            </select>
          </div>
        </Row>
      </Section>

      {/* ── Billing & payouts ── */}
      <Section title="Billing & payouts" sub="Where your earnings go.">
        <div className="pref-soon">
          <div className="pref-soon__badge">Coming soon</div>
          <p className="pref-soon__text">
            Payout accounts and schedules will appear here once in-app payments go live.
          </p>
        </div>
      </Section>

      {/* ── Danger zone ── */}
      <Section title="Danger zone">
        <Row title="Deactivate store" desc="Temporarily hide all your listings. You can reactivate any time.">
          <button type="button" className="btn btn--secondary btn--sm pref-btn-warn">Deactivate</button>
        </Row>
        <div className="pref-divider" />
        <Row title="Delete account" desc="Permanently remove your store and all data. This cannot be undone.">
          <button type="button" className="merchant-table-action merchant-table-action--danger">Delete account</button>
        </Row>
      </Section>

      <p className="pref-footnote">
        Notification, language, and store-operation settings are UI-ready — saving will be wired to your account next.
      </p>
    </div>
  )
}
