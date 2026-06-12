-- ── Orders table ──────────────────────────────────────────────────────────────
-- Created when a customer places a reservation via the consumer app.
-- Merchants manage status (pending → picked_up / cancelled) from the dashboard.

create table if not exists public.orders (
  id                   uuid primary key default gen_random_uuid(),
  -- Relations
  box_id               uuid references public.boxes(id) on delete set null,
  merchant_id          uuid not null references public.merchants(id) on delete cascade,
  -- Customer (populated by consumer app or manually)
  customer_name        text,
  customer_phone       text,
  customer_email       text,
  -- Pickup
  pickup_code          text not null default upper(left(replace(gen_random_uuid()::text, '-', ''), 6)),
  scheduled_pickup_start time,
  scheduled_pickup_end   time,
  -- Pricing (snapshot at time of order)
  price                numeric(10, 2) not null,
  -- Status lifecycle: pending → picked_up | cancelled
  status               text not null default 'pending'
                       check (status in ('pending', 'picked_up', 'cancelled')),
  notes                text,
  -- Audit timestamps
  picked_up_at         timestamptz,
  cancelled_at         timestamptz,
  created_at           timestamptz not null default now()
);

-- Indexes for common queries
create index if not exists orders_merchant_id_idx  on public.orders (merchant_id);
create index if not exists orders_status_idx        on public.orders (status);
create index if not exists orders_created_at_idx    on public.orders (created_at desc);

-- ── Row-Level Security ────────────────────────────────────────────────────────
alter table public.orders enable row level security;

-- Merchants can view their own orders
create policy "merchants_select_own_orders"
  on public.orders for select
  using (auth.uid() = merchant_id);

-- Merchants can update status of their own orders
create policy "merchants_update_own_orders"
  on public.orders for update
  using (auth.uid() = merchant_id)
  with check (auth.uid() = merchant_id);

-- Service role (consumer app, webhooks) can insert orders
create policy "service_insert_orders"
  on public.orders for insert
  with check (true);

-- ── Box snapshot on order: store box name at time of order ───────────────────
alter table public.orders
  add column if not exists box_name text;
