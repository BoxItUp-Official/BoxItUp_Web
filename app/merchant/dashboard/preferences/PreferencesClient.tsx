'use client'

import { useActionState, useState } from 'react'
import { savePreferences, changePassword, signOutEverywhere } from '../actions'
import type { DashboardState } from '../actions'
import { REGIONS, CURRENCIES, type CurrencyCode } from '@/lib/currency'

/* ── Toggle switch (also emits a hidden input so it submits with the form) ── */
function Toggle({ name, on, onChange }: { name?: string; on: boolean; onChange: (v: boolean) => void }) {
  return (
    <>
      {name && <input type="hidden" name={name} value={on ? 'true' : 'false'} />}
      <button
        type="button"
        role="switch"
        aria-checked={on}
        className={`pref-toggle${on ? ' pref-toggle--on' : ''}`}
        onClick={() => onChange(!on)}
      >
        <span className="pref-toggle__knob" />
      </button>
    </>
  )
}

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

function ComingSoon() {
  return <span className="coming-soon-tag">Coming soon</span>
}

const idleState: DashboardState = { status: 'idle', message: '' }

function ChangePassword() {
  const [open, setOpen] = useState(false)
  const [state, action, pending] = useActionState(changePassword, idleState)

  if (!open) {
    return <button type="button" className="btn btn--secondary btn--sm" onClick={() => setOpen(true)}>Change password</button>
  }
  return (
    <form action={action} className="pref-inline-form">
      <input type="password" name="new_password" placeholder="New password (min 8 characters)" autoComplete="new-password" required />
      <input type="password" name="confirm_password" placeholder="Confirm new password" autoComplete="new-password" required />
      <div className="pref-inline-form__actions">
        <button type="button" className="btn btn--secondary btn--sm" onClick={() => setOpen(false)}>Cancel</button>
        <button type="submit" className="btn btn--primary btn--sm" disabled={pending}>{pending ? 'Saving…' : 'Update password'}</button>
      </div>
      {state.status === 'error' && <p className="pref-inline-form__msg pref-inline-form__msg--err">{state.message}</p>}
      {state.status === 'success' && <p className="pref-inline-form__msg pref-inline-form__msg--ok">{state.message}</p>}
    </form>
  )
}

const PROVIDER_LABEL: Record<string, string> = {
  google: 'Google', apple: 'Apple', line: 'LINE', email: 'Email & password',
}

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

interface Prefs {
  timezone?: string
  notifications?: { new_order?: boolean; daily?: boolean; weekly?: boolean; updates?: boolean }
  accepting_orders?: boolean
  default_pickup?: { start?: string; end?: string }
}

interface Props {
  email: string
  providers: string[]
  currency: string
  region: string
  preferences: Prefs
}

const initial: DashboardState = { status: 'idle', message: '' }

