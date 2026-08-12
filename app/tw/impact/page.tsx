import type { Metadata } from 'next'
import ComingSoon from '@/components/ComingSoon'

export const metadata: Metadata = {
  title: '影響力 | Box It Up',
  description: '我們的使命、願景，以及拯救剩餘食物帶來的環境與社區影響。',
  icons: { icon: '/logo_icon_gradiant.png' },
}

export default function TwImpactPage() {
  return (
    <ComingSoon
      badge="即將推出"
      eyebrow="影響力"
      title="影響力儀表板即將上線"
      body="我們正在打造即時儀表板，呈現拯救的箱數、減少的 CO₂e 與支持的店家。正式上線後就會有真實數據。"
      backHref="/tw#impact"
      backLabel="回首頁看摘要"
    />
  )
}
