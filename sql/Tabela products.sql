create table public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  category text,
  price numeric,
  discount numeric,
  image_url text,
  affiliate_url text not null,
  created_at timestamp with time zone default now()
);
