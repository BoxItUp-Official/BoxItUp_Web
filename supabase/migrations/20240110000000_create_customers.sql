create table if not exists customers (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  onboarding_complete boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table customers enable row level security;

create policy "customers select own"
  on customers for select using (auth.uid() = id);

create policy "customers insert own"
  on customers for insert with check (auth.uid() = id);

create policy "customers update own"
  on customers for update using (auth.uid() = id);

-- reuses update_updated_at() defined in 20240102000000_create_merchants.sql
create trigger customers_updated_at
  before update on customers
  for each row execute function update_updated_at();
