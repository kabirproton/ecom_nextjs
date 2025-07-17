-- Insert dummy products
INSERT INTO products (id, name, description, price, discount_price, images, category, rating, num_reviews, stock, sku, brand, material, color, size, care_instructions, is_featured) VALUES
('1a2b3c4d-5e6f-7890-1234-567890abcdef', 'Orange Cotton Printed Anarkali Suit Set', 'A beautiful orange cotton anarkali suit set with intricate prints, perfect for festive occasions.', 3499.00, 2999.00, ARRAY['/images/recommended-products.png', '/images/product-detail-1.png', '/images/product-detail-2.png'], 'Suit Sets', 4.5, 120, 50, 'SKU001', 'BIBA', 'Cotton', 'Orange', ARRAY['S', 'M', 'L', 'XL'], 'Hand wash cold', TRUE),
('2b3c4d5e-6f78-9012-3456-7890abcdef12', 'Indigo Blue and White Straight Co-ord Set', 'Stylish indigo blue and white co-ord set with a straight fit, ideal for casual wear.', 4599.00, 3219.00, ARRAY['/images/recommended-products.png', '/images/product-detail-3.png'], 'Co-ord Sets', 4.2, 85, 30, 'SKU002', 'BIBA', 'Rayon', 'Blue', ARRAY['S', 'M', 'L'], 'Machine wash gentle', TRUE),
('3c4d5e6f-7890-1234-5678-90abcdef1234', 'Orange Cotton Blend Schiffli Straight Kurta Set', 'Elegant orange kurta set with schiffli embroidery, suitable for office or daily wear.', 3999.00, 2799.00, ARRAY['/images/recommended-products.png'], 'Kurtas & Tops', 4.0, 60, 40, 'SKU003', 'BIBA', 'Cotton Blend', 'Orange', ARRAY['M', 'L', 'XL'], 'Dry clean only', FALSE),
('4d5e6f78-9012-3456-7890-abcdef123456', 'Dull Blue Cotton Flared Printed Kurta Set', 'Comfortable dull blue flared kurta set with subtle prints, great for summer.', 3599.00, 2799.00, ARRAY['/images/recommended-products.png'], 'Kurtas & Tops', 4.3, 95, 25, 'SKU004', 'BIBA', 'Cotton', 'Blue', ARRAY['S', 'M', 'L', 'XL'], 'Hand wash cold', FALSE),
('5e6f7890-1234-5678-90ab-cdef12345678', 'Off-White and Black Pure Cotton Printed Kurta Set', 'Classic off-white and black printed kurta set, versatile for various occasions.', 3599.00, 2519.00, ARRAY['/images/recommended-products.png'], 'Kurtas & Tops', 4.6, 150, 60, 'SKU005', 'BIBA', 'Pure Cotton', 'Off-White', ARRAY['S', 'M', 'L'], 'Machine wash cold', TRUE);

-- Insert dummy user profile (for an admin user)
-- NOTE: You'll need to manually create a user in Supabase Auth first, then get their `id` (UUID)
-- and replace 'YOUR_SUPABASE_USER_ID_HERE' with that ID.
-- For example, if you sign up with email 'admin@example.com' and password 'password123',
-- then find that user's ID in the Supabase Auth -> Users table.
-- INSERT INTO profiles (id, name, is_admin) VALUES
-- ('YOUR_SUPABASE_USER_ID_HERE', 'Admin User', TRUE);
