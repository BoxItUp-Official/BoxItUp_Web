'use client'

import { useActionState, useEffect, useRef, useState } from 'react'
import { verifyPickup, type VerifyState } from './actions'
import { formatMoney } from '@/lib/currency'

const INITIAL: VerifyState = { status: 'idle', message: '' }

// BarcodeDetector is built into Chrome, Edge and Android browsers. Where it is
// missing (Safari, Firefox) the Scan button is hidden and the code is typed.
type Detector = { detect: (source: HTMLVideoElement) => Promise<{ rawValue: string }[]> }
declare global {
  interface Window {
    BarcodeDetector?: new (opts: { formats: string[] }) => Detector
  }
}

// The counter workflow: the customer shows the QR code or reads out the
// 6-character code, and this confirms the pickup. For pay-at-pickup orders it
// also tells the merchant how much to collect.
export default function PickupVerifier({ currency = 'TWD' }: { currency?: string }) {
  const [state, action, pending] = useActionState(verifyPickup, INITIAL)
  const [code, setCode] = useState('')
  const [canScan, setCanScan] = useState(false)
  const [scanning, setScanning] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => setCanScan(typeof window !== 'undefined' && !!window.BarcodeDetector), [])

  // Clear the field after a successful pickup, ready for the next customer.
  useEffect(() => {
    if (state.status === 'success') setCode('')
  }, [state])

  useEffect(() => {
    if (!scanning || !window.BarcodeDetector) return
    const detector = new window.BarcodeDetector({ formats: ['qr_code'] })
    let stream: MediaStream | null = null
    let frame = 0
    let stopped = false

    const tick = async () => {
      if (stopped || !videoRef.current) return
      try {
        const found = await detector.detect(videoRef.current)
        const value = found[0]?.rawValue?.replace(/[^a-z0-9]/gi, '').toUpperCase()
        if (value && value.length === 6) {
          setCode(value)
          setScanning(false)
          // Submit once React has put the scanned code into the input.
          setTimeout(() => formRef.current?.requestSubmit(), 0)
          return
        }
      } catch {
        // The video is not ready yet; try the next frame.
      }
      frame = requestAnimationFrame(tick)
    }

    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: 'environment' } })
      .then(s => {
        stream = s
        if (videoRef.current) {
          videoRef.current.srcObject = s
          videoRef.current.play()
          frame = requestAnimationFrame(tick)
        }
      })
      .catch(() => setScanning(false))

    return () => {
      stopped = true
      cancelAnimationFrame(frame)
      stream?.getTracks().forEach(t => t.stop())
    }
  }, [scanning])

  return (
    <section className="pickup-verify">
      <div className="pickup-verify__head">
        <div>
          <h2 className="pickup-verify__title">Verify a pickup</h2>
          <p className="pickup-verify__sub">Scan the customer’s QR code or type their 6-character pickup code.</p>
        </div>
      </div>

      <form ref={formRef} action={action} className="pickup-verify__form">
        <input
          name="code"
          value={code}
          onChange={e => setCode(e.target.value.toUpperCase())}
          placeholder="e.g. K7Q2MX"
          maxLength={8}
          autoComplete="off"
          autoCapitalize="characters"
          spellCheck={false}
          className="pickup-verify__input"
          aria-label="Pickup code"
        />
        <button type="submit" className="btn btn--primary" disabled={pending || code.trim().length < 6}>
          {pending ? 'Checking…' : 'Confirm pickup'}
        </button>
        {canScan && (
          <button type="button" className="pickup-verify__scan" onClick={() => setScanning(s => !s)}>
            {scanning ? 'Stop camera' : 'Scan QR'}
          </button>
        )}
      </form>

      {scanning && (
        <div className="pickup-verify__camera">
          <video ref={videoRef} muted playsInline />
        </div>
      )}

      {state.status === 'error' && <div className="pickup-verify__result pickup-verify__result--error">{state.message}</div>}

      {state.status === 'success' && state.order && (
        <div className="pickup-verify__result pickup-verify__result--success">
          <strong>✓ {state.message}</strong>
          <span>
            {state.order.box}
            {state.order.customer ? ` · ${state.order.customer}` : ''}
          </span>
          <span className="pickup-verify__collect">
            {state.order.payAtPickup
              ? `Collect ${formatMoney(state.order.amount, currency)} from the customer`
              : 'Already paid online — nothing to collect'}
          </span>
        </div>
      )}
    </section>
  )
}
