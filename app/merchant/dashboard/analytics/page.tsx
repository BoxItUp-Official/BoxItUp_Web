import { createClient } from '@/lib/supabase-server'
import AnalyticsClient from './AnalyticsClient'

// Fixed mock orders for dev/preview (last 30 days, realistic distribution)
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
  // Day offsets (how many days ago): spread across 30 days with more recent activity
  const dayOffsets = [
    0, 0, 0, 1, 1, 1, 2, 2, 2, 3,
    3, 4, 4, 5, 5, 6, 6, 7, 8, 9,
    10, 11, 12, 14, 15, 16, 18, 20, 24, 28,
    0, 1, 1, 2, 3, 3, 4, 5, 6, 7,
    8, 9, 13, 16, 22,
  ]
  return dayOffsets.map((daysAgo, i) => {
    const d = new Date()
    d.setDate(d.getDate() - daysAgo)
    d.setHours(10 + (i % 10), 0, 0, 0)
    const box = boxes[i % boxes.length]
    const status = statuses[i % statuses.length]
    return {
      id: `mock-${i}`,
      box_name: box.name,
      price: box.price,
      status: status as 'pending' | 'picked_up' | 'cancelled',
      created_at: d.toISOString(),
    }
  })
})()

export default async function AnalyticsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const isDev = process.env.NODE_ENV === 'development'

  const orders = user
    ? ((await supabase
        .from('orders')
        .select('id, box_name, price, status, created_at')
        .eq('merchant_id', user.id)
        .order('created_at', { ascending: false })
      ).data ?? [])
    : (isDev ? MOCK_ORDERS : [])

  return (
    <>
      <div className="merchant-page-header">
        <div>
          <h1>Analytics</h1>
          <p>Sales performance, customer trends, and revenue insights.</p>
        </div>
      </div>

      <AnalyticsClient orders={orders as Parameters<typeof AnalyticsClient>[0]['orders']} />
    </>
  )
}
