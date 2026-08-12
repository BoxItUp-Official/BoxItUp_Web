import Link from 'next/link'

interface Props {
  eyebrow: string
  title: string
  body: string
  backHref: string
  backLabel: string
  /** Overridden by the localized pages. */
  badge?: string
}

export default function ComingSoon({ eyebrow, title, body, backHref, backLabel, badge = 'Coming Soon' }: Props) {
  return (
    <main className="coming-soon-page">
      <div className="container coming-soon-page__inner">
        <span className="coming-soon-page__badge">{badge}</span>
        <p className="coming-soon-page__eyebrow">{eyebrow}</p>
        <h1 className="coming-soon-page__title">{title}</h1>
        <p className="coming-soon-page__body">{body}</p>
        <Link href={backHref} className="btn btn--primary btn--large">{backLabel}</Link>
      </div>
    </main>
  )
}
