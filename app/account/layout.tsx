import type { Metadata } from 'next'
import './account.css'
import ConsumerTopbar from './ConsumerTopbar'

export const metadata: Metadata = {
  title: 'Box It Up | My Account',
  description: 'Sign in to reserve surprise boxes and track your orders.',
  icons: { icon: '/logo_icon.png' },
}

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="account-shell">
      <ConsumerTopbar />
      {children}
    </div>
  )
}
