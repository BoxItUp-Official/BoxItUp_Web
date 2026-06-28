-- ── Box allergens ────────────────────────────────────────────────────────────
-- Allergens are surfaced separately from tags/description so customers can
-- filter and see clear allergen info.

alter table public.boxes
  add column if not exists allergens text[] not null default array[]::text[];
