'use client'

import { useSyncExternalStore } from 'react'

// The homepage intro's state lives on <html data-intro>, because it has to be
// decided before the first paint (see INTRO_BOOT_SCRIPT):
//   "play"    the box animation covers the page
//   "reveal"  the logo is flying to the navbar; the page animates in underneath
//   (absent)  no intro: already seen, another page, or reduced motion
const EVENT = 'boxitup:intro'

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange)
  return () => window.removeEventListener(EVENT, onChange)
}

const pageMayAnimate = () => document.documentElement.getAttribute('data-intro') !== 'play'

/** False while the intro covers the page, so the hero waits its turn. */
export function useIntroReady() {
  return useSyncExternalStore(subscribe, pageMayAnimate, () => false)
}

export function setIntroStage(stage: 'reveal' | null) {
  const root = document.documentElement
  if (stage) root.setAttribute('data-intro', stage)
  else root.removeAttribute('data-intro')
  window.dispatchEvent(new Event(EVENT))
}

/**
 * Runs in <head>, before anything paints. Plays once per browser session, only
 * when the visit starts on a homepage, never with "reduce motion". If the app
 * has not started the animation within 4 seconds (slow or failed script), it
 * stands down so the page is never left covered.
 */
export const INTRO_BOOT_SCRIPT = `(function(){try{var s=sessionStorage,k='boxitup-intro',first=!s.getItem(k);s.setItem(k,'1');if(!first||!/^\\/(tw|cn)?\\/?$/.test(location.pathname)||matchMedia('(prefers-reduced-motion: reduce)').matches)return;var r=document.documentElement;r.setAttribute('data-intro','play');setTimeout(function(){if(!window.__boxItUpIntro){r.removeAttribute('data-intro');window.dispatchEvent(new Event('boxitup:intro'))}},4000)}catch(e){}})()`
