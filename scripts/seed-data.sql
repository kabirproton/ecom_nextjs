-- Insert sample categories
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
('Co-ord Sets', 'co-ord-sets', '/placeholder.svg');

-- Insert sample products
INSERT INTO products (name, description, price, original_price, discount, images, category, sizes, colors, in_stock, is_on_sale, is_featured, rating, reviews) VALUES
('Orange Cotton Printed Anarkali Suit Set', 'Beautiful orange cotton printed anarkali suit set perfect for festive occasions', 3496, 4995, 30, ARRAY['/placeholder.svg'], 'suit-sets', ARRAY['S', 'M', 'L', 'XL'], ARRAY['Orange'], true, true, true, 4.5, 128),
('Indigo Blue and White Straight Co-ord Set', 'Stylish indigo blue and white straight co-ord set for casual wear', 3219, 4599, 30, ARRAY['/placeholder.svg'], 'co-ord-sets', ARRAY['S', 'M', 'L', 'XL'], ARRAY['Blue', 'White'], true, true, true, 4.3, 95),
('Orange Cotton Blend Schiffli Straight Kurta Set', 'Elegant orange cotton blend schiffli kurta set with intricate embroidery', 2799, 3999, 30, ARRAY['/placeholder.svg'], 'kurtas-tops', ARRAY['S', 'M', 'L', 'XL'], ARRAY['Orange'], true, true, true, 4.7, 203),
('Dull Blue Cotton Flared Printed Kurta Set', 'Comfortable dull blue cotton flared kurta set with beautiful prints', 2799, 3999, 30, ARRAY['/placeholder.svg'], 'kurtas-tops', ARRAY['S', 'M', 'L', 'XL'], ARRAY['Blue'], true, true, true, 4.4, 156),
('Off-White and Black Pure Cotton Printed Kurta Set', 'Classic off-white and black cotton kurta set with traditional prints', 2519, 3599, 30, ARRAY['/placeholder.svg'], 'kurtas-tops', ARRAY['S', 'M', 'L', 'XL'], ARRAY['Off-White', 'Black'], true, true, true, 4.6, 89),
('Pink Floral Anarkali Dress', 'Stunning pink floral anarkali dress for special occasions', 4299, 5999, 28, ARRAY['/placeholder.svg'], 'dresses', ARRAY['S', 'M', 'L', 'XL'], ARRAY['Pink'], true, true, false, 4.2, 67),
('Green Silk Palazzo Set', 'Luxurious green silk palazzo set with matching dupatta', 3899, 5299, 26, ARRAY['/placeholder.svg'], 'bottoms', ARRAY['S', 'M', 'L', 'XL'], ARRAY['Green'], true, true, false, 4.8, 142),
('Traditional Gold Necklace Set', 'Beautiful traditional gold-plated necklace set with earrings', 1999, 2999, 33, ARRAY['/placeholder.svg'], 'jewellery', ARRAY['One Size'], ARRAY['Gold'], true, true, false, 4.5, 89),
('Floral Perfume 50ml', 'Enchanting floral fragrance perfect for everyday wear', 1299, 1799, 28, ARRAY['/placeholder.svg'], 'fragrances', ARRAY['50ml'], ARRAY['Clear'], true, true, false, 4.1, 234),
('Kids Pink Lehenga Set', 'Adorable pink lehenga set for little princesses', 2199, 2999, 27, ARRAY['/placeholder.svg'], 'girls', ARRAY['2-3Y', '4-5Y', '6-7Y', '8-9Y'], ARRAY['Pink'], true, true, false, 4.7, 156);

-- Create a super admin user (you'll need to sign up with this email first)
-- INSERT INTO admin_users (user_id, role) VALUES 
-- ((SELECT id FROM auth.users WHERE email = 'admin@biba.com'), 'super_admin');
