import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import ProfileForm from './ProfileForm'

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/merchant/login')

  const { data: merchant } = await supabase
    .from('merchants')
    .select('store_name, category, address, city, phone, line_id, description')
    .eq('id', user.id)
    .single()

  if (!merchant) redirect('/merchant/onboarding')

  return (
    <>
      <div className="merchant-page-header">
        <div>
          <h1>Store Profile</h1>
          <p>Update your store information. Changes appear on your Box It Up listing.</p>
        </div>
      </div>

      <ProfileForm merchant={merchant} />
    </>
  )
}
