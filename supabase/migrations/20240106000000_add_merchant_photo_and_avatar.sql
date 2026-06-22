-- ── Merchant profile: image, avatar, and additional store details ────────────
-- The profile form already writes photo_url, but the merchants table never had
-- the column. Add it (idempotent) plus an avatar_icon override and the extra
-- store-profile fields (contact, online presence, tax id, business hours).

alter table public.merchants
  add column if not exists photo_url         text,
  add column if not exists avatar_icon       text,   -- e.g. 'Café' to override category icon
  add column if not exists contact_name      text,
  add column if not exists website           text,
  add column if not exists instagram         text,
  add column if not exists business_reg_no   text,   -- 統一編號
  add column if not exists business_hours    jsonb;  -- { mon: {open,start,end}, ... }
