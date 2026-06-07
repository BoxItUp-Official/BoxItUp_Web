import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { toggleBox, deleteBox } from '../actions'

export default async function BoxesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/merchant/login')

  const { data: boxes } = await supabase
    .from('boxes')
    .select('*')
    .eq('merchant_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <>
      <div className="merchant-page-header">
        <div>
          <h1>My Boxes</h1>
          <p>Manage your surprise box listings.</p>
        </div>
        <Link href="/merchant/dashboard/boxes/new" className="btn btn--primary">
          + Add a box
        </Link>
      </div>

      {!boxes || boxes.length === 0 ? (
        <div className="merchant-empty">
          <div className="merchant-empty__icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 16V8a2 2 0 0 0-1-1.73L13 2.27a2 2 0 0 0-2 0L4 6.27A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
          </div>
          <div className="merchant-empty__title">No boxes yet</div>
          <div className="merchant-empty__body">
            Create your first surprise box listing to start attracting customers.
          </div>
          <Link href="/merchant/dashboard/boxes/new" className="btn btn--primary">
            Create your first box
          </Link>
        </div>
      ) : (
        <div className="merchant-table-wrap">
          <table className="merchant-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Qty / day</th>
                <th>Pickup window</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {boxes.map((box) => (
                <tr key={box.id}>
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--clr-heading)' }}>{box.name}</div>
                    {box.original_value && (
                      <div style={{ fontSize: '0.78rem', color: 'var(--clr-muted)', marginTop: '0.15rem' }}>
                        Save {Math.round((1 - box.price / box.original_value) * 100)}% off {box.original_value} NTD
                      </div>
                    )}
                  </td>
                  <td><strong>{box.price} NTD</strong></td>
                  <td>{box.quantity}</td>
                  <td style={{ whiteSpace: 'nowrap' }}>
                    {box.pickup_start.slice(0, 5)} – {box.pickup_end.slice(0, 5)}
                  </td>
                  <td>
                    <span className={`merchant-badge merchant-badge--${box.is_active ? 'active' : 'inactive'}`}>
                      {box.is_active ? 'Active' : 'Paused'}
                    </span>
                  </td>
                  <td>
                    <div className="merchant-table-actions">
                      <Link href={`/merchant/dashboard/boxes/${box.id}`} className="merchant-table-action">
                        Edit
                      </Link>
                      <form action={toggleBox} style={{ display: 'inline' }}>
                        <input type="hidden" name="id" value={box.id} />
                        <input type="hidden" name="is_active" value={String(box.is_active)} />
                        <button type="submit" className="merchant-table-action">
                          {box.is_active ? 'Pause' : 'Activate'}
                        </button>
                      </form>
                      <form action={deleteBox} style={{ display: 'inline' }}>
                        <input type="hidden" name="id" value={box.id} />
                        <button
                          type="submit"
                          className="merchant-table-action merchant-table-action--danger"
                          onClick={(e) => { if (!confirm('Delete this box?')) e.preventDefault() }}
                        >
                          Delete
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}
