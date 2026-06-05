import type { Metadata } from 'next'
import './merchant.css'

export const metadata: Metadata = {
  title: 'Box It Up | Merchant Portal',
  description: 'Onboard your store to Box It Up and start reaching new customers.',
  icons: { icon: '/logo_icon.png' },
}

export default function MerchantLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="merchant-shell">
      <header className="merchant-topbar">
        <a href="/">
          <img src="/logo_or.png" alt="Box It Up" className="merchant-topbar__logo" />
        </a>
        <a href="/" className="merchant-topbar__link">← Back to site</a>
      </header>
      {children}
    </div>
  )
}
