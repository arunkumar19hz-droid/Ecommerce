-- SQL Seed File for Supabase Products Table (65 Products - Men & Women)
-- File: supabase_seed_products.sql
DELETE FROM public.products WHERE brand LIKE 'GrowX%';

INSERT INTO public.products (id, name, slug, description, price, compare_at_price, images, sizes, colors, fabric, brand, rating_avg, reviews_count, is_featured, is_new_arrival, is_active)
VALUES (
    uuid_generate_v4(), 
    'Men's Premium Ribbed Knit Polo & Trouser Outfit (Set 1)', 
    'mens-premium-ribbed-knit-polo-and-trouser-outfit-set-1', 
    'Luxury curated e-commerce set featuring custom garments, perfectly balanced for urban silhouettes and everyday comfort.', 
    1599.0, 
    2079, 
    ARRAY['/images/products/photo_10_2026-07-10_10-23-48.jpg'], 
    ARRAY['S', 'M', 'L', 'XL'], 
    ARRAY['Black', 'White', 'Beige', 'Blue', 'Green'], 
    'Knit Cotton', 
    'GrowX Knitwear', 
    4.5, 
    10, 
    true, 
    true, 
    true
);

INSERT INTO public.products (id, name, slug, description, price, compare_at_price, images, sizes, colors, fabric, brand, rating_avg, reviews_count, is_featured, is_new_arrival, is_active)
VALUES (
    uuid_generate_v4(), 
    'Men's Premium Ribbed Knit Polo & Trouser Outfit (Set 2)', 
    'mens-premium-ribbed-knit-polo-and-trouser-outfit-set-2', 
    'Luxury curated e-commerce set featuring custom garments, perfectly balanced for urban silhouettes and everyday comfort.', 
    1599.0, 
    2079, 
    ARRAY['/images/products/photo_11_2026-07-10_10-23-48.jpg'], 
    ARRAY['S', 'M', 'L', 'XL'], 
    ARRAY['Black', 'White', 'Beige', 'Blue', 'Green'], 
    'Knit Cotton', 
    'GrowX Knitwear', 
    4.6, 
    13, 
    false, 
    false, 
    true
);

INSERT INTO public.products (id, name, slug, description, price, compare_at_price, images, sizes, colors, fabric, brand, rating_avg, reviews_count, is_featured, is_new_arrival, is_active)
VALUES (
    uuid_generate_v4(), 
    'Men's Premium Ribbed Knit Polo & Trouser Outfit (Set 3)', 
    'mens-premium-ribbed-knit-polo-and-trouser-outfit-set-3', 
    'Luxury curated e-commerce set featuring custom garments, perfectly balanced for urban silhouettes and everyday comfort.', 
    1599.0, 
    2079, 
    ARRAY['/images/products/photo_12_2026-07-10_10-23-48.jpg'], 
    ARRAY['S', 'M', 'L', 'XL'], 
    ARRAY['Black', 'White', 'Beige', 'Blue', 'Green'], 
    'Knit Cotton', 
    'GrowX Knitwear', 
    4.7, 
    16, 
    false, 
    false, 
    true
);

INSERT INTO public.products (id, name, slug, description, price, compare_at_price, images, sizes, colors, fabric, brand, rating_avg, reviews_count, is_featured, is_new_arrival, is_active)
VALUES (
    uuid_generate_v4(), 
    'Men's Premium Ribbed Knit Polo & Trouser Outfit (Set 4)', 
    'mens-premium-ribbed-knit-polo-and-trouser-outfit-set-4', 
    'Luxury curated e-commerce set featuring custom garments, perfectly balanced for urban silhouettes and everyday comfort.', 
    1599.0, 
    2079, 
    ARRAY['/images/products/photo_13_2026-07-10_10-23-48.jpg'], 
    ARRAY['S', 'M', 'L', 'XL'], 
    ARRAY['Black', 'White', 'Beige', 'Blue', 'Green'], 
    'Knit Cotton', 
    'GrowX Knitwear', 
    4.8, 
    19, 
    false, 
    true, 
    true
);

INSERT INTO public.products (id, name, slug, description, price, compare_at_price, images, sizes, colors, fabric, brand, rating_avg, reviews_count, is_featured, is_new_arrival, is_active)
VALUES (
    uuid_generate_v4(), 
    'Men's Premium Ribbed Knit Polo & Trouser Outfit (Set 5)', 
    'mens-premium-ribbed-knit-polo-and-trouser-outfit-set-5', 
    'Luxury curated e-commerce set featuring custom garments, perfectly balanced for urban silhouettes and everyday comfort.', 
    1599.0, 
    2079, 
    ARRAY['/images/products/photo_14_2026-07-10_10-23-48.jpg'], 
    ARRAY['S', 'M', 'L', 'XL'], 
    ARRAY['Black', 'White', 'Beige', 'Blue', 'Green'], 
    'Knit Cotton', 
    'GrowX Knitwear', 
    4.9, 
    22, 
    false, 
    false, 
    true
);

INSERT INTO public.products (id, name, slug, description, price, compare_at_price, images, sizes, colors, fabric, brand, rating_avg, reviews_count, is_featured, is_new_arrival, is_active)
VALUES (
    uuid_generate_v4(), 
    'Men's Oxford Tailored Long-Sleeve Outfit (Set 6)', 
    'mens-oxford-tailored-long-sleeve-outfit-set-6', 
    'Luxury curated e-commerce set featuring custom garments, perfectly balanced for urban silhouettes and everyday comfort.', 
    1799.0, 
    2339, 
    ARRAY['/images/products/photo_15_2026-07-10_10-23-48.jpg'], 
    ARRAY['S', 'M', 'L', 'XL'], 
    ARRAY['Black', 'White', 'Beige', 'Blue', 'Green'], 
    'Oxford Cotton', 
    'GrowX Tailored', 
    5.0, 
    25, 
    true, 
    false, 
    true
);

INSERT INTO public.products (id, name, slug, description, price, compare_at_price, images, sizes, colors, fabric, brand, rating_avg, reviews_count, is_featured, is_new_arrival, is_active)
VALUES (
    uuid_generate_v4(), 
    'Men's Oxford Tailored Long-Sleeve Outfit (Set 7)', 
    'mens-oxford-tailored-long-sleeve-outfit-set-7', 
    'Luxury curated e-commerce set featuring custom garments, perfectly balanced for urban silhouettes and everyday comfort.', 
    1799.0, 
    2339, 
    ARRAY['/images/products/photo_16_2026-07-10_10-23-48.jpg'], 
    ARRAY['S', 'M', 'L', 'XL'], 
    ARRAY['Black', 'White', 'Beige', 'Blue', 'Green'], 
    'Oxford Cotton', 
    'GrowX Tailored', 
    4.5, 
    28, 
    false, 
    true, 
    true
);

INSERT INTO public.products (id, name, slug, description, price, compare_at_price, images, sizes, colors, fabric, brand, rating_avg, reviews_count, is_featured, is_new_arrival, is_active)
VALUES (
    uuid_generate_v4(), 
    'Men's Oxford Tailored Long-Sleeve Outfit (Set 8)', 
    'mens-oxford-tailored-long-sleeve-outfit-set-8', 
    'Luxury curated e-commerce set featuring custom garments, perfectly balanced for urban silhouettes and everyday comfort.', 
    1799.0, 
    2339, 
    ARRAY['/images/products/photo_17_2026-07-10_10-23-48.jpg'], 
    ARRAY['S', 'M', 'L', 'XL'], 
    ARRAY['Black', 'White', 'Beige', 'Blue', 'Green'], 
    'Oxford Cotton', 
    'GrowX Tailored', 
    4.6, 
    31, 
    false, 
    false, 
    true
);

