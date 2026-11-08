import { createClient } from '@/lib/supabase-server'
import Link from 'next/link'
import { formatMoney } from '@/lib/currency'
import PickupVerifier from './PickupVerifier'
import TodayPanel, { type TodayRow } from './TodayPanel'
import LiveRefresh from './LiveRefresh'
import { ORDER_COLUMNS, formatTaipeiTime, toOrderRow, type OrderRow, type OrderRowDb } from './orderRows'

const MOCK_RECENT: OrderRow[] = [
  { id: 'm1', box_name: 'Bakery Surprise Box', price: 150, status: 'pending', status_label: 'Pay at pickup', payment_method: 'pay_at_pickup', customer_name: null, customer_phone: null, pickup_code: 'ABX42F', scheduled_pickup_start: null, scheduled_pickup_end: null, expires_at: null, created_at: new Date(Date.now() - 1000 * 60 * 18).toISOString(), picked_up_at: null },
  { id: 'm2', box_name: 'Evening Pastry Mix', price: 120, status: 'picked_up', status_label: 'Picked up', payment_method: 'pay_at_pickup', customer_name: null, customer_phone: null, pickup_code: 'GH9K3R', scheduled_pickup_start: null, scheduled_pickup_end: null, expires_at: null, created_at: new Date(Date.now() - 1000 * 60 * 95).toISOString(), picked_up_at: null },
]

const BADGE = {
  pending: 'merchant-badge--pending',
  picked_up: 'merchant-badge--active',
  cancelled: 'merchant-badge--inactive',
}

