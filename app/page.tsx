import HomeSections from '@/components/HomeSections'

// All three locale homepages render the same component — see
// components/HomeSections.tsx for the structure and app/homeContent.ts for copy.
export default function HomePage() {
  return <HomeSections locale="en" />
}
