import type { Metadata } from 'next'
import BusinessPageBody from './BusinessPageBody'
import { BUSINESS_CONTENT } from './businessContent'

export const metadata: Metadata = {
  title: BUSINESS_CONTENT.en.metaTitle,
  description: BUSINESS_CONTENT.en.metaDescription,
  icons: { icon: '/logo_icon_gradiant.png' },
}

export default function BusinessPage() {
  return <BusinessPageBody locale="en" />
}
