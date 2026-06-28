import { createClient } from '@/lib/supabase-server'
import AnalyticsClient from './AnalyticsClient'

// Fixed mock orders for dev/preview — spread across ~90 days, denser recently
const MOCK_ORDERS = (() => {
  const boxes = [
    { name: 'Bakery Surprise Box', price: 150 },
    { name: 'Evening Pastry Mix', price: 120 },
    { name: 'Lunch Special', price: 130 },
    { name: 'Healthy Grain Box', price: 110 },
  ]
  // status weights: 80% picked_up, 12% pending, 8% cancelled
  const statuses = [
    'picked_up', 'picked_up', 'picked_up', 'picked_up', 'picked_up',
    'picked_up', 'picked_up', 'picked_up', 'pending', 'cancelled',
  ] as const

  // Deterministic pseudo-random spread so the chart is stable between renders
  const orders: { id: string; box_name: string; price: number; status: 'pending' | 'picked_up' | 'cancelled'; created_at: string }[] = []
  let seed = 7
  const rand = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff }

  for (let day = 0; day < 90; day++) {
    // More orders on recent days (1-4), fewer further back (0-2)
    const maxPerDay = day < 30 ? 4 : 2
    const n = Math.floor(rand() * (maxPerDay + 1))
    for (let k = 0; k < n; k++) {
      const d = new Date()
      d.setDate(d.getDate() - day)
      d.setHours(10 + Math.floor(rand() * 10), 0, 0, 0)
      const box = boxes[Math.floor(rand() * boxes.length)]
      const status = statuses[Math.floor(rand() * statuses.length)]
      orders.push({
        id: `mock-${day}-${k}`,
        box_name: box.name,
        price: box.price,
        status,
        created_at: d.toISOString(),
      })
    }
  }
  return orders
})()

export default async function AnalyticsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const isDev = process.env.NODE_ENV === 'development'

  let orders = user
    ? ((await supabase
        .from('orders')
        .select('id, box_name, price, status, created_at')
        .eq('merchant_id', user.id)
        .order('created_at', { ascending: false })
      ).data ?? [])
    : []

  // In dev, fall back to mock data when there are no real orders yet
  if (isDev && orders.length === 0) orders = MOCK_ORDERS

  const currency = user
    ? ((await supabase.from('merchants').select('currency').eq('id', user.id).single()).data?.currency ?? 'TWD')
    : 'TWD'

  return (
    <>
      <div className="merchant-page-header">
        <div>
          <h1>Analytics</h1>
          <p>Sales performance, customer trends, and revenue insights.</p>
        </div>
      </div>

      <AnalyticsClient orders={orders as Parameters<typeof AnalyticsClient>[0]['orders']} currency={currency} />
    </>
  )
}
