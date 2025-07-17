"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, Heart, User, ShoppingBag, Menu, X, ChevronDown } from "lucide-react"
import { useSelector } from "react-redux"
import type { RootState } from "@/store"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { itemCount } = useSelector((state: RootState) => state.cart)
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)

  const categories = [
    "NEW",
    "SUIT SETS",
    "KURTAS & TOPS",
    "DRESSES",
    "DRESS MATERIAL",
    "BOTTOMS",
    "JEWELLERY",
    "FRAGRANCES",
    "GIRLS",
    "COLLECTIONS",
    "CO-ORD SETS",
    "SALE",
  ]

  return (
    <>
      {/* Top Banner */}
      <div className="bg-yellow-400 text-center py-2 text-sm font-medium text-gray-800">
        END OF SEASON SALE - UPTO 50% OFF
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Mobile Menu Button */}
            <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="text-2xl font-bold text-red-800">BIBA</div>
            </Link>

            {/* Country Selector */}
            <div className="hidden md:flex items-center space-x-2 text-sm">
              <span>Ship to</span>
              <div className="flex items-center space-x-1">
                <Image src="/placeholder.svg" alt="India" width={20} height={15} />
                <span>India (₹)</span>
                <ChevronDown size={16} />
              </div>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search kurta, shirts and dupattas"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-4">
              <button className="md:hidden" onClick={() => setIsSearchOpen(!isSearchOpen)}>
                <Search size={24} />
              </button>
              <Link href="/wishlist" className="hover:text-red-600">
                <Heart size={24} />
              </Link>
              <Link href={isAuthenticated ? "/profile" : "/auth/login"} className="hover:text-red-600">
                <User size={24} />
              </Link>
              <Link href="/cart" className="relative hover:text-red-600">
                <ShoppingBag size={24} />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Mobile Search */}
          {isSearchOpen && (
            <div className="md:hidden py-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search kurta, shirts and dupattas"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="bg-white border-t">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="hidden md:flex space-x-8 overflow-x-auto">
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/category/${category.toLowerCase().replace(/\s+/g, "-")}`}
                  className={`py-4 px-2 text-sm font-medium whitespace-nowrap hover:text-red-600 ${
                    category === "NEW"
                      ? "bg-red-600 text-white px-4 rounded-sm"
                      : category === "SALE"
                        ? "bg-red-600 text-white px-4 rounded-sm"
                        : "text-gray-700"
                  }`}
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-2 space-y-2">
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/category/${category.toLowerCase().replace(/\s+/g, "-")}`}
                  className="block py-2 text-sm font-medium text-gray-700 hover:text-red-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  )
}

export default Header
