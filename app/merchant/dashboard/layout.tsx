import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import DashboardNav from './DashboardNav'
import { signOut } from './actions'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
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
    <div className="merchant-dashboard">
      <aside className="merchant-sidebar">
        <div className="merchant-sidebar__store">{merchant.store_name}</div>
        <DashboardNav />
        <div className="merchant-sidebar__footer">
          <form action={signOut}>
            <button type="submit" className="merchant-sidebar__signout">
              Sign out
            </button>
          </form>
        </div>
      </aside>
      <main className="merchant-content">
        {children}
      </main>
    </div>
  )
}
