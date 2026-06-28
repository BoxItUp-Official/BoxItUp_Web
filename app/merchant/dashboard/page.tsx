import { createClient } from '@/lib/supabase-server'
import Link from 'next/link'
import { formatMoney } from '@/lib/currency'

type RecentOrder = {
  id: string
  box_name: string | null
  price: number
  status: 'pending' | 'picked_up' | 'cancelled'
  created_at: string
}

const MOCK_RECENT: RecentOrder[] = [
  { id: 'm1', box_name: 'Bakery Surprise Box', price: 150, status: 'pending', created_at: new Date(Date.now() - 1000 * 60 * 18).toISOString() },
  { id: 'm2', box_name: 'Evening Pastry Mix', price: 120, status: 'picked_up', created_at: new Date(Date.now() - 1000 * 60 * 95).toISOString() },
  { id: 'm3', box_name: 'Lunch Special', price: 130, status: 'picked_up', created_at: new Date(Date.now() - 1000 * 60 * 140).toISOString() },
  { id: 'm4', box_name: 'Healthy Grain Box', price: 110, status: 'cancelled', created_at: new Date(Date.now() - 1000 * 60 * 220).toISOString() },
]

const STATUS = {
  pending:   { label: 'Pending',   cls: 'merchant-badge--pending' },
  picked_up: { label: 'Picked up', cls: 'merchant-badge--active' },
  cancelled: { label: 'Cancelled', cls: 'merchant-badge--inactive' },
}

function timeAgo(iso: string) {
  const mins = Math.round((Date.now() - new Date(iso).getTime()) / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.round(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.round(hrs / 24)}d ago`
}

export default async function MerchantDashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const isDev = process.env.NODE_ENV === 'development'

  const todayStart = new Date()
  todayStart.setHours(0, 0, 0, 0)

  const [merchantResult, activeResult, totalResult, ordersResult, salesResult, recentResult] = await Promise.all([
    user ? supabase.from('merchants').select('store_name, currency').eq('id', user.id).single()
         : Promise.resolve({ data: { store_name: 'Demo Store', currency: 'TWD' } }),
    user ? supabase.from('boxes').select('*', { count: 'exact', head: true }).eq('merchant_id', user.id).eq('is_active', true)
         : Promise.resolve({ count: 0 }),
    user ? supabase.from('boxes').select('*', { count: 'exact', head: true }).eq('merchant_id', user.id)
         : Promise.resolve({ count: 0 }),
    user ? supabase.from('orders').select('*', { count: 'exact', head: true }).eq('merchant_id', user.id).gte('created_at', todayStart.toISOString())
         : Promise.resolve({ count: 0 }),
    user ? supabase.from('orders').select('price').eq('merchant_id', user.id).neq('status', 'cancelled')
         : Promise.resolve({ data: [] as { price: number }[] }),
    user ? supabase.from('orders').select('id, box_name, price, status, created_at').eq('merchant_id', user.id).order('created_at', { ascending: false }).limit(5)
         : Promise.resolve({ data: [] as RecentOrder[] }),
  ])

  const storeName = merchantResult.data?.store_name ?? 'your store'
  const currency = merchantResult.data?.currency ?? 'TWD'
  const activeBoxes = activeResult.count ?? 0
  const totalBoxes = totalResult.count ?? 0
  let ordersToday = ordersResult.count ?? 0
  let totalSales = ((salesResult.data ?? []) as { price: number }[]).reduce((s, o) => s + (o.price ?? 0), 0)
  let recent = (recentResult.data ?? []) as RecentOrder[]

  // Dev fallback so the panel isn't empty while testing
  if (isDev && recent.length === 0) {
    recent = MOCK_RECENT
    if (ordersToday === 0) ordersToday = 2
    if (totalSales === 0) totalSales = MOCK_RECENT.filter(o => o.status !== 'cancelled').reduce((s, o) => s + o.price, 0)
  }

  return (
    <>
      <div className="merchant-page-header">
        <div>
          <h1>Welcome back, {storeName}</h1>
          <p>Here&apos;s a snapshot of your store.</p>
        </div>
        <Link href="/merchant/dashboard/boxes/new" className="btn btn--primary">+ Add a box</Link>
      </div>

      <div className="merchant-stats-grid">
        <div className="merchant-stat-card merchant-stat-card--accent">
          <div className="merchant-stat-card__label">Active Boxes</div>
          <div className="merchant-stat-card__value">{activeBoxes}</div>
          <div className="merchant-stat-card__note">Currently listed</div>
        </div>
        <div className="merchant-stat-card merchant-stat-card--accent">
          <div className="merchant-stat-card__label">Total Listings</div>
          <div className="merchant-stat-card__value">{totalBoxes}</div>
          <div className="merchant-stat-card__note">All time</div>
        </div>
        <div className="merchant-stat-card merchant-stat-card--accent">
          <div className="merchant-stat-card__label">Orders Today</div>
          <div className="merchant-stat-card__value">{ordersToday}</div>
          <div className="merchant-stat-card__note">Since midnight</div>
        </div>
        <div className="merchant-stat-card merchant-stat-card--accent">
          <div className="merchant-stat-card__label">Total Revenue</div>
          <div className="merchant-stat-card__value">{formatMoney(totalSales, currency)}</div>
          <div className="merchant-stat-card__note">All confirmed orders</div>
        </div>
      </div>

      {/* Recent orders */}
      <div className="overview-recent-head">
        <div className="merchant-section-title" style={{ margin: 0 }}>Recent orders</div>
        <Link href="/merchant/dashboard/orders" className="overview-recent__viewall">View all →</Link>
      </div>

      {recent.length === 0 ? (
        <div className="merchant-empty">
          <div className="merchant-empty__title">No orders yet</div>
          <div className="merchant-empty__body">Orders will appear here when customers reserve your boxes.</div>
        </div>
      ) : (
        <div className="overview-recent">
          {recent.map(o => (
            <div key={o.id} className="overview-recent__row">
              <div className="overview-recent__main">
                <span className="overview-recent__name">{o.box_name ?? 'Box'}</span>
                <span className="overview-recent__time">{timeAgo(o.created_at)}</span>
              </div>
              <div className="overview-recent__right">
                <span className={`merchant-badge ${STATUS[o.status].cls}`}>{STATUS[o.status].label}</span>
                <span className="overview-recent__price">{formatMoney(o.price, currency)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
