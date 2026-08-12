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
    ],
  },
  {
    heading: '中文',
    options: [
      { label: '繁體中文', code: 'TW', base: '/tw' },
      { label: '简体中文', code: 'CN', base: '/cn' },
    ],
  },
]

/** Sub-pages that exist under every locale prefix — the language switcher can
 *  stay on the same page for these. Anything else falls back to the home page. */
const LOCALIZED_PATHS = ['/careers', '/contact', '/business', '/about', '/impact']

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

/** Path with the locale prefix removed, e.g. /tw/careers → /careers. */
function stripLocale(pathname: string): string {
  return pathname.replace(/^\/(tw|cn)/, '')
}

function buildLocaleUrl(base: string, pathname: string): string {
  const stripped = stripLocale(pathname)
  const match = LOCALIZED_PATHS.find((p) => stripped === p || stripped.startsWith(`${p}/`))
  return match ? `${base}${match}` : base || '/'
}

interface NavbarProps {
  dark?: boolean
}

export default function Navbar({ dark = false }: NavbarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const locale = getLocale(pathname)
  const homeBase = getHomeBase(locale)

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
  // Silver logo only on the dark navbar (careers); every homepage is light now.
  const logoSrc = dark ? '/logo_silv.png' : '/logo_gra.png'

  // Same IA in every locale — the homepages render identical sections, so the
  // anchors are identical too. Contact is a page, not a homepage section.
  const NAV_LABELS = {
    en: { about: 'About', impact: 'Impact', contact: 'Contact', cta: 'Download App' },
    tw: { about: '關於我們', impact: '影響力', contact: '聯絡我們', cta: '下載 App' },
    cn: { about: '关于我们', impact: '影响力', contact: '联系我们', cta: '下载 App' },
  }[locale]

  const navLinks = [
    { href: `${homeBase}#about`, label: NAV_LABELS.about },
    { href: `${homeBase}#impact`, label: NAV_LABELS.impact },
    { href: `${locale === 'en' ? '' : homeBase}/contact`, label: NAV_LABELS.contact },
  ]

  const ctaHref = `${homeBase}#download`
  const ctaLabel = NAV_LABELS.cta

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
          <a href={ctaHref} className="navbar__btn" onClick={closeMenu}>
            {ctaLabel}
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
                 <div 
                  key={group.heading}
                  className={`navbar__lang-column ${
                    group.heading === '中文' ? 'navbar__lang-column--chinese' : ''
                  }`}
                >
                  <p className="navbar__lang-heading">{group.heading}</p>

                  <div className="navbar__lang-options">
                    {group.options.map((opt) => (
                      <button
                        key={opt.code}
                        className={`navbar__lang-option${
                          activeCode === opt.code ? ' is-active' : ''
                        }`}
                        type="button"
                        onClick={() => {
                          closeLangMenu()
                          router.push(buildLocaleUrl(opt.base, pathname))
                        }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
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
