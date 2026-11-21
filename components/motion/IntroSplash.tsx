'use client'

import { useEffect, useRef } from 'react'
import { preload } from 'react-dom'
import { setIntroStage } from './intro'

// The app's welcome animation, for the website: a box lands, food drops in, the
// flaps close with a small burst, and the box resolves into the logo, which
// flies to its place in the navbar as the page appears. About two seconds, once
// per visit; a click, key press or scroll skips it.
//
// Geometry is the same as BoxItUp_App/components/PackingLogo.tsx, in the pixel
// units of the logo artwork. It is drawn from one requestAnimationFrame clock
// rather than per-element animations, so skipping is a single cancel.

type Point = readonly [number, number]

// When each beat starts (ms).
const AT = {
  drop: 240, //      duration of the fall; the box lands here
  items: [270, 350, 430],
  itemFall: 230,
  backFlap: 640,
  frontFlap: 760,
  flap: 240,
  pat: 1000,
  sparks: 1020,
  mark: 1180,
  boxFade: 1210,
  settle: 1220,
  word: 1340,
  sheen: 1480,
  fly: 1720,
  flyFor: 480,
  end: 2200,
}

const W = 251
const SLOPE = 0.4885
const S = W * SLOPE
const H = 308
const TOP = -14.4
const RADIUS = 20
const OPEN_ANGLE = 128

const A: Point = [0, TOP]
const B: Point = [W, TOP + S]
const C: Point = [W, TOP + S + H]
const D: Point = [0, TOP + H]
const E: Point = [2 * W, TOP]
const F: Point = [2 * W, TOP + H]
const G: Point = [W, TOP - S]

// Shrinks a convex polygon by `r`; drawn with a round-joined stroke of 2r, the
// result has the original size with rounded corners.
function inset(points: readonly Point[], r: number): Point[] {
  const n = points.length
  const cx = points.reduce((sum, p) => sum + p[0], 0) / n
  const cy = points.reduce((sum, p) => sum + p[1], 0) / n
  const lines = points.map((p, i) => {
    const q = points[(i + 1) % n]
    const dx = q[0] - p[0]
    const dy = q[1] - p[1]
    const length = Math.hypot(dx, dy)
    let nx = -dy / length
    let ny = dx / length
    if ((cx - p[0]) * nx + (cy - p[1]) * ny < 0) {
      nx = -nx
      ny = -ny
    }
    return { x: p[0] + nx * r, y: p[1] + ny * r, dx, dy }
  })
  return lines.map((l2, i) => {
    const l1 = lines[(i + n - 1) % n]
    const t = ((l2.x - l1.x) * l2.dy - (l2.y - l1.y) * l2.dx) / (l1.dx * l2.dy - l1.dy * l2.dx)
    return [l1.x + l1.dx * t, l1.y + l1.dy * t] as const
  })
}

const toPath = (points: readonly Point[]) =>
  `M${points.map((p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join('L')}Z`

const LEFT_FACE = toPath(inset([A, B, C, D], RADIUS))
const RIGHT_FACE = toPath(inset([B, E, F, C], RADIUS))
const INSIDE = toPath(inset([A, G, E, B], RADIUS))
const SILHOUETTE = toPath(inset([A, G, E, F, C, D], RADIUS))
const MARK_SHAPE = toPath(inset([A, B, C, D], 8))

// angle: 0 = closed flat over the top, 90 = upright, more = open.
function flapPath(hingeStart: Point, hingeEnd: Point, direction: number, angle: number) {
  const rad = (angle * Math.PI) / 180
  const dx = direction * (W / 2) * Math.cos(rad)
  const dy = direction * (-S / 2) * Math.cos(rad) - (H / 2) * Math.sin(rad)
  return (
    `M${hingeStart[0]} ${hingeStart[1]}L${hingeEnd[0]} ${hingeEnd[1]}` +
    `L${(hingeEnd[0] + dx).toFixed(1)} ${(hingeEnd[1] + dy).toFixed(1)}` +
    `L${(hingeStart[0] + dx).toFixed(1)} ${(hingeStart[1] + dy).toFixed(1)}Z`
  )
}

