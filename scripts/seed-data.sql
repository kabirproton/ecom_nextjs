-- Seed Products
INSERT INTO products (id, name, description, price, original_price, discount, image_url, category, rating, reviews, is_new_arrival, is_online_exclusive)
VALUES
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Orange Cotton Printed Anarkali Suit Set', 'A beautiful orange cotton printed anarkali suit set for festive occasions.', 3496.00, 4395.00, 20, '/placeholder.jpg', 'Suit Sets', 4.5, 120, TRUE, TRUE),
  ('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'Indigo Blue and White Straight Co-ord Set', 'Stylish indigo blue and white co-ord set for a modern look.', 3219.00, 4599.00, 30, '/placeholder.jpg', 'Co-ord Sets', 4.2, 85, FALSE, FALSE),
  ('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'Orange Cotton Blend Schiffli Straight Kurta Set', 'Comfortable orange cotton blend kurta set with schiffli work.', 2799.00, 3999.00, 30, '/placeholder.jpg', 'Kurtas', 4.0, 60, FALSE, FALSE),
  ('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', 'Dull Blue Cotton Flared Printed Kurta Set', 'Elegant dull blue flared kurta set with intricate prints.', 2799.00, 3599.00, 22, '/placeholder.jpg', 'Kurtas', 4.7, 150, FALSE, FALSE),
  ('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a15', 'Off-White and Black Pure Cotton Printed Kurta Set', 'Classic off-white and black pure cotton kurta set for everyday wear.', 2519.00, 3599.00, 30, '/placeholder.jpg', 'Kurtas', 4.3, 95, FALSE, FALSE),
  ('f0eebc99-9c0b-4ef8-bb6d-6bb9bd380a16', 'Pink Floral Embroidered Anarkali Suit', 'Stunning pink anarkali suit with delicate floral embroidery.', 5999.00, 7999.00, 25, '/placeholder.jpg', 'Suit Sets', 4.8, 200, TRUE, FALSE),
  ('g0eebc99-9c0b-4ef8-bb6d-6bb9bd380a17', 'Green Silk Blend Straight Kurta', 'Luxurious green silk blend straight kurta, perfect for special occasions.', 3899.00, 4500.00, 13, '/placeholder.jpg', 'Kurtas', 4.1, 70, FALSE, FALSE),
  ('h0eebc99-9c0b-4ef8-bb6d-6bb9bd380a18', 'Yellow Georgette Palazzo Set', 'Vibrant yellow georgette palazzo set with intricate detailing.', 4200.00, 5000.00, 16, '/placeholder.jpg', 'Bottoms', 4.6, 110, FALSE, FALSE);

-- Seed Banners
INSERT INTO banners (id, image_url, title, subtitle, button_text, link, position)
VALUES
  ('banner-hero-1', '/images/hero-1.png', 'END OF SEASON SALE', 'FIRST TIME ON DISCOUNT UPTO 50% OFF', 'SHOP NOW', '/sale', 'hero'),
  ('banner-hero-2', '/images/hero-2.png', 'NEW ARRIVALS', 'Discover the latest trends in ethnic wear', 'EXPLORE NOW', '/new-arrivals', 'hero'),
  ('banner-promo-1', '/images/favourites.png', 'Kriti''s Favourites', 'Shop her curated collection', 'SHOP NOW', '/kriti-favourites', 'promo'),
  ('banner-promo-2', '/images/promo-banner-1.png', 'ONLINE EXCLUSIVE', 'Special discounts just for you', 'SHOP NOW', '/online-exclusive', 'promo'),
  ('banner-promo-3', '/images/promo-banner-2.png', 'BIBA INDIAN WEAR', 'BEST INDIAN ETHNIC WEAR DRESSES ONLINE FOR WOMEN & GIRLS', 'VIEW MORE', '/about-us', 'promo');

-- Seed a dummy admin user (replace with actual user ID from Supabase Auth)
-- You would typically get the user ID after a user signs up via Supabase Auth
-- For demonstration, let's assume a user with ID 'some-uuid-from-supabase-auth' exists
-- INSERT INTO profiles (id, email, full_name, is_admin)
-- VALUES ('<YOUR_SUPABASE_AUTH_USER_ID_HERE>', 'admin@example.com', 'Admin User', TRUE);
