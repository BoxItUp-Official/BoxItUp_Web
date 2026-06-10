-- Add photo, day-of-week schedule, and tags to boxes
alter table public.boxes
  add column if not exists photo_url      text,
  add column if not exists available_days text[] not null default array['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
  add column if not exists tags           text[] not null default array[]::text[];

-- Add store photo to merchants
alter table public.merchants
  add column if not exists photo_url text;
