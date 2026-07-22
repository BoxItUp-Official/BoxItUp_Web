import type { Metadata } from 'next'
import ComingSoon from '@/components/ComingSoon'

export const metadata: Metadata = {
  title: 'Impact | Box It Up',
  description:
    'Our mission, vision, and the environmental and community impact of rescuing surplus food.',
  icons: { icon: '/logo_icon.png' },
}

// Full page (mission, vision, food waste, sustainability, community, impact
// metrics, ESG) lands here once the content and real numbers are ready.
export default function ImpactPage() {
  return (
    <ComingSoon
      eyebrow="Impact"
      title="Our impact dashboard is on its way"
      body="We're building a live dashboard for boxes rescued, CO₂e avoided, and stores supported. Real numbers land here after launch."
      backHref="/#impact"
      backLabel="See the summary on the homepage"
    />
  )
}
