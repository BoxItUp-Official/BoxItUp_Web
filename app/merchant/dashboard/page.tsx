import { createClient } from '@/lib/supabase-server'
import Link from 'next/link'

export default async function MerchantDashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const [{ data: merchant }, { count: activeBoxes }, { count: totalBoxes }] = await Promise.all([
    supabase.from('merchants').select('store_name').eq('id', user!.id).single(),
    supabase.from('boxes').select('*', { count: 'exact', head: true })
      .eq('merchant_id', user!.id).eq('is_active', true),
    supabase.from('boxes').select('*', { count: 'exact', head: true })
      .eq('merchant_id', user!.id),
  ])

  return (
    <>
      <div className="merchant-page-header">
        <div>
          <h1>Welcome back, {merchant?.store_name}</h1>
          <p>Here&apos;s a snapshot of your store.</p>
        </div>
        <Link href="/merchant/dashboard/boxes/new" className="btn btn--primary">
          + Add a box
        </Link>
      </div>

      <div className="merchant-stats-grid">
        <div className="merchant-stat-card">
          <div className="merchant-stat-card__label">Active Boxes</div>
          <div className="merchant-stat-card__value">{activeBoxes ?? 0}</div>
          <div className="merchant-stat-card__note">Currently listed</div>
        </div>
        <div className="merchant-stat-card">
          <div className="merchant-stat-card__label">Total Listings</div>
          <div className="merchant-stat-card__value">{totalBoxes ?? 0}</div>
          <div className="merchant-stat-card__note">All time</div>
        </div>
        <div className="merchant-stat-card">
          <div className="merchant-stat-card__label">Orders Today</div>
          <div className="merchant-stat-card__value">—</div>
          <div className="merchant-stat-card__note">Coming in Phase 5</div>
        </div>
        <div className="merchant-stat-card">
          <div className="merchant-stat-card__label">Total Sales</div>
          <div className="merchant-stat-card__value">—</div>
          <div className="merchant-stat-card__note">Coming in Phase 5</div>
        </div>
      </div>

      <div className="merchant-dash-links">
        <Link href="/merchant/dashboard/boxes" className="merchant-dash-quicklink">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 16V8a2 2 0 0 0-1-1.73L13 2.27a2 2 0 0 0-2 0L4 6.27A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" />
          </svg>
          <div>
            <strong>Manage boxes</strong>
            <span>View, edit, or pause your listings</span>
          </div>
          <span className="merchant-dash-quicklink__arrow">→</span>
        </Link>
        <Link href="/merchant/dashboard/profile" className="merchant-dash-quicklink">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <div>
            <strong>Store profile</strong>
            <span>Update your store info and contact details</span>
          </div>
          <span className="merchant-dash-quicklink__arrow">→</span>
        </Link>
      </div>
    </>
  )
}