export default function PreferencesClient({ email, providers, currency: initCurrency, region: initRegion, preferences }: Props) {
  const [state, formAction, pending] = useActionState(savePreferences, initial)

  // Region & currency
  const [region, setRegion] = useState(initRegion)
  const [currency, setCurrency] = useState(initCurrency)

  // Notifications
  const n = preferences.notifications ?? {}
  const [notifNewOrder, setNotifNewOrder] = useState(n.new_order ?? true)
  const [notifDaily, setNotifDaily] = useState(n.daily ?? true)
  const [notifWeekly, setNotifWeekly] = useState(n.weekly ?? false)
  const [notifUpdates, setNotifUpdates] = useState(n.updates ?? true)

  // Display + store ops
  const [timezone, setTimezone] = useState(preferences.timezone ?? 'Asia/Taipei')
  const [acceptingOrders, setAcceptingOrders] = useState(preferences.accepting_orders ?? true)
  const [pickupStart, setPickupStart] = useState(preferences.default_pickup?.start ?? '18:00')
  const [pickupEnd, setPickupEnd] = useState(preferences.default_pickup?.end ?? '20:00')

  function onRegionChange(code: string) {
    setRegion(code)
    const r = REGIONS.find(x => x.code === code)
    if (r) { setCurrency(r.currency); setTimezone(r.timezone) }
  }

  const allProviders = ['google', 'apple', 'line', 'email']

  return (
    <div className="pref-page">
      {/* ── Account & security (separate actions, outside the save form) ── */}
      <Section title="Account & security" sub="Your login details and connected accounts.">
        <Row title="Email" desc={email}>
          <ComingSoon />
        </Row>
        <div className="pref-divider" />
        <div className="pref-row pref-row--block">
          <div className="pref-row__text">
            <div className="pref-row__title">Password</div>
            <div className="pref-row__desc">Set or update your password.</div>
          </div>
          <ChangePassword />
        </div>
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
                    : <ComingSoon />}
                </div>
              )
            })}
          </div>
        </div>
        <div className="pref-divider" />
        <form action={signOutEverywhere}>
          <Row title="Sign out everywhere" desc="End all active sessions on other devices.">
            <button type="submit" className="btn btn--secondary btn--sm">Sign out all</button>
          </Row>
        </form>
      </Section>

      {/* ── Saveable preferences form ── */}
      <form action={formAction}>
        {state.status === 'success' && <div className="merchant-success" style={{ marginBottom: '1.25rem' }}>{state.message}</div>}
        {state.status === 'error' && <div className="merchant-error" style={{ marginBottom: '1.25rem' }}>{state.message}</div>}

        {/* Region & currency */}
        <Section title="Region & currency" sub="Used for pricing and money shown across your dashboard.">
          <Row title="Region">
            <select className="pref-select" name="region" value={region} onChange={(e) => onRegionChange(e.target.value)}>
              {REGIONS.map(r => <option key={r.code} value={r.code}>{r.label}</option>)}
            </select>
          </Row>
          <div className="pref-divider" />
          <Row title="Currency" desc="Shown in Overview, Orders, and Analytics.">
            <select className="pref-select" name="currency" value={currency} onChange={(e) => setCurrency(e.target.value)}>
              {(Object.keys(CURRENCIES) as CurrencyCode[]).map(code => (
                <option key={code} value={code}>{CURRENCIES[code].symbol} · {code} — {CURRENCIES[code].label}</option>
              ))}
            </select>
          </Row>
        </Section>

        {/* Notifications */}
        <Section title="Notifications" sub="Choose which emails you receive.">
          <Row title="New order alerts" desc="Email me the moment a customer reserves a box.">
            <Toggle name="notif_new_order" on={notifNewOrder} onChange={setNotifNewOrder} />
          </Row>
          <div className="pref-divider" />
          <Row title="Daily summary" desc="A recap of the day's orders and revenue each evening.">
            <Toggle name="notif_daily" on={notifDaily} onChange={setNotifDaily} />
          </Row>
          <div className="pref-divider" />
          <Row title="Weekly performance report" desc="Trends and top boxes, every Monday.">
            <Toggle name="notif_weekly" on={notifWeekly} onChange={setNotifWeekly} />
          </Row>
          <div className="pref-divider" />
          <Row title="Product updates & tips" desc="Occasional news about new Box It Up features.">
            <Toggle name="notif_updates" on={notifUpdates} onChange={setNotifUpdates} />
          </Row>
        </Section>

        {/* Display */}
        <Section title="Display" sub="How dates and times appear to you.">
          <Row title="Timezone" desc="Used for pickup times and reports.">
            <select className="pref-select" name="timezone" value={timezone} onChange={(e) => setTimezone(e.target.value)}>
              <option value="Asia/Taipei">Taipei (GMT+8)</option>
              <option value="Asia/Hong_Kong">Hong Kong (GMT+8)</option>
              <option value="Asia/Shanghai">Shanghai (GMT+8)</option>
              <option value="Asia/Tokyo">Tokyo (GMT+9)</option>
              <option value="America/New_York">New York (GMT−5)</option>
              <option value="Europe/London">London (GMT+0)</option>
            </select>
          </Row>
        </Section>

        {/* Store operations */}
        <Section title="Store operations" sub="Defaults that affect how your store runs.">
          <Row title="Accepting orders" desc={acceptingOrders ? 'Your store is open and visible to customers.' : 'Paused — your boxes are hidden from customers.'}>
            <Toggle name="accepting_orders" on={acceptingOrders} onChange={setAcceptingOrders} />
          </Row>
          <div className="pref-divider" />
          <Row title="Default pickup window" desc="Pre-fills the time when you create a new box.">
            <div className="pref-time-range">
              <select className="pref-select pref-time-select" name="default_pickup_start" value={pickupStart} onChange={(e) => setPickupStart(e.target.value)}>
                {TIME_OPTIONS.map((t) => <option key={t} value={t}>{formatTime(t)}</option>)}
              </select>
              <span className="pref-time-range__sep">–</span>
              <select className="pref-select pref-time-select" name="default_pickup_end" value={pickupEnd} onChange={(e) => setPickupEnd(e.target.value)}>
                {TIME_OPTIONS.map((t) => <option key={t} value={t}>{formatTime(t)}</option>)}
              </select>
            </div>
          </Row>
        </Section>

        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '0.25rem' }}>
          <button type="submit" className="btn btn--primary btn--large" disabled={pending}>
            {pending ? 'Saving…' : 'Save preferences'}
          </button>
        </div>
      </form>

      {/* ── Billing & payouts ── */}
      <Section title="Billing & payouts" sub="Where your earnings go.">
        <div className="pref-soon">
          <div className="pref-soon__badge">Coming soon</div>
          <p className="pref-soon__text">Payout accounts and schedules will appear here once in-app payments go live.</p>
        </div>
      </Section>

      {/* ── Danger zone ── */}
      <Section title="Danger zone">
        <Row title="Deactivate store" desc="Temporarily hide all your listings. You can reactivate any time.">
          <ComingSoon />
        </Row>
        <div className="pref-divider" />
        <Row title="Delete account" desc="Permanently remove your store and all data. This cannot be undone.">
          <ComingSoon />
        </Row>
      </Section>
    </div>
  )
}
