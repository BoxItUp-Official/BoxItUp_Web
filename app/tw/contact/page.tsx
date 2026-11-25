import type { Metadata } from 'next'
import ContactPageBody from '@/app/contact/ContactPageBody'
import { CONTACT_CONTENT } from '@/app/contact/contactContent'

export const metadata: Metadata = {
  title: CONTACT_CONTENT.tw.metaTitle,
  description: CONTACT_CONTENT.tw.metaDescription,
  icons: { icon: '/logo_icon_gradiant.png' },
}

export default function TwContactPage() {
  return <ContactPageBody locale="tw" />
}
