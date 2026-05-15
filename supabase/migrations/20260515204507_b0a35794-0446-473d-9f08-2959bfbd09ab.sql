ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS cost_price numeric DEFAULT 0,
  ADD COLUMN IF NOT EXISTS offline_sold integer DEFAULT 0;