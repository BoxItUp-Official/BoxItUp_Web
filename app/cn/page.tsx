import type { Metadata } from 'next'
import HomeSections from '@/components/HomeSections'

export const metadata: Metadata = {
  title: 'Box It Up | 花得更少，体验更多。',
  description:
    'Box It Up — 用优惠价格购买本地商家的惊喜箱，减少食物浪费，也让好店被更多人看见。',
  icons: { icon: '/logo_icon_gradiant.png' },
}

export default function CnHomePage() {
  return <HomeSections locale="cn" />
}
