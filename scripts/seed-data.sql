-- Insert dummy products
INSERT INTO products (id, name, description, price, original_price, discount, image_url, images, category, rating, reviews, is_new_arrival, is_online_exclusive, sizes, colors, material, care_instructions) VALUES
('1a2b3c4d-5e6f-7890-1234-567890abcdef', 'Orange Cotton Printed Anarkali Suit Set', 'A beautiful orange cotton printed anarkali suit set for festive occasions. This elegant ensemble features intricate prints and a comfortable cotton blend fabric, perfect for all-day wear. The Anarkali style offers a flattering silhouette, making it a must-have for your ethnic wardrobe. Pair it with traditional jewelry for a complete look.', 3496.00, 4395.00, 20, '/images/product-detail-1.png', ARRAY['/images/product-detail-1.png', '/images/product-detail-2.png', '/images/product-detail-3.png', '/placeholder.jpg'], 'Suit Sets', 4.5, 120, TRUE, TRUE, ARRAY['S', 'M', 'L', 'XL', 'XXL'], ARRAY['Orange', 'Red', 'Yellow'], 'Cotton Blend', 'Hand wash cold, do not bleach, iron on low heat.'),
('2b3c4d5e-6f78-9012-3456-7890abcdef01', 'Indigo Blue and White Straight Co-ord Set', 'Stylish indigo blue and white co-ord set for a modern look. Made from breathable fabric, it is ideal for casual outings or semi-formal events. The straight cut offers a sleek and contemporary appeal.', 3219.00, 4599.00, 30, '/placeholder.jpg', ARRAY['/placeholder.jpg'], 'Co-ord Sets', 4.2, 85, FALSE, FALSE, ARRAY['S', 'M', 'L'], ARRAY['Blue', 'White'], 'Viscose', 'Dry clean only.'),
('3c4d5e6f-7890-1234-5678-90abcdef0123', 'Orange Cotton Blend Schiffli Straight Kurta Set', 'Comfortable orange cotton blend kurta set with schiffli work. This set combines traditional craftsmanship with modern comfort, making it suitable for daily wear or small gatherings. The intricate schiffli detailing adds a touch of elegance.', 2799.00, 3999.00, 30, '/placeholder.jpg', ARRAY['/placeholder.jpg'], 'Kurtas', 4.0, 60, FALSE, FALSE, ARRAY['M', 'L', 'XL'], ARRAY['Orange'], 'Cotton Blend', 'Machine wash gentle.'),
('4d5e6f78-9012-3456-7890-abcdef012345', 'Dull Blue Cotton Flared Printed Kurta Set', 'Elegant dull blue flared kurta set with intricate prints. Its flowy design provides comfort and a graceful silhouette, perfect for summer events or casual wear. The unique print makes it stand out.', 2799.00, 3599.00, 22, '/placeholder.jpg', ARRAY['/placeholder.jpg'], 'Kurtas', 4.7, 150, TRUE, FALSE, ARRAY['S', 'M', 'L', 'XL'], ARRAY['Blue'], 'Cotton', 'Hand wash.'),
('5e6f7890-1234-5678-90ab-cdef01234567', 'Off-White and Black Pure Cotton Printed Kurta Set', 'Classic off-white and black pure cotton kurta set for everyday wear. Simple yet stylish, this set is versatile and can be dressed up or down. The pure cotton ensures maximum comfort.', 2519.00, 3599.00, 30, '/placeholder.jpg', ARRAY['/placeholder.jpg'], 'Kurtas', 4.3, 95, FALSE, TRUE, ARRAY['S', 'M', 'L', 'XL'], ARRAY['Off-White', 'Black'], 'Pure Cotton', 'Machine wash cold.'),
('6f7890ab-cdef-0123-4567-890abcdef012', 'Pink Floral Embroidered Anarkali Suit', 'Stunning pink anarkali suit with delicate floral embroidery. This piece is designed for grand occasions, offering a rich look with its detailed work and luxurious fabric. It embodies traditional charm with a contemporary twist.', 5999.00, 7999.00, 25, '/placeholder.jpg', ARRAY['/placeholder.jpg'], 'Suit Sets', 4.8, 200, TRUE, FALSE, ARRAY['S', 'M', 'L', 'XL'], ARRAY['Pink'], 'Silk Blend', 'Dry clean only.'),
('7890abcd-ef01-2345-6789-0abcdef01234', 'Green Silk Blend Straight Kurta', 'Luxurious green silk blend straight kurta, perfect for special occasions. Its rich texture and vibrant color make it an excellent choice for festive wear. Simple yet elegant, it can be paired with various bottoms.', 3899.00, 4500.00, 13, '/placeholder.jpg', ARRAY['/placeholder.jpg'], 'Kurtas', 4.1, 70, FALSE, FALSE, ARRAY['M', 'L', 'XL'], ARRAY['Green'], 'Silk Blend', 'Dry clean only.'),
('890abcde-f012-3456-7890-abcdef012345', 'Yellow Georgette Palazzo Set', 'Vibrant yellow georgette palazzo set with intricate detailing. This lightweight and airy set is perfect for summer, offering both comfort and style. The palazzo pants provide a modern silhouette.', 4200.00, 5000.00, 16, '/placeholder.jpg', ARRAY['/placeholder.jpg'], 'Bottoms', 4.6, 110, FALSE, FALSE, ARRAY['S', 'M', 'L'], ARRAY['Yellow'], 'Georgette', 'Hand wash cold.');

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
('Posh Palette', 'posh-palette', '/placeholder.jpg'),
('Indigo Chronicals', 'indigo-chronicals', '/placeholder.jpg'),
('Jewellery', 'jewellery', '/placeholder.jpg'),
('Luxury Pret', 'luxury-pret', '/placeholder.jpg');

-- Insert dummy banners
INSERT INTO banners (id, image_url, title, subtitle, button_text, link, position) VALUES
('hero-1', '/images/hero-1.png', 'END OF SEASON SALE', 'FIRST TIME ON DISCOUNT UPTO 50% OFF', 'SHOP NOW', '/sale', 'hero'),
('hero-2', '/images/hero-2.png', 'NEW ARRIVALS', 'Discover the latest trends in ethnic wear', 'EXPLORE NOW', '/new-arrivals', 'hero'),
('promo-1', '/images/favourites.png', 'Kriti''s Favourites', 'Shop her curated collection', 'SHOP NOW', '/kriti-favourites', 'promo'),
('promo-2', '/images/promo-banner-1.png', 'ONLINE EXCLUSIVE', 'Special discounts just for you', 'SHOP NOW', '/online-exclusive', 'promo'),
('promo-3', '/images/promo-banner-2.png', 'BIBA INDIAN WEAR', 'BEST INDIAN ETHNIC WEAR DRESSES ONLINE FOR WOMEN & GIRLS', 'VIEW MORE', '/about-us', 'promo');

-- Insert dummy reviews for the Anarkali Suit Set
INSERT INTO reviews (product_id, user_id, user_name, rating, comment) VALUES
('1a2b3c4d-5e6f-7890-1234-567890abcdef', NULL, 'Priya Sharma', 5, 'Absolutely stunning! The fabric is so comfortable and the print is vibrant. Received many compliments.'),
('1a2b3c4d-5e6f-7890-1234-567890abcdef', NULL, 'Anjali Singh', 4, 'Good quality and fits well. The color is slightly different from the picture but still beautiful.'),
('1a2b3c4d-5e6f-7890-1234-567890abcdef', NULL, 'Sneha Patel', 5, 'Loved it! Perfect for a festive occasion. Fast delivery too.');
