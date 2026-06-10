export default function AnalyticsPage() {
  const bars = [40, 65, 50, 80, 95, 70, 55]
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  return (
    <>
      <div className="merchant-page-header">
        <div>
          <h1>Analytics</h1>
          <p>Sales performance, customer trends, and revenue insights.</p>
        </div>
      </div>

      <div className="merchant-coming-soon">
        <div className="merchant-coming-soon__visual">
          <div className="merchant-coming-soon__chart">
            <div className="merchant-coming-soon__chart-bars">
              {bars.map((h, i) => (
                <div key={i} className="merchant-coming-soon__chart-col">
                  <div
                    className="merchant-coming-soon__chart-bar"
                    style={{ height: `${h}%` }}
                  />
                  <span className="merchant-coming-soon__chart-label">{days[i]}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="merchant-coming-soon__mock-stats">
            {[
              { label: 'Boxes sold this week', value: '—' },
              { label: 'Revenue this month', value: '—' },
              { label: 'Avg. sell-through rate', value: '—' },
            ].map((s) => (
              <div key={s.label} className="merchant-coming-soon__mock-stat">
                <span className="merchant-coming-soon__mock-stat-label">{s.label}</span>
                <span className="merchant-coming-soon__mock-stat-value">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="merchant-coming-soon__content">
          <div className="merchant-coming-soon__label">Coming in Phase 5</div>
          <h2 className="merchant-coming-soon__title">Sales analytics</h2>
          <p className="merchant-coming-soon__body">
            Understand your peak hours, best-selling boxes, and revenue trends
            so you can optimize your listings and reduce more waste.
          </p>
          <ul className="merchant-coming-soon__list">
            <li>Daily and weekly sales charts</li>
            <li>Sell-through rate per box type</li>
            <li>Peak pickup time heatmap</li>
            <li>Monthly revenue summary</li>
          </ul>
        </div>
      </div>
    </>
  )
}
