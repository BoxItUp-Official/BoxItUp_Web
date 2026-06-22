-- ── Storage bucket for merchant store photos ─────────────────────────────────
-- Run once. Creates a public bucket and policies so merchants can upload their
-- own store photo and anyone can view it on listings.

insert into storage.buckets (id, name, public)
values ('store-photos', 'store-photos', true)
on conflict (id) do nothing;

-- Drop first so this file is safe to re-run
drop policy if exists "store photos are public"        on storage.objects;
drop policy if exists "merchants upload own store photo" on storage.objects;
drop policy if exists "merchants update own store photo" on storage.objects;
drop policy if exists "merchants delete own store photo" on storage.objects;

-- Public read
create policy "store photos are public"
  on storage.objects for select
  using (bucket_id = 'store-photos');

-- Authenticated users can upload to the bucket
create policy "merchants upload own store photo"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'store-photos');

-- Authenticated users can replace/remove their uploads
create policy "merchants update own store photo"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'store-photos');

create policy "merchants delete own store photo"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'store-photos');
