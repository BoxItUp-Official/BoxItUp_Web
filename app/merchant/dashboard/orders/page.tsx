import { createClient } from '@/lib/supabase-server'
import OrdersClient from './OrdersClient'
import PickupVerifier from '../PickupVerifier'
import LiveRefresh from '../LiveRefresh'
import { ORDER_COLUMNS, toOrderRow, type OrderRow, type OrderRowDb } from '../orderRows'

// Shown only in the logged-out dev preview, never for a real store.
const MOCK_ORDERS: OrderRow[] = [
  {
    id: 'mock-1',
    box_name: 'Bakery Surprise Box',
    customer_name: 'Chen Wei',
    customer_phone: '0912 345 678',
    pickup_code: 'ABX42F',
    scheduled_pickup_start: '17:30',
    scheduled_pickup_end: '19:00',
    price: 150,
    payment_method: 'pay_at_pickup',
    status: 'pending',
    status_label: 'Pay at pickup',
    expires_at: new Date(Date.now() + 1000 * 60 * 14).toISOString(),
    created_at: new Date().toISOString(),
    picked_up_at: null,
  },
  {
    id: 'mock-2',
    box_name: 'Evening Pastry Mix',
    customer_name: 'Lin Mei',
    customer_phone: '0923 456 789',
    pickup_code: 'GH9K3R',
    scheduled_pickup_start: '18:00',
    scheduled_pickup_end: '19:30',
    price: 120,
    payment_method: 'pay_at_pickup',
    status: 'picked_up',
    status_label: 'Picked up',
    expires_at: null,
    created_at: new Date().toISOString(),
    picked_up_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
]

export default async function OrdersPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const orders = user
    ? (((await supabase
        .from('orders')
        .select(ORDER_COLUMNS)
        .eq('merchant_id', user.id)
        .order('created_at', { ascending: false })
        .limit(200)
      ).data ?? []) as OrderRowDb[]).map(toOrderRow)
    : MOCK_ORDERS

  const currency = user
    ? ((await supabase.from('merchants').select('currency').eq('id', user.id).single()).data?.currency ?? 'TWD')
    : 'TWD'

  const pendingCount = orders.filter(o => o.status === 'pending').length

  return (
    <>
      {user && <LiveRefresh merchantId={user.id} />}

      <div className="merchant-page-header">
        <div>
          <h1>
            Orders
            {pendingCount > 0 && (
              <span className="orders-pending-badge">{pendingCount}</span>
            )}
          </h1>
          <p>Reservations from the app. Confirm each pickup with the customer’s code.</p>
        </div>
      </div>

      <PickupVerifier currency={currency} />

      <OrdersClient orders={orders} currency={currency} />
    </>
  )
}
