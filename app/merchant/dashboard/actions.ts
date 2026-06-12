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

  if (!store_name || !category || !address || !city) {
    return { status: 'error', message: 'Please fill in all required fields.' }
  }
  if (!CATEGORIES.includes(category)) {
    return { status: 'error', message: 'Invalid category.' }
  }

  const { error } = await supabase.from('merchants').update({
    store_name, category, address, city, phone, line_id, description, photo_url,
  }).eq('id', user.id)

  if (error) {
    console.error('Profile update error:', error.message)
    return { status: 'error', message: 'Could not save profile. Please try again.' }
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

  const { error } = await supabase.from('boxes').insert({
    merchant_id: user.id,
    name, description, price, original_value, quantity,
    pickup_start, pickup_end, photo_url, available_days, tags,
    is_active: true,
  })

  if (error) {
    console.error('Create box error:', error.message)
    return { status: 'error', message: 'Could not create box. Please try again.' }
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

  const { error } = await supabase.from('boxes').update({
    name, description, price, original_value, quantity,
    pickup_start, pickup_end, photo_url, available_days, tags,
  }).eq('id', id).eq('merchant_id', user.id)

  if (error) {
    console.error('Update box error:', error.message)
    return { status: 'error', message: 'Could not update box. Please try again.' }
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

// ── Sign out ──
export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/merchant/login')
}
