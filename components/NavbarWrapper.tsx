'use client'

import { usePathname } from 'next/navigation'
import Navbar from './Navbar'

export default function NavbarWrapper() {
  const pathname = usePathname()
  const isDark = pathname === '/careers'
  return <Navbar dark={isDark} />
}
