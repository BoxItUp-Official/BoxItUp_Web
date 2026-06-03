'use client'

import { usePathname } from 'next/navigation'
import Navbar from './Navbar'

export default function NavbarWrapper() {
  const pathname = usePathname()
  const isDark = /\/(tw\/|cn\/)?careers(\/|$)/.test(pathname)
  return <Navbar dark={isDark} />
}
