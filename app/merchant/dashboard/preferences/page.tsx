import { createClient } from '@/lib/supabase-server'
import PreferencesClient from './PreferencesClient'

export default async function PreferencesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const email = user?.email ?? 'demo@store.com'
  const providers: string[] =
    (user?.app_metadata?.providers as string[] | undefined) ??
    (user?.app_metadata?.provider ? [user.app_metadata.provider] : ['email'])

  // Saved settings (best-effort — columns may not be migrated yet)
  let currency = 'TWD'
  let region = 'TW'
  let preferences: Record<string, unknown> = {}
  if (user) {
    const { data } = await supabase
      .from('merchants')
      .select('currency, region, preferences')
      .eq('id', user.id)
      .single()
    if (data) {
      currency = data.currency ?? 'TWD'
      region = data.region ?? 'TW'
      preferences = (data.preferences as Record<string, unknown>) ?? {}
    }
  }

  return (
    <div className="merchant-form-page">
      <div className="merchant-page-header">
        <div>
          <h1>Preferences</h1>
          <p>Manage your account, notifications, and app settings.</p>
        </div>
      </div>

      <PreferencesClient
        email={email}
        providers={providers}
        currency={currency}
        region={region}
        preferences={preferences}
      />
    </div>
  )
}