INSERT INTO public.products (id, name, slug, description, price, compare_at_price, images, sizes, colors, fabric, brand, rating_avg, reviews_count, is_featured, is_new_arrival, is_active)
VALUES (
    uuid_generate_v4(), 
    'Men's Oxford Tailored Long-Sleeve Outfit (Set 9)', 
    'mens-oxford-tailored-long-sleeve-outfit-set-9', 
    'Luxury curated e-commerce set featuring custom garments, perfectly balanced for urban silhouettes and everyday comfort.', 
    1799.0, 
    2339, 
    ARRAY['/images/products/photo_18_2026-07-10_10-23-48.jpg'], 
    ARRAY['S', 'M', 'L', 'XL'], 
    ARRAY['Black', 'White', 'Beige', 'Blue', 'Green'], 
    'Oxford Cotton', 
    'GrowX Tailored', 
    4.7, 
    34, 
    false, 
    false, 
    true
);

INSERT INTO public.products (id, name, slug, description, price, compare_at_price, images, sizes, colors, fabric, brand, rating_avg, reviews_count, is_featured, is_new_arrival, is_active)
VALUES (
    uuid_generate_v4(), 
    'Men's Oxford Tailored Long-Sleeve Outfit (Set 10)', 
    'mens-oxford-tailored-long-sleeve-outfit-set-10', 
    'Luxury curated e-commerce set featuring custom garments, perfectly balanced for urban silhouettes and everyday comfort.', 
    1799.0, 
    2339, 
    ARRAY['/images/products/photo_19_2026-07-10_10-23-48.jpg'], 
    ARRAY['S', 'M', 'L', 'XL'], 
    ARRAY['Black', 'White', 'Beige', 'Blue', 'Green'], 
    'Oxford Cotton', 
    'GrowX Tailored', 
    4.8, 
    37, 
    false, 
    true, 
    true
);

INSERT INTO public.products (id, name, slug, description, price, compare_at_price, images, sizes, colors, fabric, brand, rating_avg, reviews_count, is_featured, is_new_arrival, is_active)
VALUES (
    uuid_generate_v4(), 
    'Men's Luxury Plaid Flannel Shirt & Chino Combo (Set 11)', 
    'mens-luxury-plaid-flannel-shirt-and-chino-combo-set-11', 
    'Luxury curated e-commerce set featuring custom garments, perfectly balanced for urban silhouettes and everyday comfort.', 
    1899.0, 
    2469, 
    ARRAY['/images/products/photo_1_2026-07-10_10-23-48.jpg'], 
    ARRAY['S', 'M', 'L', 'XL'], 
    ARRAY['Black', 'White', 'Beige', 'Blue', 'Green'], 
    'Premium Flannel', 
    'GrowX Premium', 
    4.9, 
    40, 
    true, 
    false, 
    true
);

INSERT INTO public.products (id, name, slug, description, price, compare_at_price, images, sizes, colors, fabric, brand, rating_avg, reviews_count, is_featured, is_new_arrival, is_active)
VALUES (
    uuid_generate_v4(), 
    'Men's Luxury Plaid Flannel Shirt & Chino Combo (Set 12)', 
    'mens-luxury-plaid-flannel-shirt-and-chino-combo-set-12', 
    'Luxury curated e-commerce set featuring custom garments, perfectly balanced for urban silhouettes and everyday comfort.', 
    1899.0, 
    2469, 
    ARRAY['/images/products/photo_2026-07-10_10-20-11.jpg'], 
    ARRAY['S', 'M', 'L', 'XL'], 
    ARRAY['Black', 'White', 'Beige', 'Blue', 'Green'], 
    'Premium Flannel', 
    'GrowX Premium', 
    5.0, 
    43, 
    false, 
    false, 
    true
);

INSERT INTO public.products (id, name, slug, description, price, compare_at_price, images, sizes, colors, fabric, brand, rating_avg, reviews_count, is_featured, is_new_arrival, is_active)
VALUES (
    uuid_generate_v4(), 
    'Men's Oxford Tailored Long-Sleeve Outfit (Set 13)', 
    'mens-oxford-tailored-long-sleeve-outfit-set-13', 
    'Luxury curated e-commerce set featuring custom garments, perfectly balanced for urban silhouettes and everyday comfort.', 
    1799.0, 
    2339, 
    ARRAY['/images/products/photo_20_2026-07-10_10-23-48.jpg'], 
    ARRAY['S', 'M', 'L', 'XL'], 
    ARRAY['Black', 'White', 'Beige', 'Blue', 'Green'], 
    'Oxford Cotton', 
    'GrowX Tailored', 
    4.5, 
    46, 
    false, 
    true, 
    true
);

INSERT INTO public.products (id, name, slug, description, price, compare_at_price, images, sizes, colors, fabric, brand, rating_avg, reviews_count, is_featured, is_new_arrival, is_active)
VALUES (
    uuid_generate_v4(), 
    'Men's Oxford Tailored Long-Sleeve Outfit (Set 14)', 
    'mens-oxford-tailored-long-sleeve-outfit-set-14', 
    'Luxury curated e-commerce set featuring custom garments, perfectly balanced for urban silhouettes and everyday comfort.', 
    1799.0, 
    2339, 
    ARRAY['/images/products/photo_21_2026-07-10_10-23-48.jpg'], 
    ARRAY['S', 'M', 'L', 'XL'], 
    ARRAY['Black', 'White', 'Beige', 'Blue', 'Green'], 
    'Oxford Cotton', 
    'GrowX Tailored', 
    4.6, 
    49, 
    false, 
    false, 
    true
);

INSERT INTO public.products (id, name, slug, description, price, compare_at_price, images, sizes, colors, fabric, brand, rating_avg, reviews_count, is_featured, is_new_arrival, is_active)
VALUES (
    uuid_generate_v4(), 
    'Men's Oxford Tailored Long-Sleeve Outfit (Set 15)', 
    'mens-oxford-tailored-long-sleeve-outfit-set-15', 
    'Luxury curated e-commerce set featuring custom garments, perfectly balanced for urban silhouettes and everyday comfort.', 
    1799.0, 
    2339, 
    ARRAY['/images/products/photo_22_2026-07-10_10-23-49.jpg'], 
    ARRAY['S', 'M', 'L', 'XL'], 
    ARRAY['Black', 'White', 'Beige', 'Blue', 'Green'], 
    'Oxford Cotton', 
    'GrowX Tailored', 
    4.7, 
    52, 
    false, 
    false, 
    true
);

INSERT INTO public.products (id, name, slug, description, price, compare_at_price, images, sizes, colors, fabric, brand, rating_avg, reviews_count, is_featured, is_new_arrival, is_active)
VALUES (
    uuid_generate_v4(), 
    'Men's Graphic Dragon & Streetwear Baggy Tee Set (Set 16)', 
    'mens-graphic-dragon-and-streetwear-baggy-tee-set-set-16', 
    'Luxury curated e-commerce set featuring custom garments, perfectly balanced for urban silhouettes and everyday comfort.', 
    1299.0, 
    1689, 
    ARRAY['/images/products/photo_23_2026-07-10_10-23-49.jpg'], 
    ARRAY['S', 'M', 'L', 'XL'], 
    ARRAY['Black', 'White', 'Beige', 'Blue', 'Green'], 
    'Heavyweight Cotton', 
    'GrowX Streetwear', 
    4.8, 
    10, 
    true, 
    true, 
    true
);

