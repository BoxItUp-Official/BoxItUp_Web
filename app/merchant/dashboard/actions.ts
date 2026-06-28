'use server'

import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export interface DashboardState {
  status: 'idle' | 'error' | 'success'
  message: string
}

const CATEGORIES = [
  'Bakery', 'Café', 'Restaurant', 'Convenience Store',
  'Supermarket', 'Deli / Butcher', 'Fresh Market / Produce', 'Other',
]

// ── Update store profile ──
export async function updateMerchantProfile(
  _prev: DashboardState,
  formData: FormData
): Promise<DashboardState> {
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) return { status: 'error', message: 'Session expired. Please log in again.' }

  const store_name = (formData.get('store_name') as string).trim()
  const category   = (formData.get('category') as string).trim()
  const address    = (formData.get('address') as string).trim()
  const city       = (formData.get('city') as string).trim()
  const phone      = (formData.get('phone') as string | null)?.trim() || null
  const line_id    = (formData.get('line_id') as string | null)?.trim() || null
  const description = (formData.get('description') as string | null)?.trim() || null
  const photo_url  = (formData.get('photo_url') as string | null)?.trim() || null
  const avatar_icon = (formData.get('avatar_icon') as string | null)?.trim() || null
  const contact_name = (formData.get('contact_name') as string | null)?.trim() || null
  const website    = (formData.get('website') as string | null)?.trim() || null
  const instagram  = (formData.get('instagram') as string | null)?.trim() || null
  const business_reg_no = (formData.get('business_reg_no') as string | null)?.trim() || null

  let business_hours: unknown = null
  const rawHours = formData.get('business_hours') as string | null
  if (rawHours) {
    try { business_hours = JSON.parse(rawHours) } catch { business_hours = null }
  }

  if (!store_name || !category || !address || !city) {
    return { status: 'error', message: 'Please fill in all required fields.' }
  }
  if (!CATEGORIES.includes(category)) {
    return { status: 'error', message: 'Invalid category.' }
  }

  const { error } = await supabase.from('merchants').update({
    store_name, category, address, city, phone, line_id, description,
    photo_url, avatar_icon, contact_name, website, instagram, business_reg_no, business_hours,
  }).eq('id', user.id)

  if (error) {
    console.error('Profile update error:', error.message)
    // Surface the real reason — usually "column ... does not exist" when the
    // 20240106 migration hasn't been run yet.
    return { status: 'error', message: `Could not save profile: ${error.message}` }
  }

  revalidatePath('/merchant/dashboard')
  revalidatePath('/merchant/dashboard/profile')
  return { status: 'success', message: 'Profile updated successfully.' }
}

// ── Create a box ──
export async function createBox(
  _prev: DashboardState,
  formData: FormData
): Promise<DashboardState> {
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) return { status: 'error', message: 'Session expired.' }

  const name          = (formData.get('name') as string).trim()
  const description   = (formData.get('description') as string | null)?.trim() || null
  const price         = parseFloat(formData.get('price') as string)
  const origRaw       = formData.get('original_value') as string
  const original_value = origRaw && origRaw.trim() !== '' ? parseFloat(origRaw) : null
  const quantity      = parseInt(formData.get('quantity') as string, 10)
  const pickup_start  = formData.get('pickup_start') as string
  const pickup_end    = formData.get('pickup_end') as string

  if (!name) return { status: 'error', message: 'Box name is required.' }
  if (isNaN(price) || price <= 0) return { status: 'error', message: 'Enter a valid price.' }
  if (isNaN(quantity) || quantity < 1) return { status: 'error', message: 'Quantity must be at least 1.' }
  if (!pickup_start || !pickup_end) return { status: 'error', message: 'Pickup window is required.' }

  const photo_url      = (formData.get('photo_url') as string | null)?.trim() || null
  const available_days = (formData.getAll('available_days') as string[]).length > 0
    ? (formData.getAll('available_days') as string[])
    : ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
  const tags           = formData.getAll('tags') as string[]
  const allergens      = formData.getAll('allergens') as string[]

  const { error } = await supabase.from('boxes').insert({
    merchant_id: user.id,
    name, description, price, original_value, quantity,
    pickup_start, pickup_end, photo_url, available_days, tags, allergens,
    is_active: true,
  })

  if (error) {
    console.error('Create box error:', error.message)
    return { status: 'error', message: `Could not create box: ${error.message}` }
  }

  redirect('/merchant/dashboard/boxes')
}

