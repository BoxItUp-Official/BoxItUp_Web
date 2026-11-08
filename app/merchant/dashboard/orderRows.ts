// Shapes `orders` rows (schema owned by BoxItUp_Backend) into what the portal's
// Overview, Orders and Analytics pages display.

export const ORDER_COLUMNS =
  'id, bag_title, customer_name, customer_phone, pickup_code, amount, payment_method, status, expires_at, created_at, picked_up_at, bag:bags(pickup_start, pickup_end)'

type BagTimes = { pickup_start: string; pickup_end: string }

export type OrderRowDb = {
  id: string
  bag_title: string
  customer_name: string | null
  customer_phone: string | null
  pickup_code: string
  amount: number
  payment_method: 'pay_at_pickup' | 'ecpay'
  status: 'pending_payment' | 'reserved' | 'paid' | 'picked_up' | 'cancelled' | 'no_show' | 'refunded'
  expires_at: string | null
  created_at: string
  picked_up_at: string | null
  // PostgREST returns a to-one embed as an object; typed loosely because the
  // client here is not generated from the schema.
  bag: BagTimes | BagTimes[] | null
}

// The three groups the portal filters by.
export type OrderGroup = 'pending' | 'picked_up' | 'cancelled'

export type OrderRow = {
  id: string
  box_name: string
  customer_name: string | null
  customer_phone: string | null
  pickup_code: string
  scheduled_pickup_start: string | null // HH:MM, Taipei time
  scheduled_pickup_end: string | null
  price: number
  payment_method: 'pay_at_pickup' | 'ecpay'
  status: OrderGroup
  status_label: string
  expires_at: string | null
  created_at: string
  picked_up_at: string | null
}

const STATUS: Record<OrderRowDb['status'], { group: OrderGroup; label: string }> = {
  pending_payment: { group: 'pending', label: 'Awaiting payment' },
  reserved: { group: 'pending', label: 'Pay at pickup' },
  paid: { group: 'pending', label: 'Paid online' },
  picked_up: { group: 'picked_up', label: 'Picked up' },
  cancelled: { group: 'cancelled', label: 'Cancelled' },
  no_show: { group: 'cancelled', label: 'No-show' },
  refunded: { group: 'cancelled', label: 'Refunded' },
}

const taipeiTime = new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
  timeZone: 'Asia/Taipei',
})

export function toOrderRow(o: OrderRowDb): OrderRow {
  const bag = Array.isArray(o.bag) ? o.bag[0] : o.bag
  const s = STATUS[o.status]
  return {
    id: o.id,
    box_name: o.bag_title,
    customer_name: o.customer_name,
    customer_phone: o.customer_phone,
    pickup_code: o.pickup_code,
    scheduled_pickup_start: bag ? taipeiTime.format(new Date(bag.pickup_start)) : null,
    scheduled_pickup_end: bag ? taipeiTime.format(new Date(bag.pickup_end)) : null,
    price: o.amount,
    payment_method: o.payment_method,
    status: s.group,
    status_label: s.label,
    expires_at: o.expires_at,
    created_at: o.created_at,
    picked_up_at: o.picked_up_at,
  }
}

export function formatTaipeiTime(iso: string) {
  return taipeiTime.format(new Date(iso))
}

// Postgres raises short error codes; these are what the merchant reads.
export const RPC_ERRORS: Record<string, string> = {
  order_not_found: 'No order with that code at your store. Check the code and try again.',
  order_not_claimable: 'This order was already picked up, cancelled or expired.',
  box_not_found: 'That box no longer exists.',
  box_inactive: 'This box is paused. Activate it in My Boxes first.',
  merchant_not_ready: 'Finish setting up your store before publishing.',
  invalid_quantity: 'Quantity must be at least 1.',
  pickup_window_passed: 'Today’s pickup window for this box has already ended.',
  already_published: 'This box is already live today.',
  quantity_below_sold: 'You can’t go below the number already reserved.',
  bag_not_found: 'That listing no longer exists.',
  not_authenticated: 'Session expired. Please log in again.',
}

export function rpcMessage(error: { message: string }) {
  const code = Object.keys(RPC_ERRORS).find(c => error.message.includes(c))
  return code ? RPC_ERRORS[code] : `Something went wrong: ${error.message}`
}
