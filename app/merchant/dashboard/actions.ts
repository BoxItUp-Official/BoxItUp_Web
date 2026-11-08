'use server'

import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { RPC_ERRORS, rpcMessage } from './orderRows'

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

// ── Verify a pickup (the customer is at the counter) ──
// Orders change only through the order functions in Postgres; verify_pickup
// checks the code belongs to this store and the order is still live.
export interface VerifyState {
  status: 'idle' | 'error' | 'success'
  message: string
  order?: { box: string; amount: number; payAtPickup: boolean; customer: string | null }
}

export async function verifyPickup(_prev: VerifyState, formData: FormData): Promise<VerifyState> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { status: 'error', message: RPC_ERRORS.not_authenticated }

  const code = ((formData.get('code') as string | null) ?? '').replace(/[^a-z0-9]/gi, '').toUpperCase()
  if (code.length !== 6) return { status: 'error', message: 'A pickup code has 6 letters and numbers.' }

  const { data, error } = await supabase.rpc('verify_pickup', { p_code: code })
  if (error) return { status: 'error', message: rpcMessage(error) }

  revalidatePath('/merchant/dashboard/orders')
  revalidatePath('/merchant/dashboard')
  return {
    status: 'success',
    message: `Order ${code} picked up.`,
    order: {
      box: data.bag_title,
      amount: data.amount,
      payAtPickup: data.payment_method === 'pay_at_pickup',
      customer: data.customer_name,
    },
  }
}

// ── Today: publish a template, change today's quantity, pause or resume ──
export async function publishToday(_prev: DashboardState, formData: FormData): Promise<DashboardState> {
  const supabase = await createClient()
  const boxId = formData.get('box_id') as string
  const quantity = parseInt(formData.get('quantity') as string, 10)
  const { error } = await supabase.rpc('publish_bag', {
    p_box_id: boxId,
    p_quantity: Number.isNaN(quantity) ? null : quantity,
  })
  if (error) return { status: 'error', message: rpcMessage(error) }
  revalidatePath('/merchant/dashboard')
  return { status: 'success', message: 'Live in the app now.' }
}

export async function changeTodayQuantity(_prev: DashboardState, formData: FormData): Promise<DashboardState> {
  const supabase = await createClient()
  const bagId = formData.get('bag_id') as string
  const quantity = parseInt(formData.get('quantity') as string, 10)
  if (Number.isNaN(quantity)) return { status: 'error', message: RPC_ERRORS.invalid_quantity }
  const { error } = await supabase.rpc('update_bag_quantity', { p_bag_id: bagId, p_quantity_total: quantity })
  if (error) return { status: 'error', message: rpcMessage(error) }
  revalidatePath('/merchant/dashboard')
  return { status: 'success', message: 'Quantity updated.' }
}

export async function setTodayActive(formData: FormData) {
  const supabase = await createClient()
  await supabase.rpc('set_bag_active', {
    p_bag_id: formData.get('bag_id') as string,
    p_active: formData.get('active') === 'true',
  })
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

// ── Change password ──
export async function changePassword(
  _prev: DashboardState,
  formData: FormData
): Promise<DashboardState> {
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) return { status: 'error', message: 'Session expired. Please log in again.' }

  const password = (formData.get('new_password') as string) ?? ''
  const confirm  = (formData.get('confirm_password') as string) ?? ''

  if (password.length < 8) return { status: 'error', message: 'Password must be at least 8 characters.' }
  if (password !== confirm) return { status: 'error', message: 'Passwords do not match.' }

  const { error } = await supabase.auth.updateUser({ password })
  if (error) {
    console.error('Password change error:', error.message)
    return { status: 'error', message: error.message }
  }
  return { status: 'success', message: 'Password updated.' }
}

// ── Sign out (this device) ──
export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/merchant/login')
}

// ── Sign out everywhere (all devices/sessions) ──
export async function signOutEverywhere() {
  const supabase = await createClient()
  await supabase.auth.signOut({ scope: 'global' })
  redirect('/merchant/login')
}
