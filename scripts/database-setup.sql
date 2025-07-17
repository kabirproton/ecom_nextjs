-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create subcategories table
CREATE TABLE IF NOT EXISTS subcategories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  discount INTEGER DEFAULT 0,
  images TEXT[] DEFAULT '{}',
  category TEXT NOT NULL,
  subcategory TEXT,
  sizes TEXT[] DEFAULT '{}',
  colors TEXT[] DEFAULT '{}',
  in_stock BOOLEAN DEFAULT true,
  is_on_sale BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  rating DECIMAL(2,1) DEFAULT 0,
  reviews INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create addresses table
CREATE TABLE IF NOT EXISTS addresses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT CHECK (type IN ('home', 'work', 'other')) DEFAULT 'home',
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  pincode TEXT NOT NULL,
  phone TEXT NOT NULL,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  total DECIMAL(10,2) NOT NULL,
  status TEXT CHECK (status IN ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')) DEFAULT 'pending',
  shipping_address JSONB NOT NULL,
  payment_method TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL,
  size TEXT NOT NULL,
  color TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create wishlist table
CREATE TABLE IF NOT EXISTS wishlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT CHECK (role IN ('admin', 'super_admin')) DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE subcategories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for categories (public read)
CREATE POLICY "Categories are viewable by everyone" ON categories FOR SELECT USING (true);
CREATE POLICY "Only admins can modify categories" ON categories FOR ALL USING (
  EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
);

-- RLS Policies for subcategories (public read)
CREATE POLICY "Subcategories are viewable by everyone" ON subcategories FOR SELECT USING (true);
CREATE POLICY "Only admins can modify subcategories" ON subcategories FOR ALL USING (
  EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
);

-- RLS Policies for products (public read)
CREATE POLICY "Products are viewable by everyone" ON products FOR SELECT USING (true);
CREATE POLICY "Only admins can modify products" ON products FOR ALL USING (
  EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
);

-- RLS Policies for addresses
CREATE POLICY "Users can view own addresses" ON addresses FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own addresses" ON addresses FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own addresses" ON addresses FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own addresses" ON addresses FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for orders
CREATE POLICY "Users can view own orders" ON orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own orders" ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can view all orders" ON orders FOR SELECT USING (
  EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
);
CREATE POLICY "Admins can update orders" ON orders FOR UPDATE USING (
  EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
);

-- RLS Policies for order_items
CREATE POLICY "Users can view own order items" ON order_items FOR SELECT USING (
  EXISTS (SELECT 1 FROM orders WHERE id = order_id AND user_id = auth.uid())
);
CREATE POLICY "Users can insert own order items" ON order_items FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM orders WHERE id = order_id AND user_id = auth.uid())
);
CREATE POLICY "Admins can view all order items" ON order_items FOR SELECT USING (
  EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
);

-- RLS Policies for wishlist
CREATE POLICY "Users can view own wishlist" ON wishlist FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert to own wishlist" ON wishlist FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete from own wishlist" ON wishlist FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for admin_users
CREATE POLICY "Admins can view admin users" ON admin_users FOR SELECT USING (
  EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
);
CREATE POLICY "Super admins can modify admin users" ON admin_users FOR ALL USING (
  EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid() AND role = 'super_admin')
);

-- Create functions for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_subcategories_updated_at BEFORE UPDATE ON subcategories FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_addresses_updated_at BEFORE UPDATE ON addresses FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
