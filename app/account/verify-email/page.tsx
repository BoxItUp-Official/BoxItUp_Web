import Link from 'next/link'

export default function AccountVerifyEmailPage() {
  return (
    <main className="account-auth">
      <div className="account-auth__card" style={{ textAlign: 'center' }}>
        <div style={{
          width: '3.5rem', height: '3.5rem', borderRadius: '50%',
          background: '#fff3e0', display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: '1.6rem', margin: '0 auto 1.25rem',
        }}>
          📬
        </div>

        <div className="account-auth__eyebrow">One more step</div>
        <h1 className="account-auth__title">Check your inbox</h1>
        <p className="account-auth__sub">
          We sent a confirmation link to your email address. Click it to activate
          your account and you&apos;ll be taken straight to a quick setup step.
        </p>

        <div style={{ borderTop: '1px solid var(--clr-border)', paddingTop: '1.25rem', marginTop: '0.5rem' }}>
          <p style={{ fontSize: '0.88rem', color: 'var(--clr-muted)', marginBottom: '0.75rem' }}>
            Didn&apos;t receive it? Check your spam folder, or&nbsp;
            <Link href="/account/signup" style={{ color: 'var(--clr-accent)', fontWeight: 600 }}>
              try signing up again
            </Link>.
          </p>
          <p style={{ fontSize: '0.88rem', color: 'var(--clr-muted)' }}>
            Already confirmed?&nbsp;
            <Link href="/account/login" style={{ color: 'var(--clr-accent)', fontWeight: 600 }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
