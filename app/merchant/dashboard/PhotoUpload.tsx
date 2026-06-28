'use client'

import { useRef, useState } from 'react'
import { createClient } from '@/lib/supabase'

interface Props {
  name: string            // hidden form field name (e.g. "photo_url")
  userId: string | null
  initialUrl?: string | null
  hint?: string
}

export default function PhotoUpload({ name, userId, initialUrl, hint }: Props) {
  const [url, setUrl] = useState(initialUrl ?? '')
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setError('')
    if (!file.type.startsWith('image/')) { setError('Please choose an image file.'); return }
    if (file.size > 5 * 1024 * 1024) { setError('Image must be under 5 MB.'); return }
    if (!userId) { setError('Sign in to upload a photo.'); return }

    setUploading(true)
    try {
      const supabase = createClient()
      const ext = file.name.split('.').pop()
      const path = `${userId}/box-${Date.now()}.${ext}`
      const { error: upErr } = await supabase.storage.from('store-photos').upload(path, file, { upsert: true })
      if (upErr) throw upErr
      const { data } = supabase.storage.from('store-photos').getPublicUrl(path)
      setUrl(data.publicUrl)
    } catch {
      setError('Upload failed. Make sure the store-photos bucket exists in Supabase.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="photo-upload">
      <input type="hidden" name={name} value={url} />

      {url ? (
        <div className="photo-upload__preview">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt="Box photo" onError={() => setUrl('')} />
          <button type="button" className="photo-upload__remove" onClick={() => setUrl('')} aria-label="Remove photo">×</button>
        </div>
      ) : (
        <button type="button" className="photo-upload__drop" onClick={() => fileRef.current?.click()} disabled={uploading}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
          </svg>
          <span>{uploading ? 'Uploading…' : 'Upload a photo'}</span>
          <span className="photo-upload__sub">From your library or camera · max 5 MB</span>
        </button>
      )}

      {url && (
        <button type="button" className="photo-upload__change" onClick={() => fileRef.current?.click()} disabled={uploading}>
          {uploading ? 'Uploading…' : 'Replace photo'}
        </button>
      )}

      <input ref={fileRef} type="file" accept="image/*" hidden onChange={handleFile} />
      {hint && !error && <span className="merchant-field__hint">{hint}</span>}
      {error && <span className="avatar-picker__error">{error}</span>}
    </div>
  )
}
