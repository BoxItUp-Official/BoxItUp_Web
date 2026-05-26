import type { Metadata } from 'next'
import '../style.css'
import './globals.css'
import NavbarWrapper from '@/components/NavbarWrapper'
import ScrollAnimations from '@/components/ScrollAnimations'

export const metadata: Metadata = {
  title: 'Box It Up | Spend Less. Experience More.',
  description:
    'Box It Up — Connect with discounted surprise food boxes to reduce food waste and increase store exposure.',
  icons: { icon: '/logo_icon_or.png' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <NavbarWrapper />
        {children}
        <ScrollAnimations />
      </body>
    </html>
  )
}