const ITEMS = [
  { x: W - 38, rx: 62, ry: 40, fill: '#F6D7A0', stroke: '#C9792B' },
  { x: W + 50, rx: 42, ry: 42, fill: '#EE6A4E', stroke: '#C7422B' },
  { x: W + 4, rx: 36, ry: 30, fill: '#A9D18E', stroke: '#5E9A3C' },
] as const
const ITEM_FROM = TOP - S - H / 2 - 120
const ITEM_TO = TOP + S + 92

const SPARKS = [
  { angle: -152, color: '#F1A71F', length: 34 },
  { angle: -122, color: '#FF7300', length: 44 },
  { angle: -90, color: '#F1A71F', length: 38 },
  { angle: -58, color: '#FF7300', length: 44 },
  { angle: -28, color: '#F1A71F', length: 34 },
] as const

// The finished logo, in the same artwork units: mark at the origin, wordmark
// beside it. /logo_gra.png (the navbar logo) is this artwork, 21px lower.
const WORD = { x: 310, y: 32, width: 231, height: 364 }
const NAV_ART = { width: 632, height: 443, markY: 21 }
const LOGO_CENTER = (WORD.x + WORD.width) / 2
const BOX_SHIFT = LOGO_CENTER - W // the box is centred before the logo settles

const VIEW = { x: LOGO_CENTER - 401, y: -461, width: 802, height: 1262 } // centred on the box

const clamp = (v: number) => Math.min(1, Math.max(0, v))
const easeIn = (v: number) => v * v
const easeOut = (v: number) => 1 - (1 - v) ** 3
const easeInOut = (v: number) => (v < 0.5 ? 4 * v * v * v : 1 - (-2 * v + 2) ** 3 / 2)
/** 0 → 1 → 0: quickly down, then back with a little give. */
const pulse = (t: number, start: number, down: number, up: number) => {
  if (t < start || t > start + down + up) return 0
  return t < start + down ? (t - start) / down : 1 - easeOut((t - start - down) / up)
}

