create table if not exists products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  category text,
  price numeric not null,
  old_price numeric,
  image_url text,
  affiliate_url text not null,
  created_at timestamp with time zone default now()
);
