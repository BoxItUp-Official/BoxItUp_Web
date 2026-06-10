import { createClient } from '@/lib/supabase-server'
import ProfileForm from './ProfileForm'

const MOCK_MERCHANT = {
  store_name: 'Demo Store',
  category: 'Bakery',
  address: '10 Zhongshan N. Rd., Sec. 2',
  city: 'Taipei',
  phone: '',
  line_id: '',
  description: '',
  photo_url: null,
}

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const merchant = user
    ? (await supabase
        .from('merchants')
        .select('store_name, category, address, city, phone, line_id, description, photo_url')
        .eq('id', user.id)
        .single()
      ).data ?? MOCK_MERCHANT
    : MOCK_MERCHANT

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