export default function IntroSplash() {
  const root = useRef<HTMLDivElement>(null)
  const backdrop = useRef<HTMLDivElement>(null)
  const scene = useRef<SVGSVGElement>(null)

  preload('/logo-mark.png', { as: 'image' })
  preload('/logo-wordmark.png', { as: 'image' })

  useEffect(() => {
    const html = document.documentElement
    if (html.getAttribute('data-intro') !== 'play') return
    ;(window as Window & { __boxItUpIntro?: boolean }).__boxItUpIntro = true

    const el = root.current!
    const svg = scene.current!
    const $ = <T extends SVGElement>(name: string) => svg.querySelector<T>(`[data-i="${name}"]`)!
    const shift = $('shift')
    const box = $('box')
    const shadow = $('shadow')
    const back = $('back')
    const front = $('front')
    const mark = $('mark')
    const word = $('word')
    const wordClip = $('wordClip')
    const sheen = $('sheen')
    const items = ITEMS.map((_, i) => $(`item${i}`))
    const sparks = SPARKS.map((_, i) => $(`spark${i}`))

    let frame = 0
    let watchdog = 0
    let start = 0
    let revealed = false
    let done = false
    let flight: { x: number; y: number; scale: number } | null = null

    // Where the logo must land: the navbar image, drawn with object-fit: contain.
    function measureFlight() {
      const target = document.getElementById('navbarLogo')
      const from = svg.getBoundingClientRect()
      if (!target || !from.width) return null
      const to = target.getBoundingClientRect()
      const k = from.width / VIEW.width
      const fit = Math.min(to.width / NAV_ART.width, to.height / NAV_ART.height)
      const originX = -VIEW.x * k
      const originY = -VIEW.y * k
      svg.style.transformOrigin = `${originX}px ${originY}px`
      return {
        x: to.left + (to.width - NAV_ART.width * fit) / 2 - (from.left + originX),
        y: to.top + (to.height - NAV_ART.height * fit) / 2 + NAV_ART.markY * fit - (from.top + originY),
        scale: fit / k,
      }
    }

    function draw(t: number) {
      const fell = easeIn(clamp(t / AT.drop))
      const squash = 1 - 0.07 * pulse(t, AT.drop, 70, 190) - 0.05 * pulse(t, AT.pat, 80, 170)
      const dip = AT.items.reduce((sum, at) => sum + pulse(t, at + AT.itemFall - 30, 50, 80), 0)
      const fade = 1 - clamp((t - AT.boxFade) / 200)
      const groundX = W
      const groundY = TOP + S + H

      box.setAttribute('opacity', String(clamp(t / 120) * fade))
      box.setAttribute(
        'transform',
        `translate(${groundX} ${(-130 * (1 - fell) + dip * 8).toFixed(2)}) translate(0 ${groundY}) ` +
          `scale(${(1 + (1 - squash) * 0.5).toFixed(4)} ${squash.toFixed(4)}) translate(${-groundX} ${-groundY})`,
      )
      shadow.setAttribute('opacity', String(0.9 * fell * fade))
      shadow.setAttribute('rx', String(130 + 90 * fell))

      back.setAttribute('d', flapPath(G, E, -1, OPEN_ANGLE * (1 - easeInOut(clamp((t - AT.backFlap) / AT.flap)))))
      front.setAttribute('d', flapPath(A, B, 1, OPEN_ANGLE * (1 - easeInOut(clamp((t - AT.frontFlap) / AT.flap)))))

      items.forEach((item, i) => {
        const p = easeIn(clamp((t - AT.items[i]) / AT.itemFall))
        item.setAttribute('cy', (ITEM_FROM + (ITEM_TO - ITEM_FROM) * p).toFixed(1))
        item.setAttribute('opacity', String(t < AT.items[i] ? 0 : Math.min(1, ((t - AT.items[i]) / AT.itemFall) * 5)))
      })

      const burst = clamp((t - AT.sparks) / 360)
      sparks.forEach((spark, i) => {
        const { angle, length } = SPARKS[i]
        const rad = (angle * Math.PI) / 180
        const r = 150 + 75 * easeOut(burst)
        const half = (length * (burst < 0.4 ? 0.4 + 1.5 * burst : 1.3 - 0.75 * burst)) / 2
        spark.setAttribute('x1', (W + Math.cos(rad) * (r - half)).toFixed(1))
        spark.setAttribute('y1', (TOP + Math.sin(rad) * (r - half)).toFixed(1))
        spark.setAttribute('x2', (W + Math.cos(rad) * (r + half)).toFixed(1))
        spark.setAttribute('y2', (TOP + Math.sin(rad) * (r + half)).toFixed(1))
        spark.setAttribute('opacity', burst <= 0 || burst >= 1 ? '0' : String(burst < 0.15 ? burst / 0.15 : 1 - clamp((burst - 0.6) / 0.4)))
      })

      mark.setAttribute('opacity', String(clamp((t - AT.mark) / 110)))
      shift.setAttribute('transform', `translate(${(BOX_SHIFT * (1 - easeOut(clamp((t - AT.settle) / 300)))).toFixed(2)} 0)`)

      const out = easeOut(clamp((t - AT.word) / 280))
      word.setAttribute('opacity', String(clamp((t - AT.word) / 120)))
      word.setAttribute('x', (WORD.x - 46 * (1 - out)).toFixed(1))
      wordClip.setAttribute('width', (WORD.width * out).toFixed(1))

      const glide = clamp((t - AT.sheen) / 360)
      const x = -90 + (W + 270) * easeInOut(glide)
      sheen.setAttribute('d', `M${x} -30L${x + 64} -30L${x - 66} 431L${x - 130} 431Z`)
      sheen.setAttribute('opacity', glide > 0 && glide < 1 ? '0.32' : '0')

      if (t >= AT.fly) {
        flight ??= measureFlight()
        if (!revealed) {
          revealed = true
          el.style.pointerEvents = 'none'
          setIntroStage('reveal')
        }
        backdrop.current!.style.opacity = String(1 - easeInOut(clamp((t - AT.fly - 40) / 420)))
        if (flight) {
          const p = easeInOut(clamp((t - AT.fly) / AT.flyFor))
          svg.style.transform = `translate(${flight.x * p}px, ${flight.y * p}px) scale(${1 + (flight.scale - 1) * p})`
        }
      }
    }

    function finish() {
      if (done) return
      done = true
      cancelAnimationFrame(frame)
      window.clearTimeout(watchdog)
      removeListeners()
      setIntroStage(null)
    }

    function tick(now: number) {
      start ||= now
      const t = now - start
      draw(t)
      if (t >= AT.end) finish()
      else frame = requestAnimationFrame(tick)
    }

    // Any attempt to get to the page ends the animation at once.
    function skip(event: Event) {
      if (done || revealed) return
      event.preventDefault()
      cancelAnimationFrame(frame)
      revealed = true
      el.style.pointerEvents = 'none'
      setIntroStage('reveal')
      el.animate({ opacity: [1, 0] }, { duration: 220, easing: 'ease-out' }).onfinish = finish
    }
    const options = { passive: false } as const
    const events = ['pointerdown', 'wheel', 'touchmove', 'keydown'] as const
    const removeListeners = () => events.forEach((name) => window.removeEventListener(name, skip))
    events.forEach((name) => window.addEventListener(name, skip, options))

    // Start once the logo images are ready, so the mark never appears late.
    let cancelled = false
    const images = ['/logo-mark.png', '/logo-wordmark.png'].map((src) => {
      const image = new Image()
      image.src = src
      return image.decode().catch(() => {})
    })
    const begin = () => {
      if (cancelled || done) return
      frame = requestAnimationFrame(tick)
      // Browsers can stop drawing frames (background tabs, hidden panes). The
      // page must never stay covered, so a plain timer ends the intro regardless.
      watchdog = window.setTimeout(finish, AT.end + 1200)
    }
    draw(0)
    Promise.race([Promise.all(images), new Promise((resolve) => setTimeout(resolve, 700))]).then(begin)

    return () => {
      cancelled = true
      finish()
    }
  }, [])

  return (
    <div ref={root} className="paper-intro" aria-hidden="true">
      <div ref={backdrop} className="paper-intro__backdrop" />
      <svg ref={scene} className="paper-intro__scene" viewBox={`${VIEW.x} ${VIEW.y} ${VIEW.width} ${VIEW.height}`}>
        <defs>
          <linearGradient id="introLeft" x1="20" y1="40" x2="230" y2="380" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#FD7904" />
            <stop offset="1" stopColor="#F2A31C" />
          </linearGradient>
          <linearGradient id="introRight" x1={W} y1="60" x2={2 * W} y2="380" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#E06400" />
            <stop offset="1" stopColor="#D9820E" />
          </linearGradient>
          <clipPath id="introMark">
            <path d={MARK_SHAPE} strokeWidth={16} />
          </clipPath>
          <clipPath id="introWord">
            <rect data-i="wordClip" x={WORD.x} y={WORD.y} width={0} height={WORD.height} />
          </clipPath>
        </defs>

        <g data-i="shift">
          <ellipse data-i="shadow" cx={W} cy={TOP + S + H - 6} rx={220} ry={15} fill="rgba(150,70,0,0.16)" opacity={0} />
          <g data-i="box" opacity={0}>
            <path d={SILHOUETTE} fill="#E06400" stroke="#E06400" strokeWidth={RADIUS * 2} strokeLinejoin="round" />
            <path d={INSIDE} fill="#A94A00" stroke="#A94A00" strokeWidth={RADIUS * 2} strokeLinejoin="round" />
            <path data-i="back" fill="#FFB95E" stroke="#FFB95E" strokeWidth={16} strokeLinejoin="round" />
            {ITEMS.map((item, i) => (
              <ellipse key={item.fill} data-i={`item${i}`} cx={item.x} cy={ITEM_FROM} rx={item.rx} ry={item.ry} fill={item.fill} stroke={item.stroke} strokeWidth={7} opacity={0} />
            ))}
            <path d={LEFT_FACE} fill="url(#introLeft)" stroke="url(#introLeft)" strokeWidth={RADIUS * 2} strokeLinejoin="round" />
            <path d={RIGHT_FACE} fill="url(#introRight)" stroke="url(#introRight)" strokeWidth={RADIUS * 2} strokeLinejoin="round" />
            <path data-i="front" fill="#FFC673" stroke="#FFC673" strokeWidth={16} strokeLinejoin="round" />
          </g>
          {SPARKS.map((spark, i) => (
            <line key={spark.angle} data-i={`spark${i}`} stroke={spark.color} strokeWidth={11} strokeLinecap="round" opacity={0} />
          ))}
          <g data-i="mark" opacity={0}>
            <image href="/logo-mark.png" x={0} y={0} width={W} height={401} />
            <path data-i="sheen" fill="#fff" opacity={0} clipPath="url(#introMark)" />
          </g>
        </g>

        <g clipPath="url(#introWord)">
          <image data-i="word" href="/logo-wordmark.png" x={WORD.x} y={WORD.y} width={WORD.width} height={WORD.height} opacity={0} />
        </g>
      </svg>
    </div>
  )
}
