'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

// Re-renders the page whenever one of this store's orders or listings changes,
// so a new reservation from the app appears without a reload. Renders nothing.
export default function LiveRefresh({ merchantId }: { merchantId: string }) {
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()
    let timer: ReturnType<typeof setTimeout> | undefined
    // Several changes usually arrive together (order + stock); refresh once.
    const refresh = () => {
      clearTimeout(timer)
      timer = setTimeout(() => router.refresh(), 300)
    }
    const filter = `merchant_id=eq.${merchantId}`
    const channel = supabase
      .channel(`merchant-live:${merchantId}:${Math.random().toString(36).slice(2)}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders', filter }, refresh)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'bags', filter }, refresh)
      .subscribe()
    // Holds expire on a timer in Postgres; refresh now and then to show it.
    const interval = setInterval(() => router.refresh(), 60_000)

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
      supabase.removeChannel(channel)
    }
  }, [merchantId, router])

  return null
}
