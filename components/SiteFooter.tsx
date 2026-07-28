import Link from 'next/link'

/**
 * Site-wide footer (new IA).
 * Columns: Brand | Company | Platform | Resources | Contact
 *
 * TODO(content): fill in Threads / LinkedIn URLs, phone and address when
 * available — empty strings hide the item automatically.
 */

const SOCIALS = [
  {
    label: 'Instagram',
    url: 'https://www.instagram.com/boxitup.store',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'Threads',
    url: '', // TODO: add Threads profile URL
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6.5 2 3 6 3 12s3.5 10 9 10 9-4 9-10c0-1.5-.2-2.9-.7-4.1" />
        <path d="M12 13c2.5-.5 5-.2 5 2 0 1.8-1.8 3-4 3-2.5 0-4-1.5-4-4 0-3.5 2-6 5-6 1.8 0 3.2.8 4 2" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    url: '', // TODO: add LinkedIn company URL
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
]

type Locale = 'en' | 'tw' | 'cn'

const COPY: Record<Locale, Record<string, string>> = {
  en: {
    tagline: 'Every delicious meal deserves to be enjoyed.',
    company: 'Company', companyPrompt: 'Get to know us',
    about: 'About Us', impact: 'Impact', join: 'Join Us',
    platform: 'Platform', platformPrompt: 'Start using Box It Up',
    download: 'Download App', stores: 'For Stores',
    resources: 'Resources', resourcesPrompt: 'Still have questions?',
    faq: 'FAQ', support: 'Support', privacy: 'Privacy Policy', terms: 'Terms of Service',
    contact: 'Contact', contactPrompt: 'Reach out to us',
    rights: 'All rights reserved.', cookie: 'Cookie Policy',
  },
  tw: {
    tagline: '每一份美味，都有被享用的機會。',
    company: '公司', companyPrompt: '我想了解你們',
    about: '關於我們', impact: '社會影響力', join: '加入我們',
    platform: '平台', platformPrompt: '我想開始使用',
    download: '下載 App', stores: '商家專區',
    resources: '資源', resourcesPrompt: '我還有問題',
    faq: '常見問題', support: '支援', privacy: '隱私權政策', terms: '服務條款',
    contact: '聯絡我們', contactPrompt: '我想聯絡你們',
    rights: '版權所有。', cookie: 'Cookie 政策',
  },
  cn: {
    tagline: '每一份美味，都有被享用的机会。',
    company: '公司', companyPrompt: '我想了解你们',
    about: '关于我们', impact: '社会影响力', join: '加入我们',
    platform: '平台', platformPrompt: '我想开始使用',
    download: '下载 App', stores: '商家专区',
    resources: '资源', resourcesPrompt: '我还有问题',
    faq: '常见问题', support: '支持', privacy: '隐私政策', terms: '服务条款',
    contact: '联系我们', contactPrompt: '我想联系你们',
    rights: '版权所有。', cookie: 'Cookie 政策',
  },
}

const CONTACT_EMAIL = 'boxitupofficial@gmail.com'
const CONTACT_PHONE = '' // TODO: add phone when available
const CONTACT_ADDRESS = '' // TODO: add address when available

export default function SiteFooter({ locale = 'en' }: { locale?: Locale }) {
  const t = COPY[locale]
  const base = locale === 'en' ? '' : `/${locale}`
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top footer__top--wide">
          {/* ── Brand ── */}
          <div className="footer__brand">
            <a href="/" className="footer__logo">
              <img src="/logo_icon_gradiant.png" alt="Box It Up Logo" className="footer__logo-img" />
            </a>
            <p className="footer__tagline">{t.tagline}</p>
            <div className="footer__socials">
              {SOCIALS.filter((s) => s.url).map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  className="footer__social"
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* ── Company — “我想了解你們” ── */}
          <div className="footer__links-group">
            <h4 className="footer__links-title">{t.company}</h4>
            <p className="footer__links-prompt">{t.companyPrompt}</p>
            <ul className="footer__links">
              <li><Link href={`${base}/about`}>{t.about}</Link></li>
              <li><Link href={`${base}/impact`}>{t.impact}</Link></li>
              <li><Link href={`${base}/contact`}>{t.join}</Link></li>
            </ul>
          </div>

          {/* ── Platform — “我想開始使用” ── */}
          <div className="footer__links-group">
            <h4 className="footer__links-title">{t.platform}</h4>
            <p className="footer__links-prompt">{t.platformPrompt}</p>
            <ul className="footer__links">
              <li><a href={`${base}/#download`}>{t.download}</a></li>
              {/* Merchant sign-up isn't public yet — route stores to early access. */}
              <li><Link href="/business">{t.stores}</Link></li>
            </ul>
          </div>

          {/* ── Resources — “我還有問題” ── */}
          <div className="footer__links-group">
            <h4 className="footer__links-title">{t.resources}</h4>
            <p className="footer__links-prompt">{t.resourcesPrompt}</p>
            <ul className="footer__links">
              {/* TODO: point to /faq and /support once those pages are built */}
              <li><a href={`${base}/#faq`}>{t.faq}</a></li>
              <li><Link href={`${base}/contact`}>{t.support}</Link></li>
              <li><Link href="/privacy">{t.privacy}</Link></li>
              <li><Link href="/terms">{t.terms}</Link></li>
            </ul>
          </div>

          {/* ── Contact — “我想聯絡你們” ── */}
          <div className="footer__links-group">
            <h4 className="footer__links-title">{t.contact}</h4>
            <p className="footer__links-prompt">{t.contactPrompt}</p>
            <ul className="footer__links footer__links--contact">
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </li>
              {CONTACT_PHONE && (
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.02 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
                  </svg>
                  {CONTACT_PHONE}
                </li>
              )}
              {CONTACT_ADDRESS && (
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {CONTACT_ADDRESS}
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">© 2026 Box It Up. {t.rights}</p>
          <div className="footer__legal">
            <Link href="/privacy">{t.privacy}</Link>
            <Link href="/terms">{t.terms}</Link>
            <Link href="/cookie">{t.cookie}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
