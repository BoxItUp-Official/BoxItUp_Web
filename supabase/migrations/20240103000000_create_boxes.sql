-- Surprise boxes listed by merchants
create table if not exists public.boxes (
  id             uuid primary key default gen_random_uuid(),
  merchant_id    uuid not null references public.merchants(id) on delete cascade,
  name           text not null,
  description    text,
  price          numeric(10,2) not null,
  original_value numeric(10,2),
  quantity       int not null default 5,
  pickup_start   time not null default '17:00',
  pickup_end     time not null default '19:00',
  is_active      boolean not null default true,
  created_at     timestamptz not null default now()
);

alter table public.boxes enable row level security;

-- Merchants can only read/write their own boxes
create policy "Merchants manage own boxes"
  on public.boxes
  for all
  using  (merchant_id = auth.uid())
  with check (merchant_id = auth.uid());
