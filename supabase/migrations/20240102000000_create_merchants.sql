create table if not exists merchants (
  id uuid primary key references auth.users(id) on delete cascade,
  store_name text,
  category text,
  address text,
  city text,
  phone text,
  line_id text,
  description text,
  onboarding_complete boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table merchants enable row level security;

create policy "merchants select own"
  on merchants for select using (auth.uid() = id);

create policy "merchants insert own"
  on merchants for insert with check (auth.uid() = id);

create policy "merchants update own"
  on merchants for update using (auth.uid() = id);

-- auto-update updated_at
create or replace function update_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger merchants_updated_at
  before update on merchants
  for each row execute function update_updated_at();
