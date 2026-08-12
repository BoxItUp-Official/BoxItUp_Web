import type { Metadata } from 'next'
import HomeSections from '@/components/HomeSections'

export const metadata: Metadata = {
  title: 'Box It Up | 花得更少，體驗更多。',
  description:
    'Box It Up — 用優惠價格購買在地店家的驚喜箱，減少食物浪費，也讓好店被更多人看見。',
  icons: { icon: '/logo_icon_gradiant.png' },
}

export default function TwHomePage() {
  return <HomeSections locale="tw" />
}
