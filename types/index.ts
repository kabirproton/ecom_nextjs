export interface Product {
  id: string
  name: string
  description: string
  price: number
  discount_price?: number
  images: string[]
  category: string
  rating: number
  num_reviews: number
  stock: number
  sku: string
  brand?: string
  material?: string
  color?: string
  size?: string[]
  care_instructions?: string
  is_featured?: boolean
  created_at: string
  updated_at: string
}

export interface CartItem extends Product {
  quantity: number
  selectedSize?: string
  selectedColor?: string
}

export interface User {
  id: string
  email: string
  name?: string
  isAdmin: boolean
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
}

export interface CartState {
  items: CartItem[]
  totalQuantity: number
  totalAmount: number
}

export interface ProductState {
  products: Product[]
  featuredProducts: Product[]
  loading: boolean
  error: string | null
}

export interface Banner {
  id: string
  image_url: string
  title: string
  subtitle?: string
  button_text?: string
  link: string
  position: "hero" | "promo"
}

export interface Category {
  id: string
  name: string
  slug: string
  image?: string
}

export interface Collection {
  id: string
  name: string
  slug: string
  image?: string
}

export interface Review {
  id: string
  product_id: string
  user_id: string
  rating: number
  comment?: string
  created_at: string
}