INSERT INTO public.products (id, name, slug, description, price, compare_at_price, images, sizes, colors, fabric, brand, rating_avg, reviews_count, is_featured, is_new_arrival, is_active)
VALUES (
    uuid_generate_v4(), 
    'Men's Graphic Dragon & Streetwear Baggy Tee Set (Set 17)', 
    'mens-graphic-dragon-and-streetwear-baggy-tee-set-set-17', 
    'Luxury curated e-commerce set featuring custom garments, perfectly balanced for urban silhouettes and everyday comfort.', 
    1299.0, 
    1689, 
    ARRAY['/images/products/photo_24_2026-07-10_10-23-49.jpg'], 
    ARRAY['S', 'M', 'L', 'XL'], 
    ARRAY['Black', 'White', 'Beige', 'Blue', 'Green'], 
    'Heavyweight Cotton', 
    'GrowX Streetwear', 
    4.9, 
    13, 
    false, 
    false, 
    true
);

INSERT INTO public.products (id, name, slug, description, price, compare_at_price, images, sizes, colors, fabric, brand, rating_avg, reviews_count, is_featured, is_new_arrival, is_active)
VALUES (
    uuid_generate_v4(), 
    'Men's Graphic Dragon & Streetwear Baggy Tee Set (Set 18)', 
    'mens-graphic-dragon-and-streetwear-baggy-tee-set-set-18', 
    'Luxury curated e-commerce set featuring custom garments, perfectly balanced for urban silhouettes and everyday comfort.', 
    1299.0, 
    1689, 
    ARRAY['/images/products/photo_25_2026-07-10_10-23-49.jpg'], 
    ARRAY['S', 'M', 'L', 'XL'], 
    ARRAY['Black', 'White', 'Beige', 'Blue', 'Green'], 
    'Heavyweight Cotton', 
    'GrowX Streetwear', 
    5.0, 
    16, 
    false, 
    false, 
    true
);

INSERT INTO public.products (id, name, slug, description, price, compare_at_price, images, sizes, colors, fabric, brand, rating_avg, reviews_count, is_featured, is_new_arrival, is_active)
VALUES (
    uuid_generate_v4(), 
    'Men's Graphic Dragon & Streetwear Baggy Tee Set (Set 19)', 
    'mens-graphic-dragon-and-streetwear-baggy-tee-set-set-19', 
    'Luxury curated e-commerce set featuring custom garments, perfectly balanced for urban silhouettes and everyday comfort.', 
    1299.0, 
    1689, 
    ARRAY['/images/products/photo_26_2026-07-10_10-23-49.jpg'], 
    ARRAY['S', 'M', 'L', 'XL'], 
    ARRAY['Black', 'White', 'Beige', 'Blue', 'Green'], 
    'Heavyweight Cotton', 
    'GrowX Streetwear', 
    4.5, 
    19, 
    false, 
    true, 
    true
);

INSERT INTO public.products (id, name, slug, description, price, compare_at_price, images, sizes, colors, fabric, brand, rating_avg, reviews_count, is_featured, is_new_arrival, is_active)
VALUES (
    uuid_generate_v4(), 
    'Men's Graphic Dragon & Streetwear Baggy Tee Set (Set 20)', 
    'mens-graphic-dragon-and-streetwear-baggy-tee-set-set-20', 
    'Luxury curated e-commerce set featuring custom garments, perfectly balanced for urban silhouettes and everyday comfort.', 
    1299.0, 
    1689, 
    ARRAY['/images/products/photo_27_2026-07-10_10-23-49.jpg'], 
    ARRAY['S', 'M', 'L', 'XL'], 
    ARRAY['Black', 'White', 'Beige', 'Blue', 'Green'], 
    'Heavyweight Cotton', 
    'GrowX Streetwear', 
    4.6, 
    22, 
    false, 
    false, 
    true
);

INSERT INTO public.products (id, name, slug, description, price, compare_at_price, images, sizes, colors, fabric, brand, rating_avg, reviews_count, is_featured, is_new_arrival, is_active)
VALUES (
    uuid_generate_v4(), 
    'Men's Graphic Dragon & Streetwear Baggy Tee Set (Set 21)', 
    'mens-graphic-dragon-and-streetwear-baggy-tee-set-set-21', 
    'Luxury curated e-commerce set featuring custom garments, perfectly balanced for urban silhouettes and everyday comfort.', 
    1299.0, 
    1689, 
    ARRAY['/images/products/photo_28_2026-07-10_10-23-49.jpg'], 
    ARRAY['S', 'M', 'L', 'XL'], 
    ARRAY['Black', 'White', 'Beige', 'Blue', 'Green'], 
    'Heavyweight Cotton', 
    'GrowX Streetwear', 
    4.7, 
    25, 
    true, 
    false, 
    true
);

INSERT INTO public.products (id, name, slug, description, price, compare_at_price, images, sizes, colors, fabric, brand, rating_avg, reviews_count, is_featured, is_new_arrival, is_active)
VALUES (
    uuid_generate_v4(), 
    'Men's Graphic Dragon & Streetwear Baggy Tee Set (Set 22)', 
    'mens-graphic-dragon-and-streetwear-baggy-tee-set-set-22', 
    'Luxury curated e-commerce set featuring custom garments, perfectly balanced for urban silhouettes and everyday comfort.', 
    1299.0, 
    1689, 
    ARRAY['/images/products/photo_29_2026-07-10_10-23-49.jpg'], 
    ARRAY['S', 'M', 'L', 'XL'], 
    ARRAY['Black', 'White', 'Beige', 'Blue', 'Green'], 
    'Heavyweight Cotton', 
    'GrowX Streetwear', 
    4.8, 
    28, 
    false, 
    true, 
    true
);

INSERT INTO public.products (id, name, slug, description, price, compare_at_price, images, sizes, colors, fabric, brand, rating_avg, reviews_count, is_featured, is_new_arrival, is_active)
VALUES (
    uuid_generate_v4(), 
    'Men's Luxury Plaid Flannel Shirt & Chino Combo (Set 23)', 
    'mens-luxury-plaid-flannel-shirt-and-chino-combo-set-23', 
    'Luxury curated e-commerce set featuring custom garments, perfectly balanced for urban silhouettes and everyday comfort.', 
    1899.0, 
    2469, 
    ARRAY['/images/products/photo_2_2026-07-10_10-23-48.jpg'], 
    ARRAY['S', 'M', 'L', 'XL'], 
    ARRAY['Black', 'White', 'Beige', 'Blue', 'Green'], 
    'Premium Flannel', 
    'GrowX Premium', 
    4.9, 
    31, 
    false, 
    false, 
    true
);

INSERT INTO public.products (id, name, slug, description, price, compare_at_price, images, sizes, colors, fabric, brand, rating_avg, reviews_count, is_featured, is_new_arrival, is_active)
VALUES (
    uuid_generate_v4(), 
    'Men's Graphic Dragon & Streetwear Baggy Tee Set (Set 24)', 
    'mens-graphic-dragon-and-streetwear-baggy-tee-set-set-24', 
    'Luxury curated e-commerce set featuring custom garments, perfectly balanced for urban silhouettes and everyday comfort.', 
    1299.0, 
    1689, 
    ARRAY['/images/products/photo_30_2026-07-10_10-23-49.jpg'], 
    ARRAY['S', 'M', 'L', 'XL'], 
    ARRAY['Black', 'White', 'Beige', 'Blue', 'Green'], 
    'Heavyweight Cotton', 
    'GrowX Streetwear', 
    5.0, 
    34, 
    false, 
    false, 
    true
);

