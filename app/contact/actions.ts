'use server'

import { createClient } from '@/lib/supabase-server'

export interface ContactFormState {
  status: 'idle' | 'success' | 'error'
  message: string
}

export async function submitContact(
  _prev: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = (formData.get('name') as string)?.trim()
  const email = (formData.get('email') as string)?.trim()
  const inquiry_type = (formData.get('inquiry-type') as string)?.trim()
  const organization = (formData.get('organization') as string)?.trim() || null
  const message = (formData.get('message') as string)?.trim()

  if (!name || !email || !inquiry_type || !message) {
    return { status: 'error', message: 'Please fill in all required fields.' }
  }

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRe.test(email)) {
    return { status: 'error', message: 'Please enter a valid email address.' }
  }

  const supabase = await createClient()
  const { error } = await supabase
    .from('contact_submissions')
    .insert({ name, email, inquiry_type, organization, message })

  if (error) {
    console.error('Supabase insert error:', error.message)
    return { status: 'error', message: 'Something went wrong. Please try again.' }
  }

  return { status: 'success', message: "Message sent! We'll be in touch soon." }
}
