'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const ANIMATED_SELECTORS = [
  '.step-card',
  '.value-card',
  '.feat-card',
  '.metric-card',
  '.testimonial-card',
  '.about__text',
  '.about__metrics',
  '.section-title',
  '.section-subtitle',
  '.section-label',
  '.featured__header',
  '.hero__stats',
].join(', ')

export default function ScrollAnimations() {
  const pathname = usePathname()

  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>(ANIMATED_SELECTORS)

    targets.forEach((el) => {
      el.setAttribute('data-animate', '')
      const siblings = el.parentElement
        ? Array.from(el.parentElement.children).filter((c) =>
            c.hasAttribute('data-animate')
          )
        : []
      const idx = siblings.indexOf(el)
      if (idx > 0) el.style.transitionDelay = `${idx * 0.08}s`
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )

    targets.forEach((el) => observer.observe(el))

    // Active nav link on scroll
    const sections = document.querySelectorAll<HTMLElement>('section[id]')
    const navLinks = document.querySelectorAll<HTMLAnchorElement>('.navbar__link')
    const navbar = document.getElementById('navbar')

    const updateActiveLink = () => {
      const scrollPos = window.scrollY + (navbar?.offsetHeight ?? 0) + 32
      let current = ''
      sections.forEach((section) => {
        if (section.offsetTop <= scrollPos) current = section.id
      })
      navLinks.forEach((link) => {
        link.classList.remove('active')
        if (link.getAttribute('href') === `#${current}`) link.classList.add('active')
      })
    }

    window.addEventListener('scroll', updateActiveLink, { passive: true })

    // Scroll indicator
    const scrollIndicator = document.getElementById('scrollIndicator')
    const handleScrollIndicator = () => {
      if (!scrollIndicator) return
      if (window.scrollY > 80) {
        scrollIndicator.style.opacity = '0'
        scrollIndicator.style.pointerEvents = 'none'
      } else {
        scrollIndicator.style.opacity = '1'
        scrollIndicator.style.pointerEvents = 'auto'
      }
    }
    if (scrollIndicator) {
      window.addEventListener('scroll', handleScrollIndicator, { passive: true })
      scrollIndicator.addEventListener('click', () => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
      })
    }

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', updateActiveLink)
      if (scrollIndicator) window.removeEventListener('scroll', handleScrollIndicator)
    }
  }, [pathname])

  return null
}