INSERT INTO public.products (id, name, slug, description, price, compare_at_price, images, sizes, colors, fabric, brand, rating_avg, reviews_count, is_featured, is_new_arrival, is_active)
VALUES (
    uuid_generate_v4(), 
    'Men's Minimalist Linen Summer Oversized Set (Set 25)', 
    'mens-minimalist-linen-summer-oversized-set-set-25', 
    'Luxury curated e-commerce set featuring custom garments, perfectly balanced for urban silhouettes and everyday comfort.', 
    1499.0, 
    1949, 
    ARRAY['/images/products/photo_31_2026-07-10_10-23-49.jpg'], 
    ARRAY['S', 'M', 'L', 'XL'], 
    ARRAY['Black', 'White', 'Beige', 'Blue', 'Green'], 
    'Organic Linen', 
    'GrowX Resort', 
    4.5, 
    37, 
    false, 
    true, 
    true
);

INSERT INTO public.products (id, name, slug, description, price, compare_at_price, images, sizes, colors, fabric, brand, rating_avg, reviews_count, is_featured, is_new_arrival, is_active)
VALUES (
    uuid_generate_v4(), 
    'Men's Minimalist Linen Summer Oversized Set (Set 26)', 
    'mens-minimalist-linen-summer-oversized-set-set-26', 
    'Luxury curated e-commerce set featuring custom garments, perfectly balanced for urban silhouettes and everyday comfort.', 
    1499.0, 
    1949, 
    ARRAY['/images/products/photo_32_2026-07-10_10-23-49.jpg'], 
    ARRAY['S', 'M', 'L', 'XL'], 
    ARRAY['Black', 'White', 'Beige', 'Blue', 'Green'], 
    'Organic Linen', 
    'GrowX Resort', 
    4.6, 
    40, 
    true, 
    false, 
    true
);

INSERT INTO public.products (id, name, slug, description, price, compare_at_price, images, sizes, colors, fabric, brand, rating_avg, reviews_count, is_featured, is_new_arrival, is_active)
VALUES (
    uuid_generate_v4(), 
    'Men's Minimalist Linen Summer Oversized Set (Set 27)', 
    'mens-minimalist-linen-summer-oversized-set-set-27', 
    'Luxury curated e-commerce set featuring custom garments, perfectly balanced for urban silhouettes and everyday comfort.', 
    1499.0, 
    1949, 
    ARRAY['/images/products/photo_33_2026-07-10_10-23-49.jpg'], 
    ARRAY['S', 'M', 'L', 'XL'], 
    ARRAY['Black', 'White', 'Beige', 'Blue', 'Green'], 
    'Organic Linen', 
    'GrowX Resort', 
    4.7, 
    43, 
    false, 
    false, 
    true
);

INSERT INTO public.products (id, name, slug, description, price, compare_at_price, images, sizes, colors, fabric, brand, rating_avg, reviews_count, is_featured, is_new_arrival, is_active)
VALUES (
    uuid_generate_v4(), 
    'Men's Minimalist Linen Summer Oversized Set (Set 28)', 
    'mens-minimalist-linen-summer-oversized-set-set-28', 
    'Luxury curated e-commerce set featuring custom garments, perfectly balanced for urban silhouettes and everyday comfort.', 
    1499.0, 
    1949, 
    ARRAY['/images/products/photo_34_2026-07-10_10-23-49.jpg'], 
    ARRAY['S', 'M', 'L', 'XL'], 
    ARRAY['Black', 'White', 'Beige', 'Blue', 'Green'], 
    'Organic Linen', 
    'GrowX Resort', 
    4.8, 
    46, 
    false, 
    true, 
    true
);

INSERT INTO public.products (id, name, slug, description, price, compare_at_price, images, sizes, colors, fabric, brand, rating_avg, reviews_count, is_featured, is_new_arrival, is_active)
VALUES (
    uuid_generate_v4(), 
    'Men's Minimalist Linen Summer Oversized Set (Set 29)', 
    'mens-minimalist-linen-summer-oversized-set-set-29', 
    'Luxury curated e-commerce set featuring custom garments, perfectly balanced for urban silhouettes and everyday comfort.', 
    1499.0, 
    1949, 
    ARRAY['/images/products/photo_35_2026-07-10_10-23-49.jpg'], 
    ARRAY['S', 'M', 'L', 'XL'], 
    ARRAY['Black', 'White', 'Beige', 'Blue', 'Green'], 
    'Organic Linen', 
    'GrowX Resort', 
    4.9, 
    49, 
    false, 
    false, 
    true
);

INSERT INTO public.products (id, name, slug, description, price, compare_at_price, images, sizes, colors, fabric, brand, rating_avg, reviews_count, is_featured, is_new_arrival, is_active)
VALUES (
    uuid_generate_v4(), 
    'Men's Minimalist Linen Summer Oversized Set (Set 30)', 
    'mens-minimalist-linen-summer-oversized-set-set-30', 
    'Luxury curated e-commerce set featuring custom garments, perfectly balanced for urban silhouettes and everyday comfort.', 
    1499.0, 
    1949, 
    ARRAY['/images/products/photo_36_2026-07-10_10-23-49.jpg'], 
    ARRAY['S', 'M', 'L', 'XL'], 
    ARRAY['Black', 'White', 'Beige', 'Blue', 'Green'], 
    'Organic Linen', 
    'GrowX Resort', 
    5.0, 
    52, 
    false, 
    false, 
    true
);

INSERT INTO public.products (id, name, slug, description, price, compare_at_price, images, sizes, colors, fabric, brand, rating_avg, reviews_count, is_featured, is_new_arrival, is_active)
VALUES (
    uuid_generate_v4(), 
    'Men's Urban Street Classic Plaid Outfit Combo (Set 31)', 
    'mens-urban-street-classic-plaid-outfit-combo-set-31', 
    'Luxury curated e-commerce set featuring custom garments, perfectly balanced for urban silhouettes and everyday comfort.', 
    1999.0, 
    2599, 
    ARRAY['/images/products/photo_37_2026-07-10_10-23-49.jpg'], 
    ARRAY['S', 'M', 'L', 'XL'], 
    ARRAY['Black', 'White', 'Beige', 'Blue', 'Green'], 
    'Flannel & Denim', 
    'GrowX Originals', 
    4.5, 
    10, 
    true, 
    true, 
    true
);

INSERT INTO public.products (id, name, slug, description, price, compare_at_price, images, sizes, colors, fabric, brand, rating_avg, reviews_count, is_featured, is_new_arrival, is_active)
VALUES (
    uuid_generate_v4(), 
    'Men's Urban Street Classic Plaid Outfit Combo (Set 32)', 
    'mens-urban-street-classic-plaid-outfit-combo-set-32', 
    'Luxury curated e-commerce set featuring custom garments, perfectly balanced for urban silhouettes and everyday comfort.', 
    1999.0, 
    2599, 
    ARRAY['/images/products/photo_38_2026-07-10_10-23-49.jpg'], 
    ARRAY['S', 'M', 'L', 'XL'], 
    ARRAY['Black', 'White', 'Beige', 'Blue', 'Green'], 
    'Flannel & Denim', 
    'GrowX Originals', 
    4.6, 
    13, 
    false, 
    false, 
    true
);

INSERT INTO public.products (id, name, slug, description, price, compare_at_price, images, sizes, colors, fabric, brand, rating_avg, reviews_count, is_featured, is_new_arrival, is_active)
VALUES (
    uuid_generate_v4(), 
    'Men's Urban Street Classic Plaid Outfit Combo (Set 33)', 
    'mens-urban-street-classic-plaid-outfit-combo-set-33', 
    'Luxury curated e-commerce set featuring custom garments, perfectly balanced for urban silhouettes and everyday comfort.', 
    1999.0, 
    2599, 
    ARRAY['/images/products/photo_39_2026-07-10_10-23-49.jpg'], 
    ARRAY['S', 'M', 'L', 'XL'], 
    ARRAY['Black', 'White', 'Beige', 'Blue', 'Green'], 
    'Flannel & Denim', 
    'GrowX Originals', 
    4.7, 
    16, 
    false, 
    false, 
    true
);

