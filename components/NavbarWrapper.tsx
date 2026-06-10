'use client'

import { usePathname } from 'next/navigation'
import Navbar from './Navbar'

export default function NavbarWrapper() {
  const pathname = usePathname()
  // Merchant portal has its own topbar — suppress the main site nav
  if (pathname.startsWith('/merchant')) return null
  const isDark = /\/(tw\/|cn\/)?careers(\/|$)/.test(pathname)
  return <Navbar dark={isDark} />
}
