"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, Heart, ShoppingBag, User, Menu, X, ChevronDown } from "lucide-react"
import { useSelector } from "react-redux"
import type { RootState } from "@/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const Header: React.FC = () => {
  const cartQuantity = useSelector((state: RootState) => state.cart.totalQuantity)
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navLinks = [
    { name: "NEW", href: "/new-arrivals", isNew: true },
    { name: "SUIT SETS", href: "/suit-sets" },
    { name: "KURTAS & TOPS", href: "/kurtas-tops" },
    { name: "DRESSES", href: "/dresses" },
    { name: "DRESS MATERIAL", href: "/dress-material" },
    { name: "BOTTOMS", href: "/bottoms" },
    { name: "JEWELLERY", href: "/jewellery" },
    { name: "FRAGRANCES", href: "/fragrances" },
    { name: "GIRLS", href: "/girls" },
    { name: "COLLECTIONS", href: "/collections" },
    { name: "CO-ORD SETS", href: "/co-ord-sets" },
    { name: "SALE", href: "/sale", isSale: true },
  ]

  const categories = [
    { name: "Shop All", href: "/shop-all" },
    { name: "Straight Suit Sets", href: "/straight-suit-sets" },
    { name: "Anarkali Suit Sets", href: "/anarkali-suit-sets" },
    { name: "Flared Suit Sets", href: "/flared-suit-sets" },
    { name: "A-line & Kalidar Suits", href: "/a-line-kalidar-suits" },
    { name: "Asymmetric Suits", href: "/asymmetric-suits" },
    { name: "Fusion Suit Sets", href: "/fusion-suit-sets" },
    { name: "Lehengas & Skirt Sets", href: "/lehengas-skirt-sets" },
    { name: "Unstitched Suit Sets", href: "/unstitched-suit-sets" },
  ]

  const collections = [
    { name: "Shop All", href: "/collections/shop-all" },
    { name: "Autumn Winter", href: "/collections/autumn-winter" },
    { name: "Festive", href: "/collections/festive" },
    { name: "Spring Summer", href: "/collections/spring-summer" },
    { name: "Wedding", href: "/collections/wedding" },
    { name: "Workwear", href: "/collections/workwear" },
  ]

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top Sale Banner */}
      <div className="bg-bibaRed-700 text-white text-center py-2 text-sm font-medium">
        END OF SEASON SALE - UPTO 50% OFF
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Mobile Menu Toggle */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b">
                <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                  <Image src="/placeholder-logo.png" alt="BIBA Logo" width={80} height={30} />
                </Link>
                <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="h-6 w-6" />
                  <span className="sr-only">Close Menu</span>
                </Button>
              </div>
              <nav className="flex-1 overflow-y-auto p-4">
                <ul className="space-y-2">
                  {navLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className={`block py-2 px-3 rounded-md text-lg font-medium ${link.isNew ? "text-bibaRed-700" : ""} ${link.isSale ? "text-bibaRed-700 font-bold" : ""} hover:bg-gray-100`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/placeholder-logo.png" alt="BIBA Logo" width={100} height={40} className="hidden lg:block" />
          <Image src="/placeholder-logo.png" alt="BIBA Logo" width={80} height={30} className="lg:hidden" />
        </Link>

        {/* Ship To & Search (Desktop) */}
        <div className="hidden lg:flex items-center gap-4 flex-1 max-w-xl mx-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-1 text-sm">
                Ship to{" "}
                <Image
                  src="/placeholder.svg?height=16&width=24"
                  alt="India Flag"
                  width={24}
                  height={16}
                  className="ml-1"
                />{" "}
                India (₹) <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>India (₹)</DropdownMenuItem>
              <DropdownMenuItem>USA ($)</DropdownMenuItem>
              <DropdownMenuItem>UK (£)</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="relative flex-1">
            <Input
              type="search"
              placeholder="Search kurta, shirts and dupattas"
              className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:ring-bibaRed-500 focus:border-bibaRed-500"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Icons (Desktop) */}
        <div className="hidden lg:flex items-center gap-4">
          <Button variant="ghost" size="icon" aria-label="Wishlist">
            <Heart className="h-6 w-6" />
          </Button>
          <Link href="/cart" className="relative">
            <Button variant="ghost" size="icon" aria-label="Shopping Bag">
              <ShoppingBag className="h-6 w-6" />
              {cartQuantity > 0 && (
                <span className="absolute -top-1 -right-1 bg-bibaRed-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {cartQuantity}
                </span>
              )}
            </Button>
          </Link>
          <Link href={isAuthenticated ? "/profile" : "/auth/login"}>
            <Button variant="ghost" size="icon" aria-label="Account">
              <User className="h-6 w-6" />
            </Button>
          </Link>
        </div>

        {/* Icons (Mobile) */}
        <div className="flex lg:hidden items-center gap-2">
          <Button variant="ghost" size="icon" aria-label="Search">
            <Search className="h-6 w-6" />
          </Button>
          <Link href="/cart" className="relative">
            <Button variant="ghost" size="icon" aria-label="Shopping Bag">
              <ShoppingBag className="h-6 w-6" />
              {cartQuantity > 0 && (
                <span className="absolute -top-1 -right-1 bg-bibaRed-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {cartQuantity}
                </span>
              )}
            </Button>
          </Link>
          <Link href={isAuthenticated ? "/profile" : "/auth/login"}>
            <Button variant="ghost" size="icon" aria-label="Account">
              <User className="h-6 w-6" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Navigation Menu (Desktop) */}
      <nav className="hidden lg:block bg-white border-t border-gray-200">
        <ul className="container mx-auto px-4 flex justify-center space-x-8">
          {navLinks.map((link) => (
            <li key={link.name} className="group relative">
              <Link
                href={link.href}
                className={`block py-3 text-sm font-medium uppercase ${link.isNew ? "text-bibaRed-700" : ""} ${link.isSale ? "text-bibaRed-700 font-bold" : ""} hover:text-bibaRed-600`}
              >
                {link.name}
              </Link>
              {/* Mega Menu for NEW and DRESSES */}
              {(link.name === "NEW" || link.name === "DRESSES") && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-0.5 w-[800px] bg-white shadow-lg rounded-b-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out z-40 flex p-6">
                  <div className="w-1/2 pr-4 border-r border-gray-200">
                    <h3 className="font-semibold text-lg mb-3 text-gray-800">CATEGORY</h3>
                    <ul className="space-y-2">
                      {categories.map((cat) => (
                        <li key={cat.name}>
                          <Link href={cat.href} className="block text-gray-700 hover:text-bibaRed-600 text-sm">
                            {cat.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="w-1/2 pl-4">
                    <h3 className="font-semibold text-lg mb-3 text-gray-800">COLLECTION</h3>
                    <ul className="space-y-2">
                      {collections.map((col) => (
                        <li key={col.name}>
                          <Link href={col.href} className="block text-gray-700 hover:text-bibaRed-600 text-sm">
                            {col.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Image for NEW/DRESSES mega menu */}
                  {link.name === "NEW" && (
                    <div className="absolute right-0 top-0 h-full w-[300px] overflow-hidden rounded-r-lg">
                      <Image
                        src="/images/category-new.png"
                        alt="New Arrivals"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-r-lg"
                      />
                    </div>
                  )}
                  {link.name === "DRESSES" && (
                    <div className="absolute right-0 top-0 h-full w-[300px] overflow-hidden rounded-r-lg">
                      <Image
                        src="/images/category-dresses.png"
                        alt="Dresses"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-r-lg"
                      />
                    </div>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Header
