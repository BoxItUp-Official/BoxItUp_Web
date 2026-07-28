'use client'

import { usePathname } from 'next/navigation'
import SiteFooter from './SiteFooter'

/**
 * Mounts the site footer on every public page.
 *
 * Suppressed on:
 *  - /merchant and /account — those have their own chrome
 *  - /tw and /cn — their homepages still carry the legacy inline footer until
 *    they're ported to the new IA
 */
export default function SiteFooterWrapper() {
  const pathname = usePathname()

  if (
    pathname.startsWith('/merchant') ||
    pathname.startsWith('/account') ||
    pathname === '/tw' ||
    pathname === '/cn'
  ) {
    return null
  }

  return <SiteFooter />
}
