import Link from 'next/link'

export default function VerifyEmailPage() {
  return (
    <main className="merchant-auth">
      <div className="merchant-auth__card" style={{ textAlign: 'center' }}>
        <div style={{
          width: '3.5rem', height: '3.5rem', borderRadius: '50%',
          background: '#fff3e0', display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: '1.6rem', margin: '0 auto 1.25rem',
        }}>
          📬
        </div>

        <div className="merchant-auth__eyebrow">One more step</div>
        <h1 className="merchant-auth__title">Check your inbox</h1>
        <p className="merchant-auth__sub">
          We sent a confirmation link to your email address. Click it to activate
          your account and you&apos;ll be taken straight to onboarding.
        </p>

        <div style={{ borderTop: '1px solid var(--clr-border)', paddingTop: '1.25rem', marginTop: '0.5rem' }}>
          <p style={{ fontSize: '0.88rem', color: 'var(--clr-muted)', marginBottom: '0.75rem' }}>
            Didn&apos;t receive it? Check your spam folder, or&nbsp;
            <Link href="/merchant/signup" style={{ color: 'var(--clr-accent)', fontWeight: 600 }}>
              try signing up again
            </Link>.
          </p>
          <p style={{ fontSize: '0.88rem', color: 'var(--clr-muted)' }}>
            Already confirmed?&nbsp;
            <Link href="/merchant/login" style={{ color: 'var(--clr-accent)', fontWeight: 600 }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
