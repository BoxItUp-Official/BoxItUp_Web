import type { Metadata } from 'next'
import '../style.css'
import './globals.css'
import NavbarWrapper from '@/components/NavbarWrapper'
import SiteFooterWrapper from '@/components/SiteFooterWrapper'
import ScrollAnimations from '@/components/ScrollAnimations'

export const metadata: Metadata = {
  title: 'Box It Up | Spend Less. Experience More.',
  description:
    'Box It Up — Connect with discounted surprise food boxes to reduce food waste and increase store exposure.',
  icons: { icon: '/logo_icon_gradiant.png' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <NavbarWrapper />
        {children}
        <SiteFooterWrapper />
        <ScrollAnimations />
      </body>
    </html>
  )
}
