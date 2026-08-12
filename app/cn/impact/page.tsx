import type { Metadata } from 'next'
import ComingSoon from '@/components/ComingSoon'

export const metadata: Metadata = {
  title: '影响力 | Box It Up',
  description: '我们的使命、愿景，以及拯救剩余食物带来的环境与社区影响。',
  icons: { icon: '/logo_icon_gradiant.png' },
}

export default function CnImpactPage() {
  return (
    <ComingSoon
      badge="即将推出"
      eyebrow="影响力"
      title="影响力仪表板即将上线"
      body="我们正在打造实时仪表板，呈现拯救的箱数、减少的 CO₂e 与支持的商家。正式上线后就会有真实数据。"
      backHref="/cn#impact"
      backLabel="回首页看摘要"
    />
  )
}
