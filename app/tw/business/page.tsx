import type { Metadata } from 'next'
import BusinessPageBody from '@/app/business/BusinessPageBody'
import { BUSINESS_CONTENT } from '@/app/business/businessContent'

export const metadata: Metadata = {
  title: BUSINESS_CONTENT.tw.metaTitle,
  description: BUSINESS_CONTENT.tw.metaDescription,
  icons: { icon: '/logo_icon_gradiant.png' },
}

export default function TwBusinessPage() {
  return <BusinessPageBody locale="tw" />
}
