import { NextResponse } from 'next/server'

/**
 * Submission notifier.
 *
 * Supabase Database Webhooks POST here on every INSERT into
 * `contact_submissions` and `business_leads`; we turn the row into an email
 * and hand it to Resend. Nothing is stored here — the row is already in the
 * database, this only tells a human about it.
 *
 * Required env (set in Vercel, Production + Preview):
 *   RESEND_API_KEY         from resend.com
 *   NOTIFY_WEBHOOK_SECRET  any long random string; must match the
 *                          `x-webhook-secret` header set on the Supabase hook
 * Optional:
 *   NOTIFY_TO_EMAIL        defaults to boxitupofficial@gmail.com
 *   NOTIFY_FROM_EMAIL      defaults to onboarding@resend.dev, which works
 *                          without a verified domain but can land in spam.
 *                          Switch to notify@boxitup.store once the domain is
 *                          verified in Resend.
 */

const TO = process.env.NOTIFY_TO_EMAIL ?? 'boxitupofficial@gmail.com'
const FROM = process.env.NOTIFY_FROM_EMAIL ?? 'Box It Up <onboarding@resend.dev>'

type Payload = {
  type?: string
  table?: string
  record?: Record<string, unknown>
}

/** User-supplied text goes into an HTML email — escape it. */
function esc(v: unknown): string {
  return String(v ?? '—')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function rows(pairs: [string, unknown][]): string {
  return pairs
    .map(
      ([k, v]) => `
      <tr>
        <td style="padding:8px 14px 8px 0;color:#7A6B5C;font-size:13px;white-space:nowrap;vertical-align:top">${esc(k)}</td>
        <td style="padding:8px 0;color:#1A1714;font-size:14px;line-height:1.6">${esc(v).replace(/\n/g, '<br>')}</td>
      </tr>`
    )
    .join('')
}

function build(table: string, r: Record<string, unknown>) {
  if (table === 'contact_submissions') {
    return {
      subject: `[聯絡表單] ${r.name ?? '未具名'} — ${r.inquiry_type ?? '一般'}`,
      heading: '有人透過聯絡表單找你',
      replyTo: typeof r.email === 'string' ? r.email : undefined,
      body: rows([
        ['姓名', r.name],
        ['Email', r.email],
        ['主旨', r.inquiry_type],
        ['公司／學校', r.organization],
        ['訊息', r.message],
      ]),
    }
  }

  if (table === 'business_leads') {
    return {
      subject: `[商家登記] ${r.store_name ?? '未具名店家'}`,
      heading: '有店家申請搶先體驗',
      replyTo: typeof r.email === 'string' ? r.email : undefined,
      body: rows([
        ['店名', r.store_name],
        ['聯絡人', r.contact_name],
        ['Email', r.email],
        ['電話', r.phone],
        ['店家類型', r.category],
        ['城市', r.city],
        ['備註', r.notes],
      ]),
    }
  }

  return null
}

export async function POST(request: Request) {
  if (!process.env.NOTIFY_WEBHOOK_SECRET || !process.env.RESEND_API_KEY) {
    console.error('notify: missing NOTIFY_WEBHOOK_SECRET or RESEND_API_KEY')
    return NextResponse.json({ error: 'not configured' }, { status: 500 })
  }

  if (request.headers.get('x-webhook-secret') !== process.env.NOTIFY_WEBHOOK_SECRET) {
    // Wrong or absent secret — someone other than our Supabase hook.
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  let payload: Payload
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'bad json' }, { status: 400 })
  }

  const table = payload.table ?? ''
  const record = payload.record
  if (payload.type !== 'INSERT' || !record) {
    return NextResponse.json({ skipped: 'not an insert' })
  }

  const mail = build(table, record)
  if (!mail) return NextResponse.json({ skipped: `unhandled table: ${table}` })

  const html = `
  <div style="font-family:-apple-system,'Helvetica Neue',Arial,sans-serif;background:#FBF6EE;padding:28px">
    <div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #EADFD1;border-radius:14px;padding:26px 28px">
      <p style="margin:0 0 4px;font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:#EB6A00;font-weight:700">Box It Up</p>
      <h1 style="margin:0 0 18px;font-size:19px;color:#1A1714">${esc(mail.heading)}</h1>
      <table style="width:100%;border-collapse:collapse">${mail.body}</table>
      <p style="margin:22px 0 0;padding-top:16px;border-top:1px solid #EADFD1;font-size:12px;color:#7A6B5C">
        直接回覆這封信就會寄到對方的信箱。
      </p>
    </div>
  </div>`

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      subject: mail.subject,
      html,
      ...(mail.replyTo ? { reply_to: mail.replyTo } : {}),
    }),
  })

  if (!res.ok) {
    const detail = await res.text()
    console.error('notify: resend failed', res.status, detail)
    return NextResponse.json({ error: 'send failed' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
