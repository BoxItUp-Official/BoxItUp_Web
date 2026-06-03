'use client'

import { useEffect, useRef, type ReactNode } from 'react'

interface HeroParallaxProps {
  children: ReactNode
}

export default function HeroParallax({ children }: HeroParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(max-width: 1023px)').matches) return

    const el = ref.current
    if (!el) return

    function onMove(e: MouseEvent) {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      const dx = (e.clientX - cx) / cx
      const dy = (e.clientY - cy) / cy

      const cards = el!.querySelectorAll<HTMLElement>('.hero__floating-card')
      cards.forEach((card, i) => {
        const depth = (i + 1) * 8
        card.style.transform = `translate(${dx * depth}px, ${dy * depth}px)`
      })

      const phone = el!.querySelector<HTMLElement>('.hero__phone')
      if (phone) {
        phone.style.transform = `translate(${dx * 4}px, ${dy * 4}px)`
      }
    }

    window.addEventListener('mousemove', onMove)
    return () => {
      window.removeEventListener('mousemove', onMove)
      // Reset transforms on cleanup
      el.querySelectorAll<HTMLElement>('.hero__floating-card, .hero__phone').forEach((el) => {
        el.style.transform = ''
      })
    }
  }, [])

  return (
    <div ref={ref} style={{ position: 'relative', width: '100%' }}>
      {children}
    </div>
  )
}
