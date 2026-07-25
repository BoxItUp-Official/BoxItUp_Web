'use server'

import { createClient } from '@/lib/supabase-server'

export interface BusinessLeadState {
  status: 'idle' | 'success' | 'error'
  message: string
}

export async function submitBusinessLead(
  _prev: BusinessLeadState,
  formData: FormData
): Promise<BusinessLeadState> {
  const store_name = (formData.get('store_name') as string)?.trim()
  const contact_name = (formData.get('contact_name') as string)?.trim()
  const email = (formData.get('email') as string)?.trim()
  const phone = (formData.get('phone') as string)?.trim() || null
  const city = (formData.get('city') as string)?.trim() || null
  const category = (formData.get('category') as string)?.trim() || null
  const notes = (formData.get('notes') as string)?.trim() || null

  if (!store_name || !contact_name || !email) {
    return { status: 'error', message: 'Please fill in all required fields.' }
  }

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRe.test(email)) {
    return { status: 'error', message: 'Please enter a valid email address.' }
  }

  const supabase = await createClient()
  const { error } = await supabase
    .from('business_leads')
    .insert({ store_name, contact_name, email, phone, city, category, notes })

  if (error) {
    console.error('Business lead insert error:', error.message)
    return { status: 'error', message: 'Something went wrong. Please try again.' }
  }

  return {
    status: 'success',
    message: "You're on the list! We'll be in touch as soon as we open to partner stores.",
  }
}
