-- ── Business early-access leads ──────────────────────────────────────────────
-- Stores interested in partnering before the merchant platform opens publicly.

create table if not exists public.business_leads (
  id           uuid primary key default gen_random_uuid(),
  store_name   text not null,
  contact_name text not null,
  email        text not null,
  phone        text,
  city         text,
  category     text,
  notes        text,
  created_at   timestamptz not null default now()
);

alter table public.business_leads enable row level security;

-- Anyone (anon) may submit an early-access request; nobody can read them back
-- from the client. Read access happens through the service role / dashboard.
create policy "anyone can submit a business lead"
  on public.business_leads for insert
  with check (true);
