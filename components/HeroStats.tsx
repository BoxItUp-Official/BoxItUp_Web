'use client'

import { Fragment, useEffect, useRef } from 'react'

interface Stat {
  target: number
  suffix: string
  label: string
}

interface HeroStatsProps {
  stats: Stat[]
}

export default function HeroStats({ stats }: HeroStatsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const fired = useRef(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !fired.current) {
          fired.current = true
          animateAll()
          observer.disconnect()
        }
      },
      { threshold: 0.4 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  function animateAll() {
    const numberEls = containerRef.current?.querySelectorAll<HTMLElement>('.hero__stat-number')
    if (!numberEls) return
    numberEls.forEach((el, i) => {
      const stat = stats[i]
      if (!stat) return
      animateCount(el, stat.target, stat.suffix)
    })
  }

  function animateCount(el: HTMLElement, target: number, suffix: string) {
    const duration = 1800
    const start = performance.now()
    el.textContent = '0' + suffix
    function tick(now: number) {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      el.textContent = Math.round(eased * target).toLocaleString() + suffix
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }

  return (
    <div className="hero__stats" ref={containerRef}>
      {stats.map((stat, i) => (
        <Fragment key={i}>
          <div className="hero__stat">
            <span className="hero__stat-number">{stat.target.toLocaleString()}{stat.suffix}</span>
            <span className="hero__stat-label">{stat.label}</span>
          </div>
          {i < stats.length - 1 && <div className="hero__stat-divider" />}
        </Fragment>
      ))}
    </div>
  )
}
