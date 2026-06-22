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
  avatar_icon: null,
  contact_name: '',
  website: '',
  instagram: '',
  business_reg_no: '',
  business_hours: null,
}

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let merchant = MOCK_MERCHANT
  if (user) {
    // Guaranteed columns first so a real store always loads, even if the
    // 20240106 migration (new fields) hasn't been applied yet.
    const { data: base } = await supabase
      .from('merchants')
      .select('store_name, category, address, city, phone, line_id, description')
      .eq('id', user.id)
      .single()

    // New columns are best-effort; merge them in if present.
    const { data: extra } = await supabase
      .from('merchants')
      .select('photo_url, avatar_icon, contact_name, website, instagram, business_reg_no, business_hours')
      .eq('id', user.id)
      .single()

    if (base) merchant = { ...MOCK_MERCHANT, ...base, ...(extra ?? {}) }
  }

  return (
    <div className="merchant-form-page">
      <div className="merchant-page-header">
        <div>
          <h1>Store Profile</h1>
          <p>Update your store information. Changes appear on your Box It Up listing.</p>
        </div>
      </div>

      <ProfileForm merchant={merchant} userId={user?.id ?? null} />
    </div>
  )
}
