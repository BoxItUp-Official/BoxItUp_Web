'use client'

import type { ComponentProps } from 'react'
import BlurText from '@/components/reactbits/BlurText'
import { useIntroReady } from './intro'

/** The hero headline: plays on load, or as the intro hands over to the page. */
export default function HeroHeadline(props: Omit<ComponentProps<typeof BlurText>, 'trigger' | 'start'>) {
  const ready = useIntroReady()
  return <BlurText {...props} trigger="load" start={ready} />
}
