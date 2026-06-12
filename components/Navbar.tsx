'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

interface LangOption {
  label: string
  code: string
  base: string
}

interface LangGroup {
  heading: string
  options: LangOption[]
}

const langGroups: LangGroup[] = [
  {
    heading: 'English',
    options: [
      { label: 'United States', code: 'EN', base: '' },
      { label: 'United Kingdom', code: 'GB', base: '' },
      { label: 'Australia', code: 'AU', base: '' },
    ],
  },
  {
    heading: '中文',
    options: [
      { label: '繁體中文', code: 'TW', base: '/tw' },
      { label: '简体中文', code: 'CN', base: '/cn' },
    ],
  },
  {
    heading: '日本語',
    options: [{ label: '日本', code: 'JP', base: '' }],
  },
  {
    heading: 'More',
    options: [
      { label: 'Français', code: 'FR', base: '' },
      { label: 'Deutsch', code: 'DE', base: '' },
      { label: 'Italiano', code: 'IT', base: '' },
    ],
  },
]

type PageType = 'home' | 'careers' | 'contact'

function getLocale(pathname: string) {
  if (pathname.startsWith('/tw')) return 'tw'
  if (pathname.startsWith('/cn')) return 'cn'
  return 'en'
}

function getHomeBase(locale: string) {
  if (locale === 'tw') return '/tw'
  if (locale === 'cn') return '/cn'
  return '/'
}

function getPageType(pathname: string): PageType {
  const stripped = pathname.replace(/^\/(tw|cn)/, '')
  if (stripped === '/careers' || stripped.startsWith('/careers/')) return 'careers'
  if (stripped === '/contact' || stripped.startsWith('/contact/')) return 'contact'
  return 'home'
}

function buildLocaleUrl(base: string, pageType: PageType): string {
  if (pageType === 'careers') return `${base}/careers`
  if (pageType === 'contact') return `${base}/contact`
  return base || '/'
}

interface NavbarProps {
  dark?: boolean
}

export default function Navbar({ dark = false }: NavbarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const locale = getLocale(pathname)
  const homeBase = getHomeBase(locale)
  const pageType = getPageType(pathname)

  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const langDropdownRef = useRef<HTMLDivElement>(null)
  const navbarRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMenu = useCallback(() => {
    setMenuOpen(false)
  }, [])

  const closeLangMenu = useCallback(() => {
    setLangOpen(false)
  }, [])

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (menuOpen && navbarRef.current && !navbarRef.current.contains(e.target as Node)) {
        closeMenu()
      }
      if (langOpen && langDropdownRef.current && !langDropdownRef.current.contains(e.target as Node)) {
        closeLangMenu()
      }
    }
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMenu()
        closeLangMenu()
      }
    }
    document.addEventListener('click', handleOutsideClick)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('click', handleOutsideClick)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [menuOpen, langOpen, closeMenu, closeLangMenu])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  useEffect(() => {
    if (langOpen) {
      document.body.classList.add('lang-menu-open')
    } else {
      document.body.classList.remove('lang-menu-open')
    }
  }, [langOpen])

  const activeCode = locale === 'tw' ? 'TW' : locale === 'cn' ? 'CN' : 'EN'
  const logoSrc = dark ? '/logo_w.png' : '/logo_or.png'

  const navLinks =
    locale === 'tw'
      ? [
          { href: `${homeBase}#about`, label: '關於我們' },
          { href: `${homeBase}#how-it-works`, label: '運作方式' },
          { href: `${homeBase}#contact`, label: '聯絡我們' },
        ]
      : locale === 'cn'
      ? [
          { href: `${homeBase}#about`, label: '关于我们' },
          { href: `${homeBase}#how-it-works`, label: '运作方式' },
          { href: `${homeBase}#contact`, label: '联系我们' },
        ]
      : [
          { href: `${homeBase}#about`, label: 'About' },
          { href: `${homeBase}#how-it-works`, label: 'How It Works' },
          { href: '/careers', label: 'Careers' },
          { href: `${homeBase}#contact`, label: 'Contact' },
        ]

  const signUpLabel =
    locale === 'tw' ? '立即註冊' : locale === 'cn' ? '立即注册' : 'Sign Up'

  return (
    <header
      ref={navbarRef}
      id="navbar"
      className={`navbar${scrolled ? ' scrolled' : ''}${dark ? ' navbar--dark' : ''}`}
    >
      <div className="navbar__inner container">
        <Link href={homeBase || '/'} className="navbar__logo">
          <img src={logoSrc} alt="Box It Up Logo" className="navbar__logo-img" id="navbarLogo" />
        </Link>

        <nav className={`navbar__nav${menuOpen ? ' open' : ''}`} id="navMenu">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="navbar__link" onClick={closeMenu}>
              {link.label}
            </a>
          ))}
          <a href={`${homeBase}#signup`} className="navbar__btn" onClick={closeMenu}>
            {signUpLabel}
          </a>

          <div className={`navbar__lang${langOpen ? ' open' : ''}`} id="langDropdown" ref={langDropdownRef}>
            <button
              className="navbar__lang-toggle"
              id="langToggle"
              type="button"
              aria-label="Change language"
              aria-expanded={langOpen}
              aria-haspopup="true"
              onClick={(e) => { e.stopPropagation(); setLangOpen((v) => !v) }}
            >
              <span className="navbar__lang-text">{activeCode}</span>
            </button>

            <div className="navbar__lang-menu" id="langMenu">
              <div className="navbar__lang-panel">
                {langGroups.map((group) => (
                  <div key={group.heading} className="navbar__lang-column">
                    <p className="navbar__lang-heading">{group.heading}</p>
                    {group.options.map((opt) => (
                      <button
                        key={opt.code}
                        className={`navbar__lang-option${activeCode === opt.code ? ' is-active' : ''}`}
                        type="button"
                        data-lang={opt.code.toLowerCase()}
                        data-label={opt.code}
                        onClick={() => {
                          closeLangMenu()
                          router.push(buildLocaleUrl(opt.base, pageType))
                        }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </nav>

        <button
          className={`navbar__hamburger${menuOpen ? ' open' : ''}`}
          id="hamburger"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}
