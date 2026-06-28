-- ── Merchant preferences: currency, region, and app settings ─────────────────
-- currency/region are top-level so they can be read across the portal (連動);
-- everything else (notifications, timezone, store-ops) lives in a jsonb blob.

alter table public.merchants
  add column if not exists currency    text  not null default 'TWD',
  add column if not exists region      text  not null default 'TW',
  add column if not exists preferences jsonb not null default '{}'::jsonb;
