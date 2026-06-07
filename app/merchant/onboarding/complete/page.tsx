import Link from 'next/link'

const LINE_URL = 'https://line.me/R/ti/p/YOUR_LINE_ID' // replace with your LINE account link

export default function MerchantCompletePage() {
  return (
    <main className="merchant-complete">
      <div className="merchant-complete__card">
        <div className="merchant-complete__icon">✓</div>

        <h1 className="merchant-complete__title">You&apos;re all set!</h1>
        <p className="merchant-complete__body">
          Welcome to Box It Up. Your store profile has been saved. Head to your
          dashboard to create your first surprise box listing — or connect with our
          team on LINE if you need a hand getting started.
        </p>

        <div className="merchant-complete__actions">
          <Link href="/merchant/dashboard" className="btn btn--primary btn--large">
            Go to my dashboard
          </Link>
          <a
            href={LINE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--ghost btn--large"
          >
            Connect on LINE
          </a>
        </div>
      </div>
    </main>
  )
}
