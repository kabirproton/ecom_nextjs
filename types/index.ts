export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  discount?: number
  imageUrl: string
  category: string
  rating: number
  reviews: number
  isNewArrival?: boolean
  isOnlineExclusive?: boolean
}

export interface CartItem extends Product {
  quantity: number
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
