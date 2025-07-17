-- Insert dummy products
INSERT INTO products (id, name, description, price, discount_price, images, category, rating, num_reviews, stock, sku, brand, material, color, size, care_instructions, is_featured) VALUES
('1a2b3c4d-5e6f-7890-1234-567890abcdef', 'Orange Cotton Printed Anarkali Suit Set', 'A beautiful orange cotton anarkali suit set with intricate prints, perfect for festive occasions. This elegant ensemble features intricate prints and a comfortable cotton blend fabric, perfect for all-day wear. The Anarkali style offers a flattering silhouette, making it a must-have for your ethnic wardrobe. Pair it with traditional jewelry for a complete look.', 3499.00, 2999.00, ARRAY['/images/recommended-products.png', '/images/product-detail-1.png', '/images/product-detail-2.png'], 'Suit Sets', 4.5, 120, 50, 'SKU001', 'BIBA', 'Cotton', 'Orange', ARRAY['S', 'M', 'L', 'XL'], 'Hand wash cold', TRUE),
('2b3c4d5e-6f78-9012-3456-7890abcdef12', 'Indigo Blue and White Straight Co-ord Set', 'Stylish indigo blue and white co-ord set with a straight fit, ideal for casual wear. Made from breathable fabric, it is ideal for casual outings or semi-formal events. The straight cut offers a sleek and contemporary appeal.', 4599.00, 3219.00, ARRAY['/images/recommended-products.png', '/images/product-detail-3.png'], 'Co-ord Sets', 4.2, 85, 30, 'SKU002', 'BIBA', 'Rayon', 'Blue', ARRAY['S', 'M', 'L'], 'Machine wash gentle', TRUE),
('3c4d5e6f-7890-1234-5678-90abcdef1234', 'Orange Cotton Blend Schiffli Straight Kurta Set', 'Elegant orange kurta set with schiffli embroidery, suitable for office or daily wear. This set combines traditional craftsmanship with modern comfort, making it suitable for daily wear or small gatherings. The intricate schiffli detailing adds a touch of elegance.', 3999.00, 2799.00, ARRAY['/images/recommended-products.png'], 'Kurtas & Tops', 4.0, 60, 40, 'SKU003', 'BIBA', 'Cotton Blend', 'Orange', ARRAY['M', 'L', 'XL'], 'Dry clean only', FALSE),
('4d5e6f78-9012-3456-7890-abcdef123456', 'Dull Blue Cotton Flared Printed Kurta Set', 'Comfortable dull blue flared kurta set with subtle prints, great for summer. Its flowy design provides comfort and a graceful silhouette, perfect for summer events or casual wear. The unique print makes it stand out.', 3599.00, 2799.00, ARRAY['/images/recommended-products.png'], 'Kurtas & Tops', 4.3, 95, 25, 'SKU004', 'BIBA', 'Cotton', 'Blue', ARRAY['S', 'M', 'L', 'XL'], 'Hand wash cold', FALSE),
('5e6f7890-1234-5678-90ab-cdef12345678', 'Off-White and Black Pure Cotton Printed Kurta Set', 'Classic off-white and black printed kurta set, versatile for various occasions. Simple yet stylish, this set is versatile and can be dressed up or down. The pure cotton ensures maximum comfort.', 3599.00, 2519.00, ARRAY['/images/recommended-products.png'], 'Kurtas & Tops', 4.6, 150, 60, 'SKU005', 'BIBA', 'Pure Cotton', 'Off-White', ARRAY['S', 'M', 'L'], 'Machine wash cold', TRUE);

-- Insert dummy categories
INSERT INTO categories (name, slug, image) VALUES
('Suit Sets', 'suit-sets', '/placeholder.svg'),
('Kurtas & Tops', 'kurtas-tops', '/placeholder.svg'),
('Dresses', 'dresses', '/placeholder.svg'),
('Dress Material', 'dress-material', '/placeholder.svg'),
('Bottoms', 'bottoms', '/placeholder.svg'),
('Jewellery', 'jewellery', '/placeholder.svg'),
('Fragrances', 'fragrances', '/placeholder.svg'),
('Girls', 'girls', '/placeholder.svg'),
('Collections', 'collections', '/placeholder.svg'),
('Co-ord Sets', 'co-ord-sets', '/placeholder.svg'),
('Sale', 'sale', '/placeholder.svg'),
('New Arrivals', 'new-arrivals', '/placeholder.svg');

-- Insert dummy collections
INSERT INTO collections (name, slug, image) VALUES
('Posh Palette', 'posh-palette', '/images/collections.png'),
('Indigo Chronicals', 'indigo-chronicals', '/images/collections.png'),
('Jewellery', 'jewellery', '/images/collections.png'),
('Luxury Pret', 'luxury-pret', '/images/collections.png');

-- Insert dummy banners
INSERT INTO banners (id, image_url, title, subtitle, button_text, link, position) VALUES
('hero-1', '/images/hero-1.png', 'END OF SEASON SALE', 'FIRST TIME ON DISCOUNT UPTO 50% OFF', 'SHOP NOW', '/sale', 'hero'),
('hero-2', '/images/hero-2.png', 'NEW ARRIVALS', 'Discover the latest trends in ethnic wear', 'EXPLORE NOW', '/new-arrivals', 'hero'),
('promo-1', '/images/favourites.png', 'Kriti''s Favourites', 'Shop her curated collection', 'SHOP NOW', '/kriti-favourites', 'promo'),
('promo-2', '/images/promo-banner-1.png', 'ONLINE EXCLUSIVE', 'Special discounts just for you', 'SHOP NOW', '/online-exclusive', 'promo'),
('promo-3', '/images/promo-banner-2.png', 'BIBA INDIAN WEAR', 'BEST INDIAN ETHNIC WEAR DRESSES ONLINE FOR WOMEN & GIRLS', 'VIEW MORE', '/about-us', 'promo');

-- Insert dummy reviews for the Anarkali Suit Set
INSERT INTO reviews (product_id, user_id, rating, comment) VALUES
('1a2b3c4d-5e6f-7890-1234-567890abcdef', '00000000-0000-0000-0000-000000000000', 5, 'Absolutely stunning! The fabric is so comfortable and the print is vibrant. Received many compliments.'),
('1a2b3c4d-5e6f-7890-1234-567890abcdef', '00000000-0000-0000-0000-000000000001', 4, 'Good quality and fits well. The color is slightly different from the picture but still beautiful.'),
('1a2b3c4d-5e6f-7890-1234-567890abcdef', '00000000-0000-0000-0000-000000000002', 5, 'Loved it! Perfect for a festive occasion. Fast delivery too.');

-- Insert dummy user profiles (for reviews to link to, replace with actual Supabase Auth user IDs if needed)
-- These are placeholder UUIDs. In a real app, these would come from auth.users table.
INSERT INTO profiles (id, name, is_admin) VALUES
('00000000-0000-0000-0000-000000000000', 'Priya Sharma', FALSE),
('00000000-0000-0000-0000-000000000001', 'Anjali Singh', FALSE),
('00000000-0000-0000-0000-000000000002', 'Sneha Patel', FALSE);

-- Example of an admin user profile (replace with actual Supabase Auth user ID)
-- INSERT INTO profiles (id, name, is_admin) VALUES
-- ('YOUR_ACTUAL_SUPABASE_ADMIN_USER_ID', 'Admin User', TRUE);
