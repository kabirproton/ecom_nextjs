export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  discount?: number
  images: string[]
  category: string
  subcategory?: string
  sizes: string[]
  colors: string[]
  inStock: boolean
  isOnSale?: boolean
  isFeatured?: boolean
  rating?: number
  reviews?: number
  createdAt: string
  updatedAt: string
}

export interface CartItem {
  id: string
  productId: string
  product: Product
  quantity: number
  size: string
  color: string
}

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  addresses: Address[]
  createdAt: string
}

export interface Address {
  id: string
  type: "home" | "work" | "other"
  firstName: string
  lastName: string
  address: string
  city: string
  state: string
  pincode: string
  phone: string
  isDefault: boolean
}

export interface Order {
  id: string
  userId: string
  items: CartItem[]
  total: number
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled"
  shippingAddress: Address
  paymentMethod: string
  createdAt: string
  updatedAt: string
}

export interface Category {
  id: string
  name: string
  slug: string
  image?: string
  subcategories?: Subcategory[]
}

export interface Subcategory {
  id: string
  name: string
  slug: string
  categoryId: string
}
