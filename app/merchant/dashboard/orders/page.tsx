import { createClient } from '@/lib/supabase-server'
import OrdersClient from './OrdersClient'

const MOCK_ORDERS = [
  {
    id: 'mock-1',
    box_name: 'Bakery Surprise Box',
    customer_name: 'Chen Wei',
    customer_phone: '0912 345 678',
    pickup_code: 'ABX42F',
    scheduled_pickup_start: '17:30:00',
    scheduled_pickup_end: '19:00:00',
    price: 150,
    status: 'pending' as const,
    created_at: new Date().toISOString(),
    picked_up_at: null,
  },
  {
    id: 'mock-2',
    box_name: 'Evening Pastry Mix',
    customer_name: 'Lin Mei',
    customer_phone: '0923 456 789',
    pickup_code: 'GH9K3R',
    scheduled_pickup_start: '18:00:00',
    scheduled_pickup_end: '19:30:00',
    price: 120,
    status: 'picked_up' as const,
    created_at: new Date().toISOString(),
    picked_up_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
]

export default async function OrdersPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const isDev = process.env.NODE_ENV === 'development'

  const orders = user
    ? ((await supabase
        .from('orders')
        .select('id, box_name, customer_name, customer_phone, pickup_code, scheduled_pickup_start, scheduled_pickup_end, price, status, created_at, picked_up_at')
        .eq('merchant_id', user.id)
        .order('created_at', { ascending: false })
      ).data ?? [])
    : (isDev ? MOCK_ORDERS : [])

  const pendingCount = orders.filter(o => o.status === 'pending').length

  return (
    <>
      <div className="merchant-page-header">
        <div>
          <h1>
            Orders
            {pendingCount > 0 && (
              <span className="orders-pending-badge">{pendingCount}</span>
            )}
          </h1>
          <p>Track customer pickups and manage your daily order flow.</p>
        </div>
      </div>

      <OrdersClient orders={orders as Parameters<typeof OrdersClient>[0]['orders']} />
    </>
  )
}
