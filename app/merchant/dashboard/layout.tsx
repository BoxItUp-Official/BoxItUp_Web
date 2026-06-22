import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import DashboardNav from './DashboardNav'
import CategoryIcon, { hasCategoryIcon } from './CategoryIcon'
import { signOut } from './actions'

const MOCK_MERCHANT = { store_name: 'Demo Store', category: 'Bakery', onboarding_complete: true }

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const isDev = process.env.NODE_ENV === 'development'
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user && !isDev) redirect('/merchant/login')

  let merchantName = MOCK_MERCHANT.store_name
  let merchantCategory: string | null = isDev && !user ? MOCK_MERCHANT.category : null
  let avatarIcon: string | null = null
  let photoUrl: string | null = null

  if (user) {
    // Onboarding decision uses only guaranteed columns.
    const { data: merchant } = await supabase
      .from('merchants')
      .select('store_name, category, onboarding_complete')
      .eq('id', user.id)
      .single()

    if (!merchant?.onboarding_complete) redirect('/merchant/onboarding')
    merchantName = merchant?.store_name ?? merchantName
    merchantCategory = merchant?.category ?? null

    // Avatar columns are best-effort — won't break the page if the
    // 20240106 migration hasn't been applied yet.
    const { data: av } = await supabase
      .from('merchants')
      .select('avatar_icon, photo_url')
      .eq('id', user.id)
      .single()
    avatarIcon = av?.avatar_icon ?? null
    photoUrl = av?.photo_url ?? null
  }

  const iconToShow = avatarIcon || merchantCategory
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

        {/* Store identity — opens store profile */}
        <Link href="/merchant/dashboard/profile" className="merchant-sidebar__store">
          <div className="merchant-sidebar__avatar">
            {photoUrl
              // eslint-disable-next-line @next/next/no-img-element
              ? <img src={photoUrl} alt="" className="merchant-sidebar__avatar-img" />
              : hasCategoryIcon(iconToShow)
                ? <CategoryIcon category={iconToShow} size={20} />
                : <span className="merchant-sidebar__avatar-initial">{initial}</span>}
          </div>
          <div className="merchant-sidebar__store-meta">
            <div className="merchant-sidebar__store-name">{merchantName}</div>
            <div className="merchant-sidebar__store-role">Store profile</div>
          </div>
          <svg className="merchant-sidebar__store-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </Link>

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
