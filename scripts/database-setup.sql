-- Create the 'products' table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL,
  original_price NUMERIC(10, 2),
  discount INTEGER,
  image_url TEXT NOT NULL,
  images TEXT[], -- Array of image URLs for carousel
  category TEXT NOT NULL,
  rating NUMERIC(2, 1) DEFAULT 0.0,
  reviews INTEGER DEFAULT 0,
  is_new_arrival BOOLEAN DEFAULT FALSE,
  is_online_exclusive BOOLEAN DEFAULT FALSE,
  sizes TEXT[], -- Array of available sizes
  colors TEXT[], -- Array of available colors
  material TEXT,
  care_instructions TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create the 'users' table (for additional user profiles beyond Supabase Auth)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create the 'orders' table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL, -- Link to Supabase Auth user
  total_amount NUMERIC(10, 2) NOT NULL,
  status TEXT DEFAULT 'pending', -- e.g., 'pending', 'processing', 'shipped', 'delivered', 'cancelled'
  order_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  shipping_address JSONB NOT NULL, -- Store address as JSONB
  payment_method TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create the 'order_items' table (junction table for orders and products)
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL,
  price_at_purchase NUMERIC(10, 2) NOT NULL,
  quantity INTEGER NOT NULL,
  selected_size TEXT,
  selected_color TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create the 'reviews' table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  user_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create the 'categories' table
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  image TEXT
);

-- Create the 'collections' table
CREATE TABLE IF NOT EXISTS collections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  image TEXT
);

-- Create the 'banners' table
CREATE TABLE IF NOT EXISTS banners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  image_url TEXT NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  button_text TEXT,
  link TEXT NOT NULL,
  position TEXT NOT NULL -- 'hero' or 'promo'
);

-- Enable Row Level Security (RLS) for tables
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE banners ENABLE ROW LEVEL SECURITY;

-- RLS Policies for 'products'
CREATE POLICY "Public products are viewable by everyone." ON products
  FOR SELECT USING (TRUE);

-- RLS Policies for 'users'
CREATE POLICY "Users can view their own profile." ON users
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile." ON users
  FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can view all user profiles." ON users
  FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = TRUE));
CREATE POLICY "Admins can update any user profile." ON users
  FOR UPDATE TO authenticated USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = TRUE));

-- RLS Policies for 'orders'
CREATE POLICY "Users can view their own orders." ON orders
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all orders." ON orders
  FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = TRUE));
CREATE POLICY "Admins can update order status." ON orders
  FOR UPDATE TO authenticated USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = TRUE));
CREATE POLICY "Authenticated users can create orders." ON orders
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- RLS Policies for 'order_items'
CREATE POLICY "Users can view their own order items." ON order_items
  FOR SELECT USING (EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()));
CREATE POLICY "Admins can view all order items." ON order_items
  FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = TRUE));
CREATE POLICY "Authenticated users can create order items." ON order_items
  FOR INSERT TO authenticated WITH CHECK (TRUE); -- Check will be done on order creation

-- RLS Policies for 'reviews'
CREATE POLICY "Reviews are viewable by everyone." ON reviews
  FOR SELECT USING (TRUE);
CREATE POLICY "Authenticated users can create reviews." ON reviews
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own reviews." ON reviews
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own reviews." ON reviews
  FOR DELETE USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage all reviews." ON reviews
  FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = TRUE));

-- RLS Policies for 'categories' and 'collections'
CREATE POLICY "Categories are viewable by everyone." ON categories
  FOR SELECT USING (TRUE);
CREATE POLICY "Collections are viewable by everyone." ON collections
  FOR SELECT USING (TRUE);
CREATE POLICY "Admins can manage categories." ON categories
  FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = TRUE));
CREATE POLICY "Admins can manage collections." ON collections
  FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = TRUE));

-- RLS Policies for 'banners'
CREATE POLICY "Banners are viewable by everyone." ON banners
  FOR SELECT USING (TRUE);
CREATE POLICY "Admins can manage banners." ON banners
  FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = TRUE));

-- Function to update 'updated_at' timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for 'updated_at' column
CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON products
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
BEFORE UPDATE ON orders
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
