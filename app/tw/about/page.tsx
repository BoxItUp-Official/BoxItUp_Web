import type { Metadata } from 'next'
import ComingSoon from '@/components/ComingSoon'

export const metadata: Metadata = {
  title: '關於我們 | Box It Up',
  description: '我們是誰、為什麼創立 Box It Up，以及我們如何在台灣拯救好食物。',
  icons: { icon: '/logo_icon_gradiant.png' },
}

export default function TwAboutPage() {
  return (
    <ComingSoon
      badge="即將推出"
      eyebrow="關於公司"
      title="完整的故事即將登場"
      body="我們正在整理公司介紹、品牌故事與團隊頁面。在那之前，最重要的內容都在首頁。"
      backHref="/tw#about"
      backLabel="回首頁看我們的故事"
    />
  )
}
