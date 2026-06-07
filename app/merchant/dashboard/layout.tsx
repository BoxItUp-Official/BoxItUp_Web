import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
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
        <div className="merchant-sidebar__store">
          <div className="merchant-sidebar__avatar">{initial}</div>
          <div className="merchant-sidebar__store-name">{merchantName}</div>
        </div>

        <DashboardNav />

        <div className="merchant-sidebar__footer">
          {user && (
            <form action={signOut}>
              <button type="submit" className="merchant-sidebar__signout">
                Sign out
              </button>
            </form>
          )}
        </div>
      </aside>

      <main className="merchant-content">
        {children}
      </main>
    </div>
  )
}
