'use client'

import { usePathname } from 'next/navigation'

export default function MerchantTopbar() {
  const pathname = usePathname()

  // The dashboard has its own self-contained sidebar chrome — no topbar there.
  if (pathname.startsWith('/merchant/dashboard')) return null

  return (
    <header className="merchant-topbar">
      <a href="/" className="merchant-topbar__brand">
        <img src="/logo_or.png" alt="Box It Up" className="merchant-topbar__logo" />
      </a>
      <a href="/" className="merchant-topbar__link">← Back to site</a>
    </header>
  )
}