INSERT INTO public.products (id, name, slug, description, price, compare_at_price, images, sizes, colors, fabric, brand, rating_avg, reviews_count, is_featured, is_new_arrival, is_active)
VALUES (
    uuid_generate_v4(), 
    'Men's Luxury Plaid Flannel Shirt & Chino Combo (Set 34)', 
    'mens-luxury-plaid-flannel-shirt-and-chino-combo-set-34', 
    'Luxury curated e-commerce set featuring custom garments, perfectly balanced for urban silhouettes and everyday comfort.', 
    1899.0, 
    2469, 
    ARRAY['/images/products/photo_3_2026-07-10_10-23-48.jpg'], 
    ARRAY['S', 'M', 'L', 'XL'], 
    ARRAY['Black', 'White', 'Beige', 'Blue', 'Green'], 
    'Premium Flannel', 
    'GrowX Premium', 
    4.8, 
    19, 
    false, 
    true, 
    true
);

INSERT INTO public.products (id, name, slug, description, price, compare_at_price, images, sizes, colors, fabric, brand, rating_avg, reviews_count, is_featured, is_new_arrival, is_active)
VALUES (
    uuid_generate_v4(), 
    'Men's Urban Street Classic Plaid Outfit Combo (Set 35)', 
    'mens-urban-street-classic-plaid-outfit-combo-set-35', 
    'Luxury curated e-commerce set featuring custom garments, perfectly balanced for urban silhouettes and everyday comfort.', 
    1999.0, 
    2599, 
    ARRAY['/images/products/photo_40_2026-07-10_10-23-49.jpg'], 
    ARRAY['S', 'M', 'L', 'XL'], 
    ARRAY['Black', 'White', 'Beige', 'Blue', 'Green'], 
    'Flannel & Denim', 
    'GrowX Originals', 
    4.9, 
    22, 
    false, 
    false, 
    true
);

INSERT INTO public.products (id, name, slug, description, price, compare_at_price, images, sizes, colors, fabric, brand, rating_avg, reviews_count, is_featured, is_new_arrival, is_active)
VALUES (
    uuid_generate_v4(), 
    'Men's Urban Street Classic Plaid Outfit Combo (Set 36)', 
    'mens-urban-street-classic-plaid-outfit-combo-set-36', 
    'Luxury curated e-commerce set featuring custom garments, perfectly balanced for urban silhouettes and everyday comfort.', 
    1999.0, 
    2599, 
    ARRAY['/images/products/photo_41_2026-07-10_10-23-49.jpg'], 
    ARRAY['S', 'M', 'L', 'XL'], 
    ARRAY['Black', 'White', 'Beige', 'Blue', 'Green'], 
    'Flannel & Denim', 
    'GrowX Originals', 
    5.0, 
    25, 
    true, 
    false, 
    true
);

INSERT INTO public.products (id, name, slug, description, price, compare_at_price, images, sizes, colors, fabric, brand, rating_avg, reviews_count, is_featured, is_new_arrival, is_active)
VALUES (
    uuid_generate_v4(), 
    'Men's Urban Street Classic Plaid Outfit Combo (Set 37)', 
    'mens-urban-street-classic-plaid-outfit-combo-set-37', 
    'Luxury curated e-commerce set featuring custom garments, perfectly balanced for urban silhouettes and everyday comfort.', 
    1999.0, 
    2599, 
    ARRAY['/images/products/photo_42_2026-07-10_10-23-49.jpg'], 
    ARRAY['S', 'M', 'L', 'XL'], 
    ARRAY['Black', 'White', 'Beige', 'Blue', 'Green'], 
    'Flannel & Denim', 
    'GrowX Originals', 
    4.5, 
    28, 
    false, 
    true, 
    true
);

INSERT INTO public.products (id, name, slug, description, price, compare_at_price, images, sizes, colors, fabric, brand, rating_avg, reviews_count, is_featured, is_new_arrival, is_active)
VALUES (
    uuid_generate_v4(), 
    'Men's Luxury Plaid Flannel Shirt & Chino Combo (Set 38)', 
    'mens-luxury-plaid-flannel-shirt-and-chino-combo-set-38', 
    'Luxury curated e-commerce set featuring custom garments, perfectly balanced for urban silhouettes and everyday comfort.', 
    1899.0, 
    2469, 
    ARRAY['/images/products/photo_4_2026-07-10_10-23-48.jpg'], 
    ARRAY['S', 'M', 'L', 'XL'], 
    ARRAY['Black', 'White', 'Beige', 'Blue', 'Green'], 
    'Premium Flannel', 
    'GrowX Premium', 
    4.6, 
    31, 
    false, 
    false, 
    true
);

INSERT INTO public.products (id, name, slug, description, price, compare_at_price, images, sizes, colors, fabric, brand, rating_avg, reviews_count, is_featured, is_new_arrival, is_active)
VALUES (
    uuid_generate_v4(), 
    'Men's Luxury Plaid Flannel Shirt & Chino Combo (Set 39)', 
    'mens-luxury-plaid-flannel-shirt-and-chino-combo-set-39', 
    'Luxury curated e-commerce set featuring custom garments, perfectly balanced for urban silhouettes and everyday comfort.', 
    1899.0, 
    2469, 
    ARRAY['/images/products/photo_5_2026-07-10_10-23-48.jpg'], 
    ARRAY['S', 'M', 'L', 'XL'], 
    ARRAY['Black', 'White', 'Beige', 'Blue', 'Green'], 
    'Premium Flannel', 
    'GrowX Premium', 
    4.7, 
    34, 
    false, 
    false, 
    true
);

INSERT INTO public.products (id, name, slug, description, price, compare_at_price, images, sizes, colors, fabric, brand, rating_avg, reviews_count, is_featured, is_new_arrival, is_active)
VALUES (
    uuid_generate_v4(), 
    'Men's Luxury Plaid Flannel Shirt & Chino Combo (Set 40)', 
    'mens-luxury-plaid-flannel-shirt-and-chino-combo-set-40', 
    'Luxury curated e-commerce set featuring custom garments, perfectly balanced for urban silhouettes and everyday comfort.', 
    1899.0, 
    2469, 
    ARRAY['/images/products/photo_6_2026-07-10_10-23-48.jpg'], 
    ARRAY['S', 'M', 'L', 'XL'], 
    ARRAY['Black', 'White', 'Beige', 'Blue', 'Green'], 
    'Premium Flannel', 
    'GrowX Premium', 
    4.8, 
    37, 
    false, 
    true, 
    true
);

INSERT INTO public.products (id, name, slug, description, price, compare_at_price, images, sizes, colors, fabric, brand, rating_avg, reviews_count, is_featured, is_new_arrival, is_active)
VALUES (
    uuid_generate_v4(), 
    'Men's Luxury Plaid Flannel Shirt & Chino Combo (Set 41)', 
    'mens-luxury-plaid-flannel-shirt-and-chino-combo-set-41', 
    'Luxury curated e-commerce set featuring custom garments, perfectly balanced for urban silhouettes and everyday comfort.', 
    1899.0, 
    2469, 
    ARRAY['/images/products/photo_7_2026-07-10_10-23-48.jpg'], 
    ARRAY['S', 'M', 'L', 'XL'], 
    ARRAY['Black', 'White', 'Beige', 'Blue', 'Green'], 
    'Premium Flannel', 
    'GrowX Premium', 
    4.9, 
    40, 
    true, 
    false, 
    true
);

