"use client"

import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, Heart, ShoppingBag, User, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useSelector } from "react-redux"
import type { RootState } from "@/store"

const Header: React.FC = () => {
  const cartTotalQuantity = useSelector((state: RootState) => state.cart.totalQuantity)
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)

  const navLinks = [
    { name: "NEW", href: "/new-arrivals" },
    { name: "SUIT SETS", href: "/category/suit-sets" },
    { name: "KURTAS & TOPS", href: "/category/kurtas-tops" },
    { name: "DRESSES", href: "/category/dresses" },
    { name: "DRESS MATERIAL", href: "/category/dress-material" },
    { name: "BOTTOMS", href: "/category/bottoms" },
    { name: "JEWELLERY", href: "/category/jewellery" },
    { name: "FRAGRANCES", href: "/category/fragrances" },
    { name: "GIRLS", href: "/category/girls" },
    { name: "COLLECTIONS", href: "/collections" },
    { name: "CO-ORD SETS", href: "/category/co-ord-sets" },
    { name: "SALE", href: "/sale", className: "text-bibaRed-600 font-bold" },
  ]

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top Banner */}
      <div className="bg-bibaGold-500 text-white text-center py-2 text-sm font-medium">
        END OF SEASON SALE - UPTO 50% OFF
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo and Ship To */}
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center">
            <Image src="/placeholder-logo.svg" alt="BIBA Logo" width={80} height={40} className="h-auto" />
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center text-gray-700 text-sm">
                Ship to <Image src="/placeholder.svg" alt="India Flag" width={20} height={15} className="ml-2 mr-1" />{" "}
                India (₹)
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>India (₹)</DropdownMenuItem>
              <DropdownMenuItem>USA ($)</DropdownMenuItem>
              <DropdownMenuItem>UK (£)</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Search Bar (Desktop) */}
        <div className="hidden lg:flex flex-1 max-w-md mx-8 relative">
          <Input
            type="text"
            placeholder="Search kurta, shirts and dupattas"
            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:border-bibaRed-600 focus:ring-1 focus:ring-bibaRed-600"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        </div>

        {/* Icons (Desktop) */}
        <div className="hidden lg:flex items-center space-x-6">
          <Button variant="ghost" size="icon" aria-label="Wishlist">
            <Heart size={24} />
          </Button>
          <Link href="/cart">
            <Button variant="ghost" size="icon" aria-label="Shopping Bag" className="relative">
              <ShoppingBag size={24} />
              {cartTotalQuantity > 0 && (
                <span className="absolute -top-1 -right-1 bg-bibaRed-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartTotalQuantity}
                </span>
              )}
            </Button>
          </Link>
          <Link href={isAuthenticated ? "/dashboard" : "/auth/login"}>
            <Button variant="ghost" size="icon" aria-label="User Account">
              <User size={24} />
            </Button>
          </Link>
        </div>

        {/* Mobile Menu and Icons */}
        <div className="flex lg:hidden items-center space-x-4">
          <Button variant="ghost" size="icon" aria-label="Search">
            <Search size={24} />
          </Button>
          <Link href="/cart">
            <Button variant="ghost" size="icon" aria-label="Shopping Bag" className="relative">
              <ShoppingBag size={24} />
              {cartTotalQuantity > 0 && (
                <span className="absolute -top-1 -right-1 bg-bibaRed-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartTotalQuantity}
                </span>
              )}
            </Button>
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open Menu">
                <Menu size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col p-4">
                <div className="flex justify-end mb-4">
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <X size={24} />
                    </Button>
                  </SheetTrigger>
                </div>
                <Link
                  href={isAuthenticated ? "/dashboard" : "/auth/login"}
                  className="flex items-center py-2 text-lg font-medium text-gray-800 hover:text-bibaRed-600"
                >
                  <User className="mr-2" size={20} /> {isAuthenticated ? "My Account" : "Login / Register"}
                </Link>
                <div className="border-t border-gray-200 my-4"></div>
                <nav className="flex flex-col space-y-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`py-2 text-lg font-medium text-gray-800 hover:text-bibaRed-600 ${link.className || ""}`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Navigation (Desktop) */}
      <nav className="hidden lg:block bg-white border-t border-gray-200">
        <ul className="container mx-auto px-4 flex justify-center space-x-8 py-3">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className={`text-gray-800 hover:text-bibaRed-600 font-medium text-sm uppercase ${link.className || ""}`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Header
