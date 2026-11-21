'use client'

import { usePathname } from 'next/navigation'
import Navbar from './Navbar'

/**
 * Note: this component used to toggle a `tw-page` class on <body> from a
 * useEffect so /tw could pick up the legacy full-bleed photo theme in
 * style.css. Because effects only run after hydration, the first paint was
 * unthemed and the page visibly re-laid-out — the "flash" on refresh.
 * /tw now renders the same components as /, so the class (and the flash) is
 * gone. Don't reintroduce per-page body classes from an effect.
 */
export default function NavbarWrapper() {
  const pathname = usePathname()

  // Merchant portal has its own topbar — suppress the main site nav
  if (pathname.startsWith('/merchant')) return null
  // Every public page is on the paper style now, careers included, so none uses the dark navbar.
  return <Navbar dark={false} />
}