function timeAgo(iso: string) {
  const mins = Math.round((Date.now() - new Date(iso).getTime()) / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.round(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.round(hrs / 24)}d ago`
}

// YYYY-MM-DD in Taipei, which is the day bags are published for.
function taipeiToday() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Taipei' }).format(new Date())
}

type Template = { id: string; name: string; price: number; quantity: number; pickup_start: string; pickup_end: string }
type TodayBag = {
  id: string
  box_id: string | null
  title: string
  sale_price: number
  quantity_total: number
  quantity_remaining: number
  pickup_start: string
  pickup_end: string
  is_active: boolean
}

function buildTodayRows(templates: Template[], bags: TodayBag[], today: string): TodayRow[] {
  const now = Date.now()
  const toBag = (b: TodayBag) => ({
    id: b.id,
    total: b.quantity_total,
    remaining: b.quantity_remaining,
    active: b.is_active,
    ended: new Date(b.pickup_end).getTime() <= now,
  })
  const rows: TodayRow[] = templates.map(t => {
    const bag = bags.find(b => b.box_id === t.id)
    return {
      key: t.id,
      name: t.name,
      price: t.price,
      pickup: bag
        ? `${formatTaipeiTime(bag.pickup_start)}–${formatTaipeiTime(bag.pickup_end)}`
        : `${t.pickup_start.slice(0, 5)}–${t.pickup_end.slice(0, 5)}`,
      template: {
        id: t.id,
        defaultQuantity: t.quantity,
        windowPassed: new Date(`${today}T${t.pickup_end}+08:00`).getTime() <= now,
      },
      bag: bag ? toBag(bag) : undefined,
    }
  })
  // Listings with no active template behind them (e.g. test listings).
  for (const b of bags.filter(b => !templates.some(t => t.id === b.box_id))) {
    rows.push({
      key: b.id,
      name: b.title,
      price: b.sale_price,
      pickup: `${formatTaipeiTime(b.pickup_start)}–${formatTaipeiTime(b.pickup_end)}`,
      bag: toBag(b),
    })
  }
  return rows
}

export default async function MerchantDashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const today = taipeiToday()
  const todayStart = `${today}T00:00:00+08:00`

  const [merchantResult, templatesResult, bagsResult, ordersTodayResult, revenueResult, recentResult] = await Promise.all([
    user ? supabase.from('merchants').select('store_name, currency').eq('id', user.id).single()
         : Promise.resolve({ data: { store_name: 'Demo Store', currency: 'TWD' } }),
    user ? supabase.from('boxes').select('id, name, price, quantity, pickup_start, pickup_end').eq('merchant_id', user.id).eq('is_active', true).order('pickup_start')
         : Promise.resolve({ data: [] as Template[] }),
    user ? supabase.from('bags').select('id, box_id, title, sale_price, quantity_total, quantity_remaining, pickup_start, pickup_end, is_active').eq('merchant_id', user.id).eq('pickup_date', today).order('pickup_end')
         : Promise.resolve({ data: [] as TodayBag[] }),
    user ? supabase.from('orders').select('*', { count: 'exact', head: true }).eq('merchant_id', user.id).gte('created_at', todayStart)
         : Promise.resolve({ count: 0 }),
    user ? supabase.from('orders').select('amount').eq('merchant_id', user.id).eq('status', 'picked_up')
         : Promise.resolve({ data: [] as { amount: number }[] }),
    user ? supabase.from('orders').select(ORDER_COLUMNS).eq('merchant_id', user.id).order('created_at', { ascending: false }).limit(5)
         : Promise.resolve({ data: [] as OrderRowDb[] }),
  ])

  const storeName = merchantResult.data?.store_name ?? 'your store'
  const currency = merchantResult.data?.currency ?? 'TWD'
  const todayRows = buildTodayRows((templatesResult.data ?? []) as Template[], (bagsResult.data ?? []) as TodayBag[], today)
  const liveToday = todayRows.filter(r => r.bag?.active && !r.bag.ended).length
  const leftToday = todayRows.reduce((s, r) => s + (r.bag?.active && !r.bag.ended ? r.bag.remaining : 0), 0)
  const ordersToday = ordersTodayResult.count ?? 0
  const revenue = ((revenueResult.data ?? []) as { amount: number }[]).reduce((s, o) => s + o.amount, 0)
  // Sample rows only for the logged-out dev preview, never for a real store.
  const recent = user ? ((recentResult.data ?? []) as OrderRowDb[]).map(toOrderRow) : MOCK_RECENT

  return (
    <>
      {user && <LiveRefresh merchantId={user.id} />}

      <div className="merchant-page-header">
        <div>
          <h1>Welcome back, {storeName}</h1>
          <p>Here&apos;s a snapshot of your store.</p>
        </div>
        <Link href="/merchant/dashboard/boxes/new" className="btn btn--primary">+ Add a box</Link>
      </div>

      <PickupVerifier currency={currency} />

      <div className="merchant-stats-grid">
        <div className="merchant-stat-card merchant-stat-card--accent">
          <div className="merchant-stat-card__label">Live today</div>
          <div className="merchant-stat-card__value">{liveToday}</div>
          <div className="merchant-stat-card__note">Boxes on sale in the app</div>
        </div>
        <div className="merchant-stat-card merchant-stat-card--accent">
          <div className="merchant-stat-card__label">Left today</div>
          <div className="merchant-stat-card__value">{leftToday}</div>
          <div className="merchant-stat-card__note">Not yet reserved</div>
        </div>
        <div className="merchant-stat-card merchant-stat-card--accent">
          <div className="merchant-stat-card__label">Orders today</div>
          <div className="merchant-stat-card__value">{ordersToday}</div>
          <div className="merchant-stat-card__note">Since midnight</div>
        </div>
        <div className="merchant-stat-card merchant-stat-card--accent">
          <div className="merchant-stat-card__label">Revenue</div>
          <div className="merchant-stat-card__value">{formatMoney(revenue, currency)}</div>
          <div className="merchant-stat-card__note">From picked-up orders</div>
        </div>
      </div>

      <TodayPanel rows={todayRows} currency={currency} />

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
                <span className="overview-recent__name">{o.box_name}</span>
                <span className="overview-recent__time">{o.pickup_code} · {timeAgo(o.created_at)}</span>
              </div>
              <div className="overview-recent__right">
                <span className={`merchant-badge ${BADGE[o.status]}`}>{o.status_label}</span>
                <span className="overview-recent__price">{formatMoney(o.price, currency)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
