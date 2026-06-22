'use client'

import { useState } from 'react'

type DayHours = { open: boolean; start: string; end: string }
type Hours = Record<string, DayHours>

const DAYS: { key: string; label: string }[] = [
  { key: 'mon', label: 'Monday' },
  { key: 'tue', label: 'Tuesday' },
  { key: 'wed', label: 'Wednesday' },
  { key: 'thu', label: 'Thursday' },
  { key: 'fri', label: 'Friday' },
  { key: 'sat', label: 'Saturday' },
  { key: 'sun', label: 'Sunday' },
]

const TIME_OPTIONS = Array.from({ length: 48 }, (_, i) => {
  const h = Math.floor(i / 2)
  const m = i % 2 === 0 ? '00' : '30'
  return `${String(h).padStart(2, '0')}:${m}`
})
function fmt(t: string) {
  const [h, m] = t.split(':').map(Number)
  const ap = h < 12 ? 'AM' : 'PM'
  const h12 = h % 12 === 0 ? 12 : h % 12
  return `${h12}:${String(m).padStart(2, '0')} ${ap}`
}

const DEFAULT_DAY: DayHours = { open: true, start: '09:00', end: '18:00' }

function buildInitial(value?: Hours | null): Hours {
  const out: Hours = {}
  for (const d of DAYS) out[d.key] = value?.[d.key] ?? { ...DEFAULT_DAY }
  return out
}

export default function BusinessHours({ value }: { value?: Hours | null }) {
  const [hours, setHours] = useState<Hours>(() => buildInitial(value))

  function update(key: string, patch: Partial<DayHours>) {
    setHours((h) => ({ ...h, [key]: { ...h[key], ...patch } }))
  }

  return (
    <div className="biz-hours">
      <input type="hidden" name="business_hours" value={JSON.stringify(hours)} />
      {DAYS.map((d) => {
        const day = hours[d.key]
        return (
          <div key={d.key} className={`biz-hours__row${day.open ? '' : ' biz-hours__row--closed'}`}>
            <span className="biz-hours__day">{d.label}</span>
            <button
              type="button"
              role="switch"
              aria-checked={day.open}
              className={`pref-toggle${day.open ? ' pref-toggle--on' : ''}`}
              onClick={() => update(d.key, { open: !day.open })}
            >
              <span className="pref-toggle__knob" />
            </button>
            {day.open ? (
              <div className="biz-hours__times">
                <select className="pref-select pref-time-select" value={day.start} onChange={(e) => update(d.key, { start: e.target.value })}>
                  {TIME_OPTIONS.map((t) => <option key={t} value={t}>{fmt(t)}</option>)}
                </select>
                <span className="pref-time-range__sep">–</span>
                <select className="pref-select pref-time-select" value={day.end} onChange={(e) => update(d.key, { end: e.target.value })}>
                  {TIME_OPTIONS.map((t) => <option key={t} value={t}>{fmt(t)}</option>)}
                </select>
              </div>
            ) : (
              <span className="biz-hours__closed-label">Closed</span>
            )}
          </div>
        )
      })}
    </div>
  )
}
