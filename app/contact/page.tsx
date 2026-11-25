import type { Metadata } from 'next'
import ContactPageBody from './ContactPageBody'
import { CONTACT_CONTENT } from './contactContent'

export const metadata: Metadata = {
  title: CONTACT_CONTENT.en.metaTitle,
  description: CONTACT_CONTENT.en.metaDescription,
  icons: { icon: '/logo_icon_gradiant.png' },
}

export default function ContactPage() {
  return <ContactPageBody locale="en" />
}