// ── Update a box ──
export async function updateBox(
  _prev: DashboardState,
  formData: FormData
): Promise<DashboardState> {
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) return { status: 'error', message: 'Session expired.' }

  const id            = formData.get('id') as string
  const name          = (formData.get('name') as string).trim()
  const description   = (formData.get('description') as string | null)?.trim() || null
  const price         = parseFloat(formData.get('price') as string)
  const origRaw       = formData.get('original_value') as string
  const original_value = origRaw && origRaw.trim() !== '' ? parseFloat(origRaw) : null
  const quantity      = parseInt(formData.get('quantity') as string, 10)
  const pickup_start  = formData.get('pickup_start') as string
  const pickup_end    = formData.get('pickup_end') as string

  if (!name) return { status: 'error', message: 'Box name is required.' }
  if (isNaN(price) || price <= 0) return { status: 'error', message: 'Enter a valid price.' }
  if (isNaN(quantity) || quantity < 1) return { status: 'error', message: 'Quantity must be at least 1.' }

  const photo_url      = (formData.get('photo_url') as string | null)?.trim() || null
  const available_days = (formData.getAll('available_days') as string[]).length > 0
    ? (formData.getAll('available_days') as string[])
    : ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
  const tags           = formData.getAll('tags') as string[]
  const allergens      = formData.getAll('allergens') as string[]

  const { error } = await supabase.from('boxes').update({
    name, description, price, original_value, quantity,
    pickup_start, pickup_end, photo_url, available_days, tags, allergens,
  }).eq('id', id).eq('merchant_id', user.id)

  if (error) {
    console.error('Update box error:', error.message)
    return { status: 'error', message: `Could not update box: ${error.message}` }
  }

  redirect('/merchant/dashboard/boxes')
}

// ── Toggle box active/inactive ──
export async function toggleBox(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  const id        = formData.get('id') as string
  const is_active = formData.get('is_active') === 'true'

  await supabase.from('boxes')
    .update({ is_active: !is_active })
    .eq('id', id)
    .eq('merchant_id', user.id)

  revalidatePath('/merchant/dashboard/boxes')
}

// ── Delete a box ──
export async function deleteBox(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  const id = formData.get('id') as string
  await supabase.from('boxes').delete().eq('id', id).eq('merchant_id', user.id)
  revalidatePath('/merchant/dashboard/boxes')
}

// ── Mark order as picked up ──
export async function markOrderPickedUp(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  const id = formData.get('id') as string
  await supabase
    .from('orders')
    .update({ status: 'picked_up', picked_up_at: new Date().toISOString() })
    .eq('id', id)
    .eq('merchant_id', user.id)

  revalidatePath('/merchant/dashboard/orders')
  revalidatePath('/merchant/dashboard')
}

// ── Cancel order ──
export async function cancelOrder(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  const id = formData.get('id') as string
  await supabase
    .from('orders')
    .update({ status: 'cancelled', cancelled_at: new Date().toISOString() })
    .eq('id', id)
    .eq('merchant_id', user.id)

  revalidatePath('/merchant/dashboard/orders')
  revalidatePath('/merchant/dashboard')
}

// ── Save preferences (currency, region, notifications, store ops) ──
export async function savePreferences(
  _prev: DashboardState,
  formData: FormData
): Promise<DashboardState> {
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) return { status: 'error', message: 'Session expired. Please log in again.' }

  const region   = (formData.get('region') as string) || 'TW'
  const currency = (formData.get('currency') as string) || 'TWD'
  const preferences = {
    timezone: (formData.get('timezone') as string) || 'Asia/Taipei',
    notifications: {
      new_order: formData.get('notif_new_order') === 'true',
      daily:     formData.get('notif_daily') === 'true',
      weekly:    formData.get('notif_weekly') === 'true',
      updates:   formData.get('notif_updates') === 'true',
    },
    accepting_orders: formData.get('accepting_orders') === 'true',
    default_pickup: {
      start: (formData.get('default_pickup_start') as string) || '18:00',
      end:   (formData.get('default_pickup_end') as string) || '20:00',
    },
  }

  const { error } = await supabase
    .from('merchants')
    .update({ region, currency, preferences })
    .eq('id', user.id)

  if (error) {
    console.error('Preferences save error:', error.message)
    return { status: 'error', message: `Could not save preferences: ${error.message}` }
  }

  revalidatePath('/merchant/dashboard')
  revalidatePath('/merchant/dashboard/preferences')
  return { status: 'success', message: 'Preferences saved.' }
}

// ── Sign out ──
export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/merchant/login')
}
