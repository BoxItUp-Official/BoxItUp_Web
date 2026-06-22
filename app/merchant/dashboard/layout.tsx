import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import DashboardNav from './DashboardNav'
import { signOut } from './actions'

const MOCK_MERCHANT = { store_name: 'Demo Store', onboarding_complete: true }

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const isDev = process.env.NODE_ENV === 'development'
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user && !isDev) redirect('/merchant/login')

  let merchantName = MOCK_MERCHANT.store_name

  if (user) {
    const { data: merchant } = await supabase
      .from('merchants')
      .select('store_name, onboarding_complete')
      .eq('id', user.id)
      .single()

    if (!merchant?.onboarding_complete) redirect('/merchant/onboarding')
    merchantName = merchant?.store_name ?? merchantName
  }

  const initial = merchantName.charAt(0).toUpperCase()

  return (
    <div className="merchant-dashboard">
      <aside className="merchant-sidebar">
        {/* Brand */}
        <div className="merchant-sidebar__brand">
          <Link href="/merchant/dashboard" className="merchant-sidebar__brand-link">
            <img src="/logo_or.png" alt="Box It Up" className="merchant-sidebar__logo" />
          </Link>
        </div>

        {/* Store identity */}
        <div className="merchant-sidebar__store">
          <div className="merchant-sidebar__avatar">{initial}</div>
          <div className="merchant-sidebar__store-meta">
            <div className="merchant-sidebar__store-name">{merchantName}</div>
            <div className="merchant-sidebar__store-role">Merchant account</div>
          </div>
        </div>

        <DashboardNav />

        {/* Footer */}
        <div className="merchant-sidebar__footer">
          <a href="/" className="merchant-sidebar__backlink">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
            </svg>
            Back to site
          </a>
          {user && (
            <form action={signOut}>
              <button type="submit" className="merchant-sidebar__signout">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Sign out
              </button>
            </form>
          )}
        </div>
      </aside>

      <main className="merchant-content">
        <div className="merchant-content__inner">
          {children}
        </div>
      </main>
    </div>
  )
}