INSERT INTO public.products (id, name, slug, description, price, compare_at_price, images, sizes, colors, fabric, brand, rating_avg, reviews_count, is_featured, is_new_arrival, is_active)
VALUES (
    uuid_generate_v4(), 
    'Men's Luxury Plaid Flannel Shirt & Chino Combo (Set 42)', 
    'mens-luxury-plaid-flannel-shirt-and-chino-combo-set-42', 
    'Luxury curated e-commerce set featuring custom garments, perfectly balanced for urban silhouettes and everyday comfort.', 
    1899.0, 
    2469, 
    ARRAY['/images/products/photo_8_2026-07-10_10-23-48.jpg'], 
    ARRAY['S', 'M', 'L', 'XL'], 
    ARRAY['Black', 'White', 'Beige', 'Blue', 'Green'], 
    'Premium Flannel', 
    'GrowX Premium', 
    5.0, 
    43, 
    false, 
    false, 
    true
);

INSERT INTO public.products (id, name, slug, description, price, compare_at_price, images, sizes, colors, fabric, brand, rating_avg, reviews_count, is_featured, is_new_arrival, is_active)
VALUES (
    uuid_generate_v4(), 
    'Men's Luxury Plaid Flannel Shirt & Chino Combo (Set 43)', 
    'mens-luxury-plaid-flannel-shirt-and-chino-combo-set-43', 
    'Luxury curated e-commerce set featuring custom garments, perfectly balanced for urban silhouettes and everyday comfort.', 
    1899.0, 
    2469, 
    ARRAY['/images/products/photo_9_2026-07-10_10-23-48.jpg'], 
    ARRAY['S', 'M', 'L', 'XL'], 
    ARRAY['Black', 'White', 'Beige', 'Blue', 'Green'], 
    'Premium Flannel', 
    'GrowX Premium', 
    4.5, 
    46, 
    false, 
    true, 
    true
);

INSERT INTO public.products (id, name, slug, description, price, compare_at_price, images, sizes, colors, fabric, brand, rating_avg, reviews_count, is_featured, is_new_arrival, is_active)
VALUES (
    uuid_generate_v4(), 
    'Women's Lucknowi Handloom Premium Kurti & Dupatta Set (Set 1)', 
    'womens-lucknowi-handloom-premium-kurti-and-dupatta-set-set-1', 
    'Luxury curated e-commerce set featuring custom garments, perfectly balanced for urban silhouettes and everyday comfort.', 
    1999.0, 
    2599, 
    ARRAY['/images/products/photo_26_2026-07-10_11-19-21.jpg'], 
    ARRAY['S', 'M', 'L', 'XL'], 
    ARRAY['Lilac', 'Beige', 'White', 'Green', 'Burgundy'], 
    'Premium Handloom Cotton', 
    'GrowX Ethnic', 
    4.6, 
    15, 
    true, 
    true, 
    true
);

INSERT INTO public.products (id, name, slug, description, price, compare_at_price, images, sizes, colors, fabric, brand, rating_avg, reviews_count, is_featured, is_new_arrival, is_active)
VALUES (
    uuid_generate_v4(), 
    'Women's Lucknowi Handloom Premium Kurti & Dupatta Set (Set 2)', 
    'womens-lucknowi-handloom-premium-kurti-and-dupatta-set-set-2', 
    'Luxury curated e-commerce set featuring custom garments, perfectly balanced for urban silhouettes and everyday comfort.', 
    1999.0, 
    2599, 
    ARRAY['/images/products/photo_27_2026-07-10_11-19-21.jpg'], 
    ARRAY['S', 'M', 'L', 'XL'], 
    ARRAY['Lilac', 'Beige', 'White', 'Green', 'Burgundy'], 
    'Premium Handloom Cotton', 
    'GrowX Ethnic', 
    4.7, 
    19, 
    false, 
    false, 
    true
);

INSERT INTO public.products (id, name, slug, description, price, compare_at_price, images, sizes, colors, fabric, brand, rating_avg, reviews_count, is_featured, is_new_arrival, is_active)
VALUES (
    uuid_generate_v4(), 
    'Women's Lucknowi Handloom Premium Kurti & Dupatta Set (Set 3)', 
    'womens-lucknowi-handloom-premium-kurti-and-dupatta-set-set-3', 
    'Luxury curated e-commerce set featuring custom garments, perfectly balanced for urban silhouettes and everyday comfort.', 
    1999.0, 
    2599, 
    ARRAY['/images/products/photo_28_2026-07-10_11-19-21.jpg'], 
    ARRAY['S', 'M', 'L', 'XL'], 
    ARRAY['Lilac', 'Beige', 'White', 'Green', 'Burgundy'], 
    'Premium Handloom Cotton', 
    'GrowX Ethnic', 
    4.8, 
    23, 
    false, 
    true, 
    true
);

INSERT INTO public.products (id, name, slug, description, price, compare_at_price, images, sizes, colors, fabric, brand, rating_avg, reviews_count, is_featured, is_new_arrival, is_active)
VALUES (
    uuid_generate_v4(), 
    'Women's Lucknowi Handloom Premium Kurti & Dupatta Set (Set 4)', 
    'womens-lucknowi-handloom-premium-kurti-and-dupatta-set-set-4', 
    'Luxury curated e-commerce set featuring custom garments, perfectly balanced for urban silhouettes and everyday comfort.', 
    1999.0, 
    2599, 
    ARRAY['/images/products/photo_30_2026-07-10_11-19-21.jpg'], 
    ARRAY['S', 'M', 'L', 'XL'], 
    ARRAY['Lilac', 'Beige', 'White', 'Green', 'Burgundy'], 
    'Premium Handloom Cotton', 
    'GrowX Ethnic', 
    4.9, 
    27, 
    false, 
    false, 
    true
);

INSERT INTO public.products (id, name, slug, description, price, compare_at_price, images, sizes, colors, fabric, brand, rating_avg, reviews_count, is_featured, is_new_arrival, is_active)
VALUES (
    uuid_generate_v4(), 
    'Women's Lucknowi Handloom Premium Kurti & Dupatta Set (Set 5)', 
    'womens-lucknowi-handloom-premium-kurti-and-dupatta-set-set-5', 
    'Luxury curated e-commerce set featuring custom garments, perfectly balanced for urban silhouettes and everyday comfort.', 
    1999.0, 
    2599, 
    ARRAY['/images/products/photo_32_2026-07-10_11-19-21.jpg'], 
    ARRAY['S', 'M', 'L', 'XL'], 
    ARRAY['Lilac', 'Beige', 'White', 'Green', 'Burgundy'], 
    'Premium Handloom Cotton', 
    'GrowX Ethnic', 
    5.0, 
    31, 
    true, 
    true, 
    true
);

INSERT INTO public.products (id, name, slug, description, price, compare_at_price, images, sizes, colors, fabric, brand, rating_avg, reviews_count, is_featured, is_new_arrival, is_active)
VALUES (
    uuid_generate_v4(), 
    'Women's Lucknowi Handloom Premium Kurti & Dupatta Set (Set 6)', 
    'womens-lucknowi-handloom-premium-kurti-and-dupatta-set-set-6', 
    'Luxury curated e-commerce set featuring custom garments, perfectly balanced for urban silhouettes and everyday comfort.', 
    1999.0, 
    2599, 
    ARRAY['/images/products/photo_33_2026-07-10_11-19-21.jpg'], 
    ARRAY['S', 'M', 'L', 'XL'], 
    ARRAY['Lilac', 'Beige', 'White', 'Green', 'Burgundy'], 
    'Premium Handloom Cotton', 
    'GrowX Ethnic', 
    4.6, 
    35, 
    false, 
    false, 
    true
);

