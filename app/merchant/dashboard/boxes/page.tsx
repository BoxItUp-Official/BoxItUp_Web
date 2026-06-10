import { createClient } from '@/lib/supabase-server'
import Link from 'next/link'
import { toggleBox, deleteBox } from '../actions'

export default async function BoxesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: boxes } = user
    ? await supabase.from('boxes').select('*').eq('merchant_id', user.id).order('created_at', { ascending: false })
    : { data: [] }

  return (
    <>
      <div className="merchant-page-header">
        <div>
          <h1>My Boxes</h1>
          <p>{boxes?.length ?? 0} listing{boxes?.length !== 1 ? 's' : ''} — customers discover these in the app.</p>
        </div>
        <Link href="/merchant/dashboard/boxes/new" className="btn btn--primary">
          + Add a box
        </Link>
      </div>

      {!boxes || boxes.length === 0 ? (
        <div className="merchant-empty">
          <div className="merchant-empty__icon">
            <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 16V8a2 2 0 0 0-1-1.73L13 2.27a2 2 0 0 0-2 0L4 6.27A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
          </div>
          <div className="merchant-empty__title">No boxes yet</div>
          <div className="merchant-empty__body">
            Create your first surprise box listing to start attracting customers on Box It Up.
          </div>
          <Link href="/merchant/dashboard/boxes/new" className="btn btn--primary">
            Create your first box
          </Link>
        </div>
      ) : (
        <div className="merchant-box-grid">
          {boxes.map((box) => {
            const savings = box.original_value
              ? Math.round((1 - box.price / box.original_value) * 100)
              : null
            return (
              <div key={box.id} className={`merchant-box-card${!box.is_active ? ' merchant-box-card--paused' : ''}`}>
                {/* Photo */}
                <div className="merchant-box-card__photo">
                  {box.photo_url
                    ? <img src={box.photo_url} alt={box.name} />
                    : (
                      <div className="merchant-box-card__photo-placeholder">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 16V8a2 2 0 0 0-1-1.73L13 2.27a2 2 0 0 0-2 0L4 6.27A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                          <polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" />
                        </svg>
                      </div>
                    )
                  }
                  <div className="merchant-box-card__status-badge">
                    <span className={`merchant-badge merchant-badge--${box.is_active ? 'active' : 'inactive'}`}>
                      {box.is_active ? 'Active' : 'Paused'}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="merchant-box-card__body">
                  <div className="merchant-box-card__price-row">
                    <span className="merchant-box-card__price">{box.price} NTD</span>
                    {savings && (
                      <span className="merchant-box-card__savings">Save {savings}%</span>
                    )}
                  </div>
                  <div className="merchant-box-card__name">{box.name}</div>

                  <div className="merchant-box-card__meta">
                    <div className="merchant-box-card__meta-row">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                      </svg>
                      {box.pickup_start.slice(0, 5)} – {box.pickup_end.slice(0, 5)}
                    </div>
                    <div className="merchant-box-card__meta-row">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73L13 2.27a2 2 0 0 0-2 0L4 6.27A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                      </svg>
                      {box.quantity} per day
                    </div>
                  </div>

                  {/* Days */}
                  <div className="merchant-box-card__days">
                    {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => (
                      <span
                        key={d}
                        className={`merchant-day-chip${(box.available_days ?? []).includes(d) ? ' merchant-day-chip--on' : ''}`}
                      >
                        {d}
                      </span>
                    ))}
                  </div>

                  {/* Tags */}
                  {box.tags && box.tags.length > 0 && (
                    <div className="merchant-box-card__tags">
                      {box.tags.map((t: string) => (
                        <span key={t} className="merchant-tag-chip">{t}</span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="merchant-box-card__actions">
                  <Link href={`/merchant/dashboard/boxes/${box.id}`} className="merchant-table-action" style={{ flex: 1, justifyContent: 'center' }}>
                    Edit
                  </Link>
                  <form action={toggleBox}>
                    <input type="hidden" name="id" value={box.id} />
                    <input type="hidden" name="is_active" value={String(box.is_active)} />
                    <button type="submit" className={`merchant-table-action merchant-table-action--neutral`}>
                      {box.is_active ? 'Pause' : 'Activate'}
                    </button>
                  </form>
                  <form action={deleteBox}>
                    <input type="hidden" name="id" value={box.id} />
                    <button
                      type="submit"
                      className="merchant-table-action merchant-table-action--danger"
                      onClick={(e) => { if (!confirm('Delete this box? This cannot be undone.')) e.preventDefault() }}
                    >
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}
