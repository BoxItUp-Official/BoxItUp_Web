'use client'

import { usePathname } from 'next/navigation'

export default function ConsumerTopbar() {
  const pathname = usePathname()

  // The dashboard (Phase 3) will have its own self-contained chrome — no topbar there.
  if (pathname.startsWith('/account/dashboard')) return null

  return (
    <header className="account-topbar">
      <a href="/" className="account-topbar__brand">
        <img src="/logo_or.png" alt="Box It Up" className="account-topbar__logo" />
      </a>
      <a href="/boxes" className="account-topbar__link">← Browse boxes</a>
    </header>
  )
}
