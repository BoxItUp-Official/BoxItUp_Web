'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import Navbar from './Navbar'

export default function NavbarWrapper() {
  const pathname = usePathname()

  // The TW home uses the full-bleed photo theme (.tw-page styles in style.css).
  // Applied to <body> so the navbar (rendered here, outside page content) is themed too.
  useEffect(() => {
    const isTwHome = pathname === '/tw'
    document.body.classList.toggle('tw-page', isTwHome)
    return () => document.body.classList.remove('tw-page')
  }, [pathname])

  // Merchant portal and consumer account area have their own topbars — suppress the main site nav
  if (pathname.startsWith('/merchant')) return null
  if (pathname.startsWith('/account')) return null
  const isDark = /\/(tw\/|cn\/)?careers(\/|$)/.test(pathname)
  return <Navbar dark={isDark} />
}
