'use client'

import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { useIntroReady } from './intro'

const EASE = [0.22, 1, 0.36, 1] as const
const pop = (delay: number, go: boolean) => ({
  initial: { opacity: 0, y: 16, scale: 0.96 },
  animate: go ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 16, scale: 0.96 },
  transition: { type: 'spring' as const, stiffness: 260, damping: 24, delay },
})

// The hero picture: wipes open from the bottom while the photo settles, drifts
// as the page scrolls, and two cards drawn like the app's box list pop in on top.
export default function HeroMedia({
  alt,
  box,
  meta,
  near,
}: {
  alt: string
  box: string
  meta: string
  near: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const still = useReducedMotion()
  const ready = useIntroReady()
  const go = ready || !!still
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const photoY = useTransform(scrollYProgress, [0, 1], still ? [0, 0] : [0, 44])
  const photoScale = useTransform(scrollYProgress, [0, 1], still ? [1, 1] : [1.03, 1.1])
  const cardY = useTransform(scrollYProgress, [0, 1], still ? [0, 0] : [0, -32])

  return (
    <div ref={ref} className="hero--split__media">
      <motion.div
        className="paper-hero-frame"
        initial={still ? false : { clipPath: 'inset(100% 0% 0% 0% round 28px)' }}
        animate={{ clipPath: go ? 'inset(0% 0% 0% 0% round 28px)' : 'inset(100% 0% 0% 0% round 28px)' }}
        transition={{ duration: 1, delay: 0.1, ease: EASE }}
      >
        <motion.div style={{ y: photoY, scale: photoScale, height: '100%' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <motion.img
            src="/hero-bakery.jpg"
            alt={alt}
            className="hero--split__photo"
            initial={still ? false : { scale: 1.12 }}
            animate={{ scale: go ? 1 : 1.12 }}
            transition={{ duration: 1.4, delay: 0.1, ease: EASE }}
          />
        </motion.div>
      </motion.div>

      <motion.div className="paper-hero-float paper-hero-float--box" style={{ y: cardY }}>
        <motion.div className="paper-row-card" {...pop(0.75, go)}>
          <span className="paper-row-card__thumb">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 4C7.6 4 4 6.2 4 9c0 1.2.7 2.3 2 3v6a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-6c1.3-.7 2-1.8 2-3 0-2.8-3.6-5-8-5z" />
            </svg>
          </span>
          <span className="paper-row-card__body">
            <strong>{box}</strong>
            <small>{meta}</small>
          </span>
          <span className="paper-row-card__save">−50%</span>
        </motion.div>
      </motion.div>

      <motion.div className="paper-hero-float paper-hero-float--near">
        <motion.div className="paper-near-pill" {...pop(0.88, go)}>
          <span className="hero--split__chip-dot" />
          {near}
        </motion.div>
      </motion.div>
    </div>
  )
}
