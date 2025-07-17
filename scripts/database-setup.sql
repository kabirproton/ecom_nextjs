-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL,
  discount_price NUMERIC(10, 2),
  images TEXT[] NOT NULL, -- Array of image URLs
  category TEXT NOT NULL,
  rating NUMERIC(2, 1) DEFAULT 0.0,
  num_reviews INTEGER DEFAULT 0,
  stock INTEGER NOT NULL DEFAULT 0,
  sku TEXT UNIQUE NOT NULL,
  brand TEXT,
  material TEXT,
  color TEXT,
  size TEXT[], -- Array of available sizes
  care_instructions TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create users table (Supabase Auth handles basic user data, this is for extended profile)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  address TEXT,
  phone TEXT,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL, -- Link to auth.users
  items JSONB NOT NULL, -- Store cart items as JSONB array
  total_amount NUMERIC(10, 2) NOT NULL,
  status TEXT DEFAULT 'pending', -- e.g., 'pending', 'processing', 'shipped', 'delivered', 'cancelled'
  order_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  shipping_address TEXT NOT NULL,
  payment_method TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE (product_id, user_id) -- Ensure one review per user per product
);

-- Enable Row Level Security (RLS) for tables
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- RLS Policies for products (read-only for public, full for authenticated)
CREATE POLICY "Allow public read access to products" ON products FOR SELECT USING (TRUE);
CREATE POLICY "Allow authenticated insert on products" ON products FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update on products" ON products FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Allow authenticated delete on products" ON products FOR DELETE USING (auth.uid() IS NOT NULL);

-- RLS Policies for profiles
CREATE POLICY "Allow individual read access to profiles" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Allow individual insert on profiles" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Allow individual update on profiles" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Allow individual delete on profiles" ON profiles FOR DELETE USING (auth.uid() = id);

-- RLS Policies for orders
CREATE POLICY "Allow individual read access to orders" ON orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Allow authenticated insert on orders" ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);
-- Admin policy for orders (admins can update/delete any order)
CREATE POLICY "Allow admin full access to orders" ON orders
  FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = TRUE));

-- RLS Policies for reviews
CREATE POLICY "Allow public read access to reviews" ON reviews FOR SELECT USING (TRUE);
CREATE POLICY "Allow authenticated insert on reviews" ON reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Allow individual update on reviews" ON reviews FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Allow individual delete on reviews" ON reviews FOR DELETE USING (auth.uid() = user_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for products table
CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON products
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Trigger for profiles table
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON profiles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Trigger for orders table
CREATE TRIGGER update_orders_updated_at
BEFORE UPDATE ON orders
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