INSERT INTO public.products (id, name, slug, description, price, compare_at_price, images, sizes, colors, fabric, brand, rating_avg, reviews_count, is_featured, is_new_arrival, is_active)
VALUES (
    uuid_generate_v4(), 
    'Women's Classic Linen Minimalist Lounge Co-Ord Set (Set 7)', 
    'womens-classic-linen-minimalist-lounge-co-ord-set-set-7', 
    'Luxury curated e-commerce set featuring custom garments, perfectly balanced for urban silhouettes and everyday comfort.', 
    1699.0, 
    2209, 
    ARRAY['/images/products/photo_34_2026-07-10_11-19-21.jpg'], 
    ARRAY['S', 'M', 'L', 'XL'], 
    ARRAY['Lilac', 'Beige', 'White', 'Green', 'Burgundy'], 
    'Linen Viscose Blend', 
    'GrowX Co-Ords', 
    4.7, 
    39, 
    false, 
    true, 
    true
);

INSERT INTO public.products (id, name, slug, description, price, compare_at_price, images, sizes, colors, fabric, brand, rating_avg, reviews_count, is_featured, is_new_arrival, is_active)
VALUES (
    uuid_generate_v4(), 
    'Women's Classic Linen Minimalist Lounge Co-Ord Set (Set 8)', 
    'womens-classic-linen-minimalist-lounge-co-ord-set-set-8', 
    'Luxury curated e-commerce set featuring custom garments, perfectly balanced for urban silhouettes and everyday comfort.', 
    1699.0, 
    2209, 
    ARRAY['/images/products/photo_35_2026-07-10_11-19-21.jpg'], 
    ARRAY['S', 'M', 'L', 'XL'], 
    ARRAY['Lilac', 'Beige', 'White', 'Green', 'Burgundy'], 
    'Linen Viscose Blend', 
    'GrowX Co-Ords', 
    4.8, 
    43, 
    false, 
    false, 
    true
);

INSERT INTO public.products (id, name, slug, description, price, compare_at_price, images, sizes, colors, fabric, brand, rating_avg, reviews_count, is_featured, is_new_arrival, is_active)
VALUES (
    uuid_generate_v4(), 
    'Women's Classic Linen Minimalist Lounge Co-Ord Set (Set 9)', 
    'womens-classic-linen-minimalist-lounge-co-ord-set-set-9', 
    'Luxury curated e-commerce set featuring custom garments, perfectly balanced for urban silhouettes and everyday comfort.', 
    1699.0, 
    2209, 
    ARRAY['/images/products/photo_36_2026-07-10_11-19-21.jpg'], 
    ARRAY['S', 'M', 'L', 'XL'], 
    ARRAY['Lilac', 'Beige', 'White', 'Green', 'Burgundy'], 
    'Linen Viscose Blend', 
    'GrowX Co-Ords', 
    4.9, 
    47, 
    true, 
    true, 
    true
);

INSERT INTO public.products (id, name, slug, description, price, compare_at_price, images, sizes, colors, fabric, brand, rating_avg, reviews_count, is_featured, is_new_arrival, is_active)
VALUES (
    uuid_generate_v4(), 
    'Women's Classic Linen Minimalist Lounge Co-Ord Set (Set 10)', 
    'womens-classic-linen-minimalist-lounge-co-ord-set-set-10', 
    'Luxury curated e-commerce set featuring custom garments, perfectly balanced for urban silhouettes and everyday comfort.', 
    1699.0, 
    2209, 
    ARRAY['/images/products/photo_37_2026-07-10_11-19-21.jpg'], 
    ARRAY['S', 'M', 'L', 'XL'], 
    ARRAY['Lilac', 'Beige', 'White', 'Green', 'Burgundy'], 
    'Linen Viscose Blend', 
    'GrowX Co-Ords', 
    5.0, 
    16, 
    false, 
    false, 
    true
);

INSERT INTO public.products (id, name, slug, description, price, compare_at_price, images, sizes, colors, fabric, brand, rating_avg, reviews_count, is_featured, is_new_arrival, is_active)
VALUES (
    uuid_generate_v4(), 
    'Women's Classic Linen Minimalist Lounge Co-Ord Set (Set 11)', 
    'womens-classic-linen-minimalist-lounge-co-ord-set-set-11', 
    'Luxury curated e-commerce set featuring custom garments, perfectly balanced for urban silhouettes and everyday comfort.', 
    1699.0, 
    2209, 
    ARRAY['/images/products/photo_38_2026-07-10_11-19-21.jpg'], 
    ARRAY['S', 'M', 'L', 'XL'], 
    ARRAY['Lilac', 'Beige', 'White', 'Green', 'Burgundy'], 
    'Linen Viscose Blend', 
    'GrowX Co-Ords', 
    4.6, 
    20, 
    false, 
    true, 
    true
);

INSERT INTO public.products (id, name, slug, description, price, compare_at_price, images, sizes, colors, fabric, brand, rating_avg, reviews_count, is_featured, is_new_arrival, is_active)
VALUES (
    uuid_generate_v4(), 
    'Women's Classic Linen Minimalist Lounge Co-Ord Set (Set 12)', 
    'womens-classic-linen-minimalist-lounge-co-ord-set-set-12', 
    'Luxury curated e-commerce set featuring custom garments, perfectly balanced for urban silhouettes and everyday comfort.', 
    1699.0, 
    2209, 
    ARRAY['/images/products/photo_39_2026-07-10_11-19-21.jpg'], 
    ARRAY['S', 'M', 'L', 'XL'], 
    ARRAY['Lilac', 'Beige', 'White', 'Green', 'Burgundy'], 
    'Linen Viscose Blend', 
    'GrowX Co-Ords', 
    4.7, 
    24, 
    false, 
    false, 
    true
);

INSERT INTO public.products (id, name, slug, description, price, compare_at_price, images, sizes, colors, fabric, brand, rating_avg, reviews_count, is_featured, is_new_arrival, is_active)
VALUES (
    uuid_generate_v4(), 
    'Women's Classic Linen Minimalist Lounge Co-Ord Set (Set 13)', 
    'womens-classic-linen-minimalist-lounge-co-ord-set-set-13', 
    'Luxury curated e-commerce set featuring custom garments, perfectly balanced for urban silhouettes and everyday comfort.', 
    1699.0, 
    2209, 
    ARRAY['/images/products/photo_40_2026-07-10_11-19-21.jpg'], 
    ARRAY['S', 'M', 'L', 'XL'], 
    ARRAY['Lilac', 'Beige', 'White', 'Green', 'Burgundy'], 
    'Linen Viscose Blend', 
    'GrowX Co-Ords', 
    4.8, 
    28, 
    true, 
    true, 
    true
);

INSERT INTO public.products (id, name, slug, description, price, compare_at_price, images, sizes, colors, fabric, brand, rating_avg, reviews_count, is_featured, is_new_arrival, is_active)
VALUES (
    uuid_generate_v4(), 
    'Women's Classic Linen Minimalist Lounge Co-Ord Set (Set 14)', 
    'womens-classic-linen-minimalist-lounge-co-ord-set-set-14', 
    'Luxury curated e-commerce set featuring custom garments, perfectly balanced for urban silhouettes and everyday comfort.', 
    1699.0, 
    2209, 
    ARRAY['/images/products/photo_41_2026-07-10_11-19-21.jpg'], 
    ARRAY['S', 'M', 'L', 'XL'], 
    ARRAY['Lilac', 'Beige', 'White', 'Green', 'Burgundy'], 
    'Linen Viscose Blend', 
    'GrowX Co-Ords', 
    4.9, 
    32, 
    false, 
    false, 
    true
);

