'use client'

import { motion, MotionConfig, useScroll, useSpring, type Variants } from 'motion/react'
import type { ReactNode } from 'react'

const EASE = [0.22, 1, 0.36, 1] as const

/** Respects the reader's "reduce motion" setting for everything inside it. */
export function MotionRoot({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}

/** Rises into place when it scrolls into view (or on load, for the hero). */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 48,
  onLoad = false,
}: {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  onLoad?: boolean
}) {
  const shown = { opacity: 1, y: 0, filter: 'blur(0px)' }
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: 'blur(6px)' }}
      {...(onLoad ? { animate: shown } : { whileInView: shown, viewport: { once: true, margin: '-10% 0px' } })}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

const group: Variants = { hidden: {}, shown: { transition: { staggerChildren: 0.11 } } }
const item: Variants = {
  hidden: { opacity: 0, y: 44, scale: 0.97 },
  shown: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.75, ease: EASE } },
}

/** A list whose StaggerItems come in one after another. */
export function Stagger({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={group}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: '-8% 0px' }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  )
}

/** Hairline at the very top of the page showing how far you have read. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.3 })
  return <motion.div className="paper-progress" style={{ scaleX }} aria-hidden="true" />
}

/** The share of all food that is wasted, drawn as a bar that fills on view. */
export function ImpactBar({ percent }: { percent: number }) {
  return (
    <div className="paper-impact-bar" aria-hidden="true">
      <motion.span
        initial={{ width: 0 }}
        whileInView={{ width: `${percent}%` }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 2.2, ease: EASE }}
      />
    </div>
  )
}
