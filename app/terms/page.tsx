import type { Metadata } from 'next'
import Link from 'next/link'
import '@/app/legal.css'

export const metadata: Metadata = {
  title: 'Terms of Service | Box It Up',
  description: 'The terms and conditions governing your use of Box It Up.',
  icons: { icon: '/logo_icon.png' },
}

export default function TermsPage() {
  return (
    <section className="legal-page section">
      <div className="container">
        <div className="legal-page__header">
          <div className="legal-page__eyebrow">Legal</div>
          <h1 className="legal-page__title">Terms of Service</h1>
          <p className="legal-page__meta">Last updated: June 2026</p>
        </div>

        <nav className="legal-nav" aria-label="Legal pages">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms" className="active">Terms of Service</a>
          <a href="/cookie">Cookie Policy</a>
        </nav>

        <div className="legal-body">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using Box It Up (&ldquo;the Platform&rdquo;), you agree to be bound by
            these Terms of Service (&ldquo;Terms&rdquo;). If you do not agree to these Terms, you
            may not use the Platform. These Terms apply to all users, including consumers and
            merchant partners.
          </p>

          <h2>2. Description of Service</h2>
          <p>
            Box It Up is a marketplace that connects local food businesses (&ldquo;Merchants&rdquo;)
            with consumers through discounted surprise food boxes. We provide the technology
            platform; we are not a food vendor, retailer, or party to transactions between Merchants
            and consumers.
          </p>

          <h2>3. User Accounts</h2>
          <p>
            To access certain features, you must create an account. You are responsible for
            maintaining the confidentiality of your login credentials and for all activity under
            your account. You must provide accurate and complete information when registering.
          </p>
          <p>
            We reserve the right to suspend or terminate accounts that violate these Terms or are
            used for fraudulent activity.
          </p>

          <h2>4. Merchant Terms</h2>
          <p>Merchants who list on Box It Up agree to:</p>
          <ul>
            <li>
              Provide accurate descriptions of their boxes, including contents, allergens, and
              pickup times.
            </li>
            <li>
              Honour reservations made through the Platform and have boxes ready for pickup during
              the stated window.
            </li>
            <li>
              Ensure all food items comply with applicable Taiwan food safety and hygiene
              regulations.
            </li>
            <li>
              Not use the Platform to list non-food items or items that are harmful, illegal, or
              misrepresented.
            </li>
          </ul>
          <p>
            Box It Up reserves the right to remove listings or suspend merchant accounts for
            violations of these obligations.
          </p>

          <h2>5. Consumer Terms</h2>
          <p>Consumers using Box It Up agree to:</p>
          <ul>
            <li>Pick up reserved boxes within the designated pickup window.</li>
            <li>
              Not resell or redistribute purchased boxes for commercial purposes without the
              Merchant&apos;s consent.
            </li>
            <li>Treat Merchant staff with respect during pickup.</li>
          </ul>

          <h2>6. Payments and Refunds</h2>
          <p>
            Payment terms, refund policies, and cancellation rules are subject to the specific
            terms presented at checkout. Box It Up does not guarantee refunds for boxes that have
            already been picked up or where the consumer failed to collect within the pickup window.
            Disputes between consumers and merchants should be directed to our support team at{' '}
            <a href="mailto:boxitupofficial@gmail.com">boxitupofficial@gmail.com</a>.
          </p>

          <h2>7. Intellectual Property</h2>
          <p>
            All content on the Platform — including logos, design, text, and code — is owned by or
            licensed to Box It Up. You may not reproduce, distribute, or create derivative works
            without our prior written consent.
          </p>
          <p>
            Merchants retain ownership of their store names, logos, and content they upload.
            By listing on our Platform, merchants grant Box It Up a non-exclusive licence to display
            that content for the purpose of operating the Platform.
          </p>

          <h2>8. Limitation of Liability</h2>
          <p>
            Box It Up provides the Platform &ldquo;as is&rdquo; without warranties of any kind. To
            the fullest extent permitted by law, we are not liable for any indirect, incidental, or
            consequential damages arising from your use of the Platform, including issues relating to
            food quality, allergic reactions, or missed pickups.
          </p>
          <p>
            Our total liability to you for any claim arising from these Terms shall not exceed the
            amount you paid to Box It Up in the 30 days prior to the claim.
          </p>

          <h2>9. Governing Law</h2>
          <p>
            These Terms are governed by the laws of the Republic of China (Taiwan). Any disputes
            arising from these Terms shall be subject to the exclusive jurisdiction of the Taiwan
            Taipei District Court as the court of first instance.
          </p>

          <h2>10. Changes to Terms</h2>
          <p>
            We may update these Terms at any time. Continued use of the Platform after changes are
            posted constitutes your acceptance of the revised Terms. We will provide at least 14
            days&apos; notice of material changes where possible.
          </p>

          <h2>11. Contact</h2>
          <p>
            Questions about these Terms? Contact us at{' '}
            <a href="mailto:boxitupofficial@gmail.com">boxitupofficial@gmail.com</a> or visit our{' '}
            <Link href="/contact">contact page</Link>.
          </p>
        </div>
      </div>
    </section>
  )
}
