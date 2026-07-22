import type { Metadata } from 'next'
import ComingSoon from '@/components/ComingSoon'

export const metadata: Metadata = {
  title: 'About Us | Box It Up',
  description:
    'Who we are, why we started Box It Up, and how we are rescuing good food across Taiwan.',
  icons: { icon: '/logo_icon.png' },
}

// Full page (company intro, brand story, what we do, team, timeline) lands
// here once the content is ready. The homepage #about section carries the
// summary for now.
export default function AboutPage() {
  return (
    <ComingSoon
      eyebrow="Company"
      title="The full story is on its way"
      body="We're putting together our company introduction, brand story, and team page. In the meantime, the essentials are on our homepage."
      backHref="/#about"
      backLabel="Read our story on the homepage"
    />
  )
}
