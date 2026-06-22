'use client'

import { useRef, useState } from 'react'
import { createClient } from '@/lib/supabase'
import CategoryIcon, { ICON_KEYS, hasCategoryIcon } from '../CategoryIcon'

interface Props {
  category: string | null
  storeName: string
  userId: string | null
  initialPhotoUrl?: string | null
  initialAvatarIcon?: string | null
}

export default function AvatarPicker({ category, storeName, userId, initialPhotoUrl, initialAvatarIcon }: Props) {
  const [photoUrl, setPhotoUrl] = useState(initialPhotoUrl ?? '')
  const [avatarIcon, setAvatarIcon] = useState(initialAvatarIcon ?? '')
  const [showIcons, setShowIcons] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  // What the preview shows: photo > chosen icon > category icon > letter
  const effectiveIcon = avatarIcon || category
  const initial = storeName.charAt(0).toUpperCase() || 'S'

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
      const path = `${userId}/store-${Date.now()}.${ext}`
      const { error: upErr } = await supabase.storage.from('store-photos').upload(path, file, { upsert: true })
      if (upErr) throw upErr
      const { data } = supabase.storage.from('store-photos').getPublicUrl(path)
      setPhotoUrl(data.publicUrl)
      setAvatarIcon('')
      setShowIcons(false)
    } catch {
      setError('Upload failed. Make sure the store-photos bucket exists.')
    } finally {
      setUploading(false)
    }
  }

  function chooseIcon(key: string) {
    setAvatarIcon(key)
    setPhotoUrl('')
    setShowIcons(false)
  }

  function followCategory() {
    setAvatarIcon('')
    setPhotoUrl('')
    setShowIcons(false)
  }

  return (
    <div className="avatar-picker">
      {/* Hidden inputs submitted with the form */}
      <input type="hidden" name="photo_url" value={photoUrl} />
      <input type="hidden" name="avatar_icon" value={avatarIcon} />

      <div className="avatar-picker__row">
        {/* Preview */}
        <div className="avatar-picker__preview">
          {photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={photoUrl} alt="Store avatar" onError={() => setPhotoUrl('')} />
          ) : hasCategoryIcon(effectiveIcon) ? (
            <CategoryIcon category={effectiveIcon} size={34} />
          ) : (
            <span className="avatar-picker__initial">{initial}</span>
          )}
        </div>

        {/* Actions */}
        <div className="avatar-picker__actions">
          <div className="avatar-picker__btns">
            <button type="button" className="btn btn--secondary btn--sm" onClick={() => fileRef.current?.click()} disabled={uploading}>
              {uploading ? 'Uploading…' : 'Upload photo'}
            </button>
            <button type="button" className="btn btn--secondary btn--sm" onClick={() => setShowIcons((v) => !v)}>
              Choose icon
            </button>
            {(photoUrl || avatarIcon) && (
              <button type="button" className="avatar-picker__reset" onClick={followCategory}>
                Reset to category
              </button>
            )}
          </div>
          <p className="avatar-picker__hint">
            Defaults to your category icon. Upload a photo (max 5 MB) or pick an icon.
          </p>
          {error && <p className="avatar-picker__error">{error}</p>}
        </div>

        <input ref={fileRef} type="file" accept="image/*" hidden onChange={handleFile} />
      </div>

      {/* Icon grid */}
      {showIcons && (
        <div className="avatar-picker__grid">
          <button
            type="button"
            className={`avatar-picker__icon avatar-picker__icon--follow${!avatarIcon && !photoUrl ? ' avatar-picker__icon--active' : ''}`}
            onClick={followCategory}
            title="Follow category"
          >
            {hasCategoryIcon(category) ? <CategoryIcon category={category} size={22} /> : <span>{initial}</span>}
            <span className="avatar-picker__icon-label">Category</span>
          </button>
          {ICON_KEYS.map((key) => (
            <button
              key={key}
              type="button"
              className={`avatar-picker__icon${avatarIcon === key ? ' avatar-picker__icon--active' : ''}`}
              onClick={() => chooseIcon(key)}
              title={key}
            >
              <CategoryIcon category={key} size={22} />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
