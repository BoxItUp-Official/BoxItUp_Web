create table if not exists contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  inquiry_type text not null,
  organization text,
  message text not null,
  created_at timestamptz not null default now()
);

-- Only the service role can read; anonymous users can insert
alter table contact_submissions enable row level security;

create policy "anon can insert"
  on contact_submissions for insert
  to anon
  with check (true);
