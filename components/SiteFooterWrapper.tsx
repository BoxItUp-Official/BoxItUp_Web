'use client'

import { usePathname } from 'next/navigation'
import SiteFooter from './SiteFooter'

/**
 * Mounts the site footer on every public page.
 * Suppressed on /merchant and /account — those have their own chrome.
 */
export default function SiteFooterWrapper() {
  const pathname = usePathname()

  if (pathname.startsWith('/merchant') || pathname.startsWith('/account')) {
    return null
  }

  const locale = pathname.startsWith('/tw') ? 'tw' : pathname.startsWith('/cn') ? 'cn' : 'en'
  return <SiteFooter locale={locale} />
}
