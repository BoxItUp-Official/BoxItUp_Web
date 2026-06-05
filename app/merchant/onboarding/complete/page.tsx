import Link from 'next/link'

const LINE_URL = 'https://line.me/R/ti/p/YOUR_LINE_ID' // replace with your LINE account link

export default function MerchantCompletePage() {
  return (
    <main className="merchant-complete">
      <div className="merchant-complete__card">
        <div className="merchant-complete__icon">✓</div>

        <h1 className="merchant-complete__title">You&apos;re all set!</h1>
        <p className="merchant-complete__body">
          Welcome to Box It Up. Your store profile has been saved. The next step is
          to connect with our team on LINE — we&apos;ll walk you through listing your
          first surprise box and getting customers through the door.
        </p>

        <div className="merchant-complete__actions">
          <a
            href={LINE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--primary btn--large"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '0.5rem' }}>
              <path d="M19.365 9.89c.50 0 .907.41.907.91s-.407.91-.907.91h-2.57v1.63h2.57c.5 0 .907.41.907.91s-.407.91-.907.91H15.9a.91.91 0 01-.907-.91V9.89c0-.5.407-.91.907-.91h3.465zm-6.13 0c.5 0 .907.41.907.91v4.36a.91.91 0 01-1.814 0V9.89c0-.5.407-.91.907-.91zm-2.633 0c.5 0 .907.41.907.91v2.72l-2.14-3.2a.91.91 0 00-.768-.43.905.905 0 00-.906.91v4.36c0 .5.406.91.906.91s.907-.41.907-.91v-2.72l2.14 3.2a.91.91 0 001.676-.48V9.89a.908.908 0 00-1.814 0h.092zM4.635 9.89c.5 0 .907.41.907.91v4.36a.91.91 0 01-.907.91H2.07a.91.91 0 110-1.82h1.658V9.89c0-.5.407-.91.907-.91zM12 2C6.477 2 2 6.145 2 11.25c0 4.006 2.592 7.44 6.266 8.86.46.168.955-.12.955-.617v-2.17c-2.56.557-3.098-1.234-3.098-1.234-.419-1.064-1.022-1.348-1.022-1.348-.835-.57.063-.559.063-.559.923.065 1.41.95 1.41.95.82 1.405 2.152.999 2.675.764.083-.594.32-.999.584-1.229-2.044-.232-4.19-1.022-4.19-4.55 0-1.005.36-1.826.95-2.469-.095-.233-.411-1.168.09-2.436 0 0 .773-.247 2.532.944A8.81 8.81 0 0112 7.38a8.84 8.84 0 012.307.311c1.757-1.19 2.529-.944 2.529-.944.502 1.268.186 2.203.091 2.436.591.643.949 1.464.949 2.469 0 3.538-2.15 4.315-4.199 4.543.33.284.624.846.624 1.706v2.527c0 .5.498.787.96.612C19.408 18.687 22 15.254 22 11.25 22 6.145 17.523 2 12 2z"/>
            </svg>
            Continue on LINE
          </a>
          <Link href="/" className="btn btn--ghost btn--large">
            Back to Box It Up
          </Link>
        </div>
      </div>
    </main>
  )
}
