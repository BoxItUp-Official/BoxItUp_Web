export default function OrdersPage() {
  return (
    <>
      <div className="merchant-page-header">
        <div>
          <h1>Orders</h1>
          <p>Track customer pickups and manage your daily order flow.</p>
        </div>
      </div>

      <div className="merchant-coming-soon">
        <div className="merchant-coming-soon__visual">
          <div className="merchant-coming-soon__mock">
            {[
              { name: 'Bakery Surprise Box', time: '17:30', status: 'Picked up' },
              { name: 'Evening Pastry Mix', time: '18:00', status: 'Confirmed' },
              { name: 'Bakery Surprise Box', time: '18:45', status: 'Confirmed' },
            ].map((order, i) => (
              <div key={i} className="merchant-coming-soon__mock-row">
                <div className="merchant-coming-soon__mock-dot" />
                <div className="merchant-coming-soon__mock-info">
                  <span className="merchant-coming-soon__mock-name">{order.name}</span>
                  <span className="merchant-coming-soon__mock-time">{order.time}</span>
                </div>
                <span className={`merchant-badge merchant-badge--${order.status === 'Picked up' ? 'active' : 'inactive'}`}>
                  {order.status}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="merchant-coming-soon__content">
          <div className="merchant-coming-soon__label">Coming in Phase 5</div>
          <h2 className="merchant-coming-soon__title">Order management</h2>
          <p className="merchant-coming-soon__body">
            View real-time orders, confirm customer pickups, track daily sales,
            and manage your inventory — all from one place.
          </p>
          <ul className="merchant-coming-soon__list">
            <li>Real-time order notifications via LINE</li>
            <li>One-tap pickup confirmation</li>
            <li>Daily and weekly order history</li>
            <li>Automatic inventory countdown</li>
          </ul>
        </div>
      </div>
    </>
  )
}