INSERT INTO public.products (id, name, slug, description, price, compare_at_price, images, sizes, colors, fabric, brand, rating_avg, reviews_count, is_featured, is_new_arrival, is_active)
VALUES (
    uuid_generate_v4(), 
    'Women's Classic Linen Minimalist Lounge Co-Ord Set (Set 15)', 
    'womens-classic-linen-minimalist-lounge-co-ord-set-set-15', 
    'Luxury curated e-commerce set featuring custom garments, perfectly balanced for urban silhouettes and everyday comfort.', 
    1699.0, 
    2209, 
    ARRAY['/images/products/photo_42_2026-07-10_11-19-21.jpg'], 
    ARRAY['S', 'M', 'L', 'XL'], 
    ARRAY['Lilac', 'Beige', 'White', 'Green', 'Burgundy'], 
    'Linen Viscose Blend', 
    'GrowX Co-Ords', 
    5.0, 
    36, 
    false, 
    true, 
    true
);

INSERT INTO public.products (id, name, slug, description, price, compare_at_price, images, sizes, colors, fabric, brand, rating_avg, reviews_count, is_featured, is_new_arrival, is_active)
VALUES (
    uuid_generate_v4(), 
    'Women's Cozy Athletic Fleece Lounge Crop Tee Combo (Set 16)', 
    'womens-cozy-athletic-fleece-lounge-crop-tee-combo-set-16', 
    'Luxury curated e-commerce set featuring custom garments, perfectly balanced for urban silhouettes and everyday comfort.', 
    1399.0, 
    1819, 
    ARRAY['/images/products/photo_43_2026-07-10_11-19-21.jpg'], 
    ARRAY['S', 'M', 'L', 'XL'], 
    ARRAY['Lilac', 'Beige', 'White', 'Green', 'Burgundy'], 
    'Terry Soft Cotton', 
    'GrowX Activewear', 
    4.6, 
    40, 
    false, 
    false, 
    true
);

INSERT INTO public.products (id, name, slug, description, price, compare_at_price, images, sizes, colors, fabric, brand, rating_avg, reviews_count, is_featured, is_new_arrival, is_active)
VALUES (
    uuid_generate_v4(), 
    'Women's Cozy Athletic Fleece Lounge Crop Tee Combo (Set 17)', 
    'womens-cozy-athletic-fleece-lounge-crop-tee-combo-set-17', 
    'Luxury curated e-commerce set featuring custom garments, perfectly balanced for urban silhouettes and everyday comfort.', 
    1399.0, 
    1819, 
    ARRAY['/images/products/photo_44_2026-07-10_11-19-21.jpg'], 
    ARRAY['S', 'M', 'L', 'XL'], 
    ARRAY['Lilac', 'Beige', 'White', 'Green', 'Burgundy'], 
    'Terry Soft Cotton', 
    'GrowX Activewear', 
    4.7, 
    44, 
    true, 
    true, 
    true
);

INSERT INTO public.products (id, name, slug, description, price, compare_at_price, images, sizes, colors, fabric, brand, rating_avg, reviews_count, is_featured, is_new_arrival, is_active)
VALUES (
    uuid_generate_v4(), 
    'Women's Cozy Athletic Fleece Lounge Crop Tee Combo (Set 18)', 
    'womens-cozy-athletic-fleece-lounge-crop-tee-combo-set-18', 
    'Luxury curated e-commerce set featuring custom garments, perfectly balanced for urban silhouettes and everyday comfort.', 
    1399.0, 
    1819, 
    ARRAY['/images/products/photo_45_2026-07-10_11-19-21.jpg'], 
    ARRAY['S', 'M', 'L', 'XL'], 
    ARRAY['Lilac', 'Beige', 'White', 'Green', 'Burgundy'], 
    'Terry Soft Cotton', 
    'GrowX Activewear', 
    4.8, 
    48, 
    false, 
    false, 
    true
);

INSERT INTO public.products (id, name, slug, description, price, compare_at_price, images, sizes, colors, fabric, brand, rating_avg, reviews_count, is_featured, is_new_arrival, is_active)
VALUES (
    uuid_generate_v4(), 
    'Women's Cozy Athletic Fleece Lounge Crop Tee Combo (Set 19)', 
    'womens-cozy-athletic-fleece-lounge-crop-tee-combo-set-19', 
    'Luxury curated e-commerce set featuring custom garments, perfectly balanced for urban silhouettes and everyday comfort.', 
    1399.0, 
    1819, 
    ARRAY['/images/products/photo_46_2026-07-10_11-19-21.jpg'], 
    ARRAY['S', 'M', 'L', 'XL'], 
    ARRAY['Lilac', 'Beige', 'White', 'Green', 'Burgundy'], 
    'Terry Soft Cotton', 
    'GrowX Activewear', 
    4.9, 
    17, 
    false, 
    true, 
    true
);

INSERT INTO public.products (id, name, slug, description, price, compare_at_price, images, sizes, colors, fabric, brand, rating_avg, reviews_count, is_featured, is_new_arrival, is_active)
VALUES (
    uuid_generate_v4(), 
    'Women's Cozy Athletic Fleece Lounge Crop Tee Combo (Set 20)', 
    'womens-cozy-athletic-fleece-lounge-crop-tee-combo-set-20', 
    'Luxury curated e-commerce set featuring custom garments, perfectly balanced for urban silhouettes and everyday comfort.', 
    1399.0, 
    1819, 
    ARRAY['/images/products/photo_47_2026-07-10_11-19-21.jpg'], 
    ARRAY['S', 'M', 'L', 'XL'], 
    ARRAY['Lilac', 'Beige', 'White', 'Green', 'Burgundy'], 
    'Terry Soft Cotton', 
    'GrowX Activewear', 
    5.0, 
    21, 
    false, 
    false, 
    true
);

INSERT INTO public.products (id, name, slug, description, price, compare_at_price, images, sizes, colors, fabric, brand, rating_avg, reviews_count, is_featured, is_new_arrival, is_active)
VALUES (
    uuid_generate_v4(), 
    'Women's Cozy Athletic Fleece Lounge Crop Tee Combo (Set 21)', 
    'womens-cozy-athletic-fleece-lounge-crop-tee-combo-set-21', 
    'Luxury curated e-commerce set featuring custom garments, perfectly balanced for urban silhouettes and everyday comfort.', 
    1399.0, 
    1819, 
    ARRAY['/images/products/photo_48_2026-07-10_11-19-21.jpg'], 
    ARRAY['S', 'M', 'L', 'XL'], 
    ARRAY['Lilac', 'Beige', 'White', 'Green', 'Burgundy'], 
    'Terry Soft Cotton', 
    'GrowX Activewear', 
    4.6, 
    25, 
    true, 
    true, 
    true
);

INSERT INTO public.products (id, name, slug, description, price, compare_at_price, images, sizes, colors, fabric, brand, rating_avg, reviews_count, is_featured, is_new_arrival, is_active)
VALUES (
    uuid_generate_v4(), 
    'Women's Cozy Athletic Fleece Lounge Crop Tee Combo (Set 22)', 
    'womens-cozy-athletic-fleece-lounge-crop-tee-combo-set-22', 
    'Luxury curated e-commerce set featuring custom garments, perfectly balanced for urban silhouettes and everyday comfort.', 
    1399.0, 
    1819, 
    ARRAY['/images/products/photo_49_2026-07-10_11-19-21.jpg'], 
    ARRAY['S', 'M', 'L', 'XL'], 
    ARRAY['Lilac', 'Beige', 'White', 'Green', 'Burgundy'], 
    'Terry Soft Cotton', 
    'GrowX Activewear', 
    4.7, 
    29, 
    false, 
    false, 
    true
);