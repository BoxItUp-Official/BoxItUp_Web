'use client'

import { createClient } from '@/lib/supabase'

export default function OAuthButtons() {
  const redirectTo =
    typeof window !== 'undefined'
      ? `${window.location.origin}/auth/callback?next=/merchant/dashboard`
      : '/auth/callback?next=/merchant/dashboard'

  async function handleOAuth(provider: 'google' | 'apple') {
    const supabase = createClient()
    await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo },
    })
  }

  return (
    <div className="merchant-social-grid">
      {/* Google */}
      <button type="button" className="merchant-social-btn" onClick={() => handleOAuth('google')}>
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        Google
      </button>

      {/* Apple */}
      <button type="button" className="merchant-social-btn" onClick={() => handleOAuth('apple')}>
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.4c1.39.07 2.35.74 3.15.8 1.2-.24 2.35-.93 3.62-.84 1.55.12 2.71.74 3.47 1.89-3.19 1.88-2.44 5.98.57 7.14-.6 1.6-1.4 3.2-2.81 3.89zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
        </svg>
        Apple
      </button>

      {/* LINE — full width */}
      <button
        type="button"
        className="merchant-social-btn merchant-social-btn--line"
        onClick={() => alert('LINE Login coming soon — set up your LINE Login Channel in Supabase to enable this.')}
      >
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.365 9.89c.50 0 .907.41.907.91s-.407.91-.907.91h-2.57v1.63h2.57c.5 0 .907.41.907.91s-.407.91-.907.91H15.9a.91.91 0 01-.907-.91V9.89c0-.5.407-.91.907-.91h3.465zm-6.13 0c.5 0 .907.41.907.91v4.36a.91.91 0 01-1.814 0V9.89c0-.5.407-.91.907-.91zm-2.633 0c.5 0 .907.41.907.91v2.72l-2.14-3.2a.91.91 0 00-.768-.43.905.905 0 00-.906.91v4.36c0 .5.406.91.906.91s.907-.41.907-.91v-2.72l2.14 3.2a.91.91 0 001.676-.48V9.89a.908.908 0 00-1.814 0h.092zM4.635 9.89c.5 0 .907.41.907.91v4.36a.91.91 0 01-.907.91H2.07a.91.91 0 110-1.82h1.658V9.89c0-.5.407-.91.907-.91zM12 2C6.477 2 2 6.145 2 11.25c0 4.006 2.592 7.44 6.266 8.86.46.168.955-.12.955-.617v-2.17c-2.56.557-3.098-1.234-3.098-1.234-.419-1.064-1.022-1.348-1.022-1.348-.835-.57.063-.559.063-.559.923.065 1.41.95 1.41.95.82 1.405 2.152.999 2.675.764.083-.594.32-.999.584-1.229-2.044-.232-4.19-1.022-4.19-4.55 0-1.005.36-1.826.95-2.469-.095-.233-.411-1.168.09-2.436 0 0 .773-.247 2.532.944A8.81 8.81 0 0112 7.38a8.84 8.84 0 012.307.311c1.757-1.19 2.529-.944 2.529-.944.502 1.268.186 2.203.091 2.436.591.643.949 1.464.949 2.469 0 3.538-2.15 4.315-4.199 4.543.33.284.624.846.624 1.706v2.527c0 .5.498.787.96.612C19.408 18.687 22 15.254 22 11.25 22 6.145 17.523 2 12 2z"/>
        </svg>
        Continue with LINE
        <span className="merchant-social-soon">Coming soon</span>
      </button>
    </div>
  )
}
