import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'

export default async function MerchantDashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/merchant/login')

  const { data: merchant } = await supabase
    .from('merchants')
    .select('store_name, onboarding_complete')
    .eq('id', user.id)
    .single()

  if (!merchant?.onboarding_complete) redirect('/merchant/onboarding')

  return (
    <main style={{ flex: 1, padding: '3rem 2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div className="merchant-auth__eyebrow">Merchant Portal</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--clr-heading)', marginBottom: '0.5rem' }}>
          Welcome back, {merchant.store_name} 👋
        </h1>
        <p style={{ color: 'var(--clr-muted)', fontSize: '1rem', marginBottom: '2.5rem' }}>
          Your store is registered. The full dashboard — box listings, orders, and analytics — is coming in Phase 4.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
        }}>
          {[
            { label: 'Active Boxes', value: '—', note: 'Coming in Phase 4' },
            { label: 'Orders Today', value: '—', note: 'Coming in Phase 4' },
            { label: 'Total Sales', value: '—', note: 'Coming in Phase 4' },
          ].map((card) => (
            <div key={card.label} style={{
              background: '#fff',
              border: '1px solid var(--clr-border)',
              borderRadius: 'var(--radius-xl)',
              padding: '1.5rem',
              boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
            }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--clr-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
                {card.label}
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--clr-heading)' }}>
                {card.value}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--clr-muted)', marginTop: '0.25rem' }}>
                {card.note}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '2.5rem', display: 'flex', gap: '0.75rem' }}>
          <a href="/merchant/dashboard/profile" className="btn btn--primary">
            Edit store profile
          </a>
          <a href="/" className="btn btn--ghost">
            Back to Box It Up
          </a>
        </div>
      </div>
    </main>
  )
}
