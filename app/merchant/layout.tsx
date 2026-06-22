import type { Metadata } from 'next'
import './merchant.css'
import MerchantTopbar from './MerchantTopbar'

export const metadata: Metadata = {
  title: 'Box It Up | Merchant Portal',
  description: 'Onboard your store to Box It Up and start reaching new customers.',
  icons: { icon: '/logo_icon.png' },
}

export default function MerchantLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="merchant-shell">
      <MerchantTopbar />
      {children}
    </div>
  )
}
