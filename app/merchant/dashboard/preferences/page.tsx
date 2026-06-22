import { createClient } from '@/lib/supabase-server'
import PreferencesClient from './PreferencesClient'

export default async function PreferencesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const email = user?.email ?? 'demo@store.com'
  // Which auth providers are linked (e.g. google, apple, email)
  const providers: string[] =
    (user?.app_metadata?.providers as string[] | undefined) ??
    (user?.app_metadata?.provider ? [user.app_metadata.provider] : ['email'])

  return (
    <div className="merchant-form-page">
      <div className="merchant-page-header">
        <div>
          <h1>Preferences</h1>
          <p>Manage your account, notifications, and app settings.</p>
        </div>
      </div>

      <PreferencesClient email={email} providers={providers} />
    </div>
  )
}
