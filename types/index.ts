export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  discount?: number
  imageUrl: string
  images?: string[] // Added for product detail page
  category: string
  rating: number
  reviews: number
  isNewArrival?: boolean
  isOnlineExclusive?: boolean
  sizes?: string[] // Added for product detail page
  colors?: string[] // Added for product detail page
  material?: string // Added for product detail page
  careInstructions?: string // Added for product detail page
}

export interface CartItem extends Product {
  quantity: number
  selectedSize?: string // Added for cart item
  selectedColor?: string // Added for cart item
}

export interface User {
  id: string
  email: string
  name?: string
  isAdmin: boolean
}

export interface Order {
  id: string
  userId: string
  items: CartItem[]
  totalAmount: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  orderDate: string
  shippingAddress: {
    fullName: string
    addressLine1: string
    addressLine2?: string
    city: string
    state: string
    zipCode: string
    country: string
  }
}

export interface Category {
  name: string
  slug: string
  image?: string
}

export interface Collection {
  name: string
  slug: string
  image?: string
}

export interface Banner {
  id: string
  imageUrl: string
  title: string
  subtitle: string
  buttonText: string
  link: string
  position: "hero" | "promo"
}

export interface Review {
  id: string
  productId: string
  userId: string
  userName: string
  rating: number
  comment: string
  date: string
}
