import type { Metadata } from 'next'
import Link from 'next/link'
import '@/app/legal.css'

export const metadata: Metadata = {
  title: 'Cookie Policy | Box It Up',
  description: 'How Box It Up uses cookies and similar tracking technologies.',
  icons: { icon: '/logo_icon.png' },
}

export default function CookiePage() {
  return (
    <section className="legal-page section">
      <div className="container">
        <div className="legal-page__header">
          <div className="legal-page__eyebrow">Legal</div>
          <h1 className="legal-page__title">Cookie Policy</h1>
          <p className="legal-page__meta">Last updated: June 2026</p>
        </div>

        <nav className="legal-nav" aria-label="Legal pages">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
          <a href="/cookie" className="active">Cookie Policy</a>
        </nav>

        <div className="legal-body">
          <h2>1. What Are Cookies</h2>
          <p>
            Cookies are small text files placed on your device when you visit a website. They are
            widely used to make websites work more efficiently, remember your preferences, and
            provide information to website owners. Similar technologies include local storage,
            session storage, and authentication tokens.
          </p>

          <h2>2. How We Use Cookies</h2>
          <p>Box It Up uses cookies and similar technologies for the following purposes:</p>

          <h2>Strictly Necessary</h2>
          <p>
            These are essential for the Platform to function. Without them, you cannot log in, stay
            logged in, or access protected pages. They cannot be disabled.
          </p>
          <ul>
            <li>
              <strong>Session cookies:</strong> Maintain your authentication state while you browse
              the Platform.
            </li>
            <li>
              <strong>CSRF tokens:</strong> Protect form submissions from cross-site request
              forgery attacks.
            </li>
            <li>
              <strong>Supabase auth tokens:</strong> Stored in browser cookies to keep you securely
              logged in across page loads.
            </li>
          </ul>

          <h2>Functional</h2>
          <p>
            These cookies remember your preferences to improve your experience. You can opt out, but
            some features may not work as expected.
          </p>
          <ul>
            <li>
              <strong>Language preference:</strong> Remembers whether you&apos;re browsing in
              English, Traditional Chinese, or Simplified Chinese.
            </li>
          </ul>

          <h2>Analytics</h2>
          <p>
            We may use anonymised analytics data to understand how users navigate the Platform and
            where we can improve. This data does not identify individuals.
          </p>
          <ul>
            <li>
              <strong>Page view tracking:</strong> Which pages are visited and how long users spend
              on them.
            </li>
          </ul>
          <p>
            At this stage of development, Box It Up does not use third-party advertising or tracking
            cookies (e.g. Google Ads, Meta Pixel).
          </p>

          <h2>3. Cookie Duration</h2>
          <ul>
            <li>
              <strong>Session cookies:</strong> Deleted when you close your browser.
            </li>
            <li>
              <strong>Persistent cookies (auth):</strong> Expire after 7 days or when you log out,
              whichever comes first.
            </li>
          </ul>

          <h2>4. Managing Cookies</h2>
          <p>
            You can control cookies through your browser settings. Most browsers allow you to view,
            block, or delete cookies. Note that blocking strictly necessary cookies will prevent you
            from logging in.
          </p>
          <p>
            Useful links for managing cookies in common browsers:
          </p>
          <ul>
            <li>
              <a
                href="https://support.google.com/chrome/answer/95647"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Chrome
              </a>
            </li>
            <li>
              <a
                href="https://support.apple.com/guide/safari/manage-cookies-sfri11471"
                target="_blank"
                rel="noopener noreferrer"
              >
                Apple Safari
              </a>
            </li>
            <li>
              <a
                href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer"
                target="_blank"
                rel="noopener noreferrer"
              >
                Mozilla Firefox
              </a>
            </li>
          </ul>

          <h2>5. Changes to This Policy</h2>
          <p>
            We may update this Cookie Policy as our technology or legal obligations change. We will
            post the updated policy on this page with a revised &ldquo;Last updated&rdquo; date.
          </p>

          <h2>6. Contact</h2>
          <p>
            Questions about our use of cookies? Contact us at{' '}
            <a href="mailto:boxitupofficial@gmail.com">boxitupofficial@gmail.com</a> or visit our{' '}
            <Link href="/contact">contact page</Link>.
          </p>
        </div>
      </div>
    </section>
  )
}
