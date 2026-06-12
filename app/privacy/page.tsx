import type { Metadata } from 'next'
import Link from 'next/link'
import '@/app/legal.css'

export const metadata: Metadata = {
  title: 'Privacy Policy | Box It Up',
  description: 'How Box It Up collects, uses, and protects your personal data.',
  icons: { icon: '/logo_icon.png' },
}

export default function PrivacyPage() {
  return (
    <section className="legal-page section">
      <div className="container">
        <div className="legal-page__header">
          <div className="legal-page__eyebrow">Legal</div>
          <h1 className="legal-page__title">Privacy Policy</h1>
          <p className="legal-page__meta">Last updated: June 2026</p>
        </div>

        <nav className="legal-nav" aria-label="Legal pages">
          <a href="/privacy" className="active">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
          <a href="/cookie">Cookie Policy</a>
        </nav>

        <div className="legal-body">
          <h2>1. Who We Are</h2>
          <p>
            Box It Up (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is a food-waste
            reduction marketplace that connects consumers with discounted surplus food boxes from
            local stores. We are based in Taiwan. This Privacy Policy explains how we collect, use,
            and protect your personal data when you use our website, mobile application, or merchant
            portal (collectively, the &ldquo;Services&rdquo;).
          </p>
          <p>
            By using our Services, you agree to the collection and use of information in accordance
            with this policy. If you have questions, contact us at{' '}
            <a href="mailto:boxitupofficial@gmail.com">boxitupofficial@gmail.com</a>.
          </p>

          <h2>2. Information We Collect</h2>
          <p>We collect the following types of information:</p>
          <ul>
            <li>
              <strong>Account information:</strong> Name, email address, and password when you
              create an account.
            </li>
            <li>
              <strong>Merchant information:</strong> Store name, address, phone number, LINE ID,
              category, and store description provided during onboarding.
            </li>
            <li>
              <strong>Usage data:</strong> Pages visited, features used, and interactions with the
              platform (collected via server logs and analytics).
            </li>
            <li>
              <strong>Communications:</strong> Messages submitted through our contact form,
              including your name, email, and message content.
            </li>
            <li>
              <strong>Device data:</strong> Browser type, IP address, and device identifiers
              collected automatically when you access our Services.
            </li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Create and manage your account and provide our Services.</li>
            <li>Display merchant listings and facilitate customer discovery.</li>
            <li>Send transactional emails (account verification, order confirmations).</li>
            <li>Respond to contact form submissions and support requests.</li>
            <li>Improve our platform through analytics and usage monitoring.</li>
            <li>Comply with legal obligations.</li>
          </ul>
          <p>We do not sell your personal data to third parties.</p>

          <h2>4. Data Storage and Security</h2>
          <p>
            Your data is stored on Supabase, a cloud database platform with servers located in
            Singapore. We implement industry-standard security measures including encrypted
            connections (HTTPS), hashed passwords, and row-level security policies to restrict data
            access.
          </p>
          <p>
            While we take all reasonable steps to protect your data, no method of transmission over
            the Internet is 100% secure. We cannot guarantee absolute security.
          </p>

          <h2>5. Cookies and Tracking</h2>
          <p>
            We use cookies and similar technologies to maintain your session and improve your
            experience. For full details, see our{' '}
            <Link href="/cookie">Cookie Policy</Link>.
          </p>

          <h2>6. Third-Party Services</h2>
          <p>
            Our Services may use the following third-party services, each subject to their own
            privacy policy:
          </p>
          <ul>
            <li>
              <strong>Supabase</strong> — database and authentication
            </li>
            <li>
              <strong>Vercel</strong> — hosting and edge delivery
            </li>
            <li>
              <strong>LINE</strong> — optional merchant login via LINE Login
            </li>
          </ul>

          <h2>7. Your Rights</h2>
          <p>
            Depending on your jurisdiction, you may have the right to access, correct, or delete
            your personal data. To exercise any of these rights, contact us at{' '}
            <a href="mailto:boxitupofficial@gmail.com">boxitupofficial@gmail.com</a>. We will
            respond within 30 days.
          </p>

          <h2>8. Data Retention</h2>
          <p>
            We retain your personal data for as long as your account is active or as needed to
            provide our Services. If you delete your account, we will delete or anonymise your
            personal data within 90 days, unless we are required to retain it by law.
          </p>

          <h2>9. Children&apos;s Privacy</h2>
          <p>
            Our Services are not directed to children under the age of 13. We do not knowingly
            collect personal data from children. If you believe we have inadvertently collected data
            from a child, please contact us immediately.
          </p>

          <h2>10. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of significant
            changes by posting a notice on our website or sending an email. Continued use of our
            Services after changes constitutes acceptance of the updated policy.
          </p>

          <h2>11. Contact</h2>
          <p>
            Questions or concerns about this Privacy Policy? Reach us at:{' '}
            <a href="mailto:boxitupofficial@gmail.com">boxitupofficial@gmail.com</a>
          </p>
        </div>
      </div>
    </section>
  )
}
