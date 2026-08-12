import type { Metadata } from 'next'
import ComingSoon from '@/components/ComingSoon'

export const metadata: Metadata = {
  title: '关于我们 | Box It Up',
  description: '我们是谁、为什么创立 Box It Up，以及我们如何拯救好食物。',
  icons: { icon: '/logo_icon_gradiant.png' },
}

export default function CnAboutPage() {
  return (
    <ComingSoon
      badge="即将推出"
      eyebrow="关于公司"
      title="完整的故事即将登场"
      body="我们正在整理公司介绍、品牌故事与团队页面。在那之前，最重要的内容都在首页。"
      backHref="/cn#about"
      backLabel="回首页看我们的故事"
    />
  )
}
