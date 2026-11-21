'use client'

import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'

const EASE = [0.22, 1, 0.36, 1] as const
const pop = (delay: number) => ({
  initial: { opacity: 0, y: 28, scale: 0.86 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { type: 'spring' as const, stiffness: 240, damping: 19, delay },
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
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const photoY = useTransform(scrollYProgress, [0, 1], still ? [0, 0] : [0, 70])
  const photoScale = useTransform(scrollYProgress, [0, 1], still ? [1, 1] : [1.04, 1.16])
  const cardY = useTransform(scrollYProgress, [0, 1], still ? [0, 0] : [0, -60])

  return (
    <div ref={ref} className="hero--split__media">
      <motion.div
        className="paper-hero-frame"
        initial={still ? false : { clipPath: 'inset(100% 0% 0% 0% round 28px)' }}
        animate={{ clipPath: 'inset(0% 0% 0% 0% round 28px)' }}
        transition={{ duration: 1.25, delay: 0.2, ease: EASE }}
      >
        <motion.div style={{ y: photoY, scale: photoScale, height: '100%' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <motion.img
            src="/hero-bakery.jpg"
            alt={alt}
            className="hero--split__photo"
            initial={still ? false : { scale: 1.3 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.7, delay: 0.2, ease: EASE }}
          />
        </motion.div>
      </motion.div>

      <motion.div className="paper-hero-float paper-hero-float--box" style={{ y: cardY }}>
        <motion.div className="paper-row-card" {...pop(1.05)}>
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
        <motion.div className="paper-near-pill" {...pop(1.25)}>
          <span className="hero--split__chip-dot" />
          {near}
        </motion.div>
      </motion.div>
    </div>
  )
}
