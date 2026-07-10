-- GrowX Fashion (by varunexa) - Supabase PostgreSQL Database Schema
-- File: supabase_schema.sql

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. CATEGORIES TABLE
create table public.categories (
    id uuid default uuid_generate_v4() primary key,
    name varchar(255) not null,
    slug varchar(255) not null unique,
    description text,
    parent_id uuid references public.categories(id) on delete cascade,
    image_url text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. USERS TABLE (Linked with Supabase auth.users)
create table public.users (
    id uuid references auth.users on delete cascade primary key,
    email varchar(255) not null unique,
    first_name varchar(255),
    last_name varchar(255),
    phone varchar(50),
    avatar_url text,
    role varchar(50) default 'customer'::character varying check (role in ('customer', 'admin', 'staff')),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. PRODUCTS TABLE
create table public.products (
    id uuid default uuid_generate_v4() primary key,
    name varchar(255) not null,
    slug varchar(255) not null unique,
    description text,
    price decimal(10, 2) not null,
    compare_at_price decimal(10, 2), -- Original price for showing discount
    category_id uuid references public.categories(id) on delete set null,
    images text[] default '{}'::text[], -- Array of image URLs from Supabase Storage
    video_url text,
    model_3d_url text, -- For 360° view or 3D product rendering
    sizes varchar(50)[] default '{}'::varchar[], -- e.g., {'S', 'M', 'L', 'XL'}
    colors varchar(50)[] default '{}'::varchar[], -- e.g., {'Red', 'Black', 'Blue'}
    fabric varchar(255), -- e.g., Linen, Cotton, Premium Silk
    brand varchar(255) default 'GrowX Fashion',
    weight_g integer, -- Weight in grams
    tags varchar(100)[] default '{}'::varchar[], -- For search and AI recommendation tags
    rating_avg decimal(3, 2) default 0.00,
    reviews_count integer default 0,
    is_featured boolean default false,
    is_new_arrival boolean default false,
    is_active boolean default true,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. INVENTORY TABLE
create table public.inventory (
    id uuid default uuid_generate_v4() primary key,
    product_id uuid references public.products(id) on delete cascade not null,
    size varchar(50) not null,
    color varchar(50) not null,
    sku varchar(100) unique not null,
    quantity_available integer default 0 check (quantity_available >= 0),
    reserved_quantity integer default 0 check (reserved_quantity >= 0),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    unique(product_id, size, color)
);

-- 5. COUPONS TABLE
create table public.coupons (
    id uuid default uuid_generate_v4() primary key,
    code varchar(50) unique not null,
    discount_type varchar(50) not null check (discount_type in ('percentage', 'fixed_amount')),
    discount_value decimal(10, 2) not null,
    min_order_value decimal(10, 2) default 0.00,
    max_discount_amount decimal(10, 2), -- Useful for percentage discounts
    starts_at timestamp with time zone,
    expires_at timestamp with time zone,
    usage_limit integer, -- Max usages overall
    usage_count integer default 0,
    is_active boolean default true,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. ADDRESSES TABLE
create table public.addresses (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references public.users(id) on delete cascade not null,
    address_line1 text not null,
    address_line2 text,
    city varchar(100) not null,
    state varchar(100) not null,
    postal_code varchar(20) not null,
    country varchar(100) not null,
    phone_number varchar(50) not null,
    is_default boolean default false,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 7. ORDERS TABLE
create table public.orders (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references public.users(id) on delete set null,
    order_number varchar(100) unique not null,
    status varchar(50) default 'pending'::character varying check (status in ('pending', 'processing', 'shipped', 'delivered', 'cancelled', 'returned', 'refunded')),
    subtotal decimal(10, 2) not null,
    discount_amount decimal(10, 2) default 0.00,
    tax_amount decimal(10, 2) default 0.00,
    shipping_cost decimal(10, 2) default 0.00,
    total_amount decimal(10, 2) not null,
    coupon_id uuid references public.coupons(id) on delete set null,
    shipping_address_id uuid references public.addresses(id) on delete set null,
    billing_address_id uuid references public.addresses(id) on delete set null,
    tracking_number varchar(255),
    carrier varchar(255),
    estimated_delivery timestamp with time zone,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 8. ORDER ITEMS TABLE
create table public.order_items (
    id uuid default uuid_generate_v4() primary key,
    order_id uuid references public.orders(id) on delete cascade not null,
    product_id uuid references public.products(id) on delete set null,
    product_name varchar(255) not null,
    size varchar(50) not null,
    color varchar(50) not null,
    sku varchar(100) not null,
    quantity integer not null check (quantity > 0),
    unit_price decimal(10, 2) not null,
    total_price decimal(10, 2) not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 9. PAYMENTS TABLE
create table public.payments (
    id uuid default uuid_generate_v4() primary key,
    order_id uuid references public.orders(id) on delete set null not null,
    payment_method varchar(100) not null check (payment_method in ('stripe', 'razorpay', 'cod')),
    payment_gateway_id varchar(255), -- Stripe PaymentIntent ID or Razorpay Order/Payment ID
    status varchar(50) default 'pending' check (status in ('pending', 'captured', 'failed', 'refunded')),
    amount decimal(10, 2) not null,
    currency varchar(10) default 'INR',
    error_message text,
    raw_response jsonb, -- Log gateway details
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 10. CART TABLE (Persistent shopping cart)
create table public.cart (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references public.users(id) on delete cascade unique, -- One cart per user
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 10.1. CART ITEMS TABLE
create table public.cart_items (
    id uuid default uuid_generate_v4() primary key,
    cart_id uuid references public.cart(id) on delete cascade not null,
    product_id uuid references public.products(id) on delete cascade not null,
    size varchar(50) not null,
    color varchar(50) not null,
    quantity integer default 1 check (quantity > 0),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    unique(cart_id, product_id, size, color)
);

-- 11. WISHLIST TABLE
create table public.wishlist (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references public.users(id) on delete cascade not null,
    product_id uuid references public.products(id) on delete cascade not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    unique(user_id, product_id)
);

-- 12. REVIEWS TABLE
create table public.reviews (
    id uuid default uuid_generate_v4() primary key,
    product_id uuid references public.products(id) on delete cascade not null,
    user_id uuid references public.users(id) on delete cascade not null,
    rating integer not null check (rating >= 1 and rating <= 5),
    comment text,
    title varchar(255),
    images text[] default '{}'::text[], -- Review photos
    is_verified_purchase boolean default false,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    unique(product_id, user_id)
);

-- 13. NOTIFICATIONS TABLE
create table public.notifications (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references public.users(id) on delete cascade not null,
    title varchar(255) not null,
    message text not null,
    type varchar(100) default 'info', -- 'order_update', 'promo', 'security'
    is_read boolean default false,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);


-- Row Level Security (RLS) & Policies
alter table public.categories enable row level security;
alter table public.users enable row level security;
alter table public.products enable row level security;
alter table public.inventory enable row level security;
alter table public.coupons enable row level security;
alter table public.addresses enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.payments enable row level security;
alter table public.cart enable row level security;
alter table public.cart_items enable row level security;
alter table public.wishlist enable row level security;
alter table public.reviews enable row level security;
alter table public.notifications enable row level security;

-- Public READ Access Policies
create policy "Allow public read access to categories" on public.categories for select using (true);
create policy "Allow public read access to products" on public.products for select using (is_active = true);
create policy "Allow public read access to active coupons" on public.coupons for select using (is_active = true);
create policy "Allow public read access to reviews" on public.reviews for select using (true);

-- User Profile Policies
create policy "Allow user read current profile" on public.users for select using (auth.uid() = id);
create policy "Allow user update current profile" on public.users for update using (auth.uid() = id);

-- Address Policies
create policy "Allow user access addresses" on public.addresses for all using (auth.uid() = user_id);

-- Cart Policies
create policy "Allow user access cart" on public.cart for all using (auth.uid() = user_id);
create policy "Allow user access cart items" on public.cart_items for all using (
    exists (select 1 from public.cart where cart.id = cart_items.cart_id and cart.user_id = auth.uid())
);

-- Wishlist Policies
create policy "Allow user access wishlist" on public.wishlist for all using (auth.uid() = user_id);

-- Orders Policies
create policy "Allow user read own orders" on public.orders for select using (auth.uid() = user_id);
create policy "Allow user insert own orders" on public.orders for insert with check (auth.uid() = user_id);
create policy "Allow user read own order items" on public.order_items for select using (
    exists (select 1 from public.orders where orders.id = order_items.order_id and orders.user_id = auth.uid())
);

-- Reviews Write Policies
create policy "Allow registered users to insert reviews" on public.reviews for insert with check (auth.uid() = user_id);
create policy "Allow review creator to update/delete" on public.reviews for update using (auth.uid() = user_id);

-- Admin Global Access (Example trigger / function to check admin role)
create or replace function public.is_admin()
returns boolean as $$
begin
    return exists (
        select 1 from public.users
        where id = auth.uid() and role = 'admin'
    );
end;
$$ language plpgsql security definer;

-- Create policy for Admin overrides
create policy "Admin master access categories" on public.categories for all using (public.is_admin());
create policy "Admin master access products" on public.products for all using (public.is_admin());
create policy "Admin master access inventory" on public.inventory for all using (public.is_admin());
create policy "Admin master access coupons" on public.coupons for all using (public.is_admin());
create policy "Admin master access orders" on public.orders for all using (public.is_admin());
create policy "Admin master access payments" on public.payments for all using (public.is_admin());

-- Automated triggers to sync users table when a user registers on Supabase Auth
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email, first_name, last_name, avatar_url, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'first_name', ''),
    coalesce(new.raw_user_meta_data->>'last_name', ''),
    coalesce(new.raw_user_meta_data->>'avatar_url', ''),
    'customer'
  );
  
  -- Create empty cart for new user
  insert into public.cart (user_id) values (new.id);
  
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
