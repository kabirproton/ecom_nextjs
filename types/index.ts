export interface Product {
  id: string
  name: string
  description: string
  price: number
  discountPrice?: number
  images: string[]
  category: string
  rating: number
  numReviews: number
  stock: number
  sku: string
  brand: string
  material: string
  color: string
  size: string[]
  careInstructions: string
  isFeatured: boolean
  createdAt: string
  updatedAt: string
}

export interface CartItem extends Product {
  quantity: number
}

export interface User {
  id: string
  email: string
  name?: string
  address?: string
  phone?: string
  isAdmin: boolean
}

export interface Order {
  id: string
  userId: string
  items: CartItem[]
  totalAmount: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  orderDate: string
  shippingAddress: string
  paymentMethod: string
}

export interface Review {
  id: string
  productId: string
  userId: string
  rating: number
  comment: string
  createdAt: string
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
  selectedProduct: Product | null
}
