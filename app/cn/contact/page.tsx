import type { Metadata } from 'next'
import ContactPageBody from '@/app/contact/ContactPageBody'
import { CONTACT_CONTENT } from '@/app/contact/contactContent'

export const metadata: Metadata = {
  title: CONTACT_CONTENT.cn.metaTitle,
  description: CONTACT_CONTENT.cn.metaDescription,
  icons: { icon: '/logo_icon_gradiant.png' },
}

export default function CnContactPage() {
  return <ContactPageBody locale="cn" />
}
