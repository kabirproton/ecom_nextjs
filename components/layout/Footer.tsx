"use client"

import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, PinIcon as Pinterest, Youtube } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const Footer: React.FC = () => {
  return (
    <footer className="bg-bibaRed-800 text-white py-8 md:py-12">
      {/* Newsletter Section */}
      <div className="bg-bibaRed-700 py-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="text-4xl font-bold text-bibaRed-500 hidden md:block">
              <Image src="/placeholder-logo.svg" alt="BIBA Logo" width={60} height={60} className="invert" />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-semibold">BE A PART OF BIBA FAMILY</h3>
              <p className="text-sm text-bibaRed-100">Keep yourself updated with style tips & more</p>
            </div>
          </div>
          <div className="flex w-full max-w-md">
            <Input
              type="email"
              placeholder="Enter email"
              className="flex-1 rounded-l-md rounded-r-none border-none bg-white/20 text-white placeholder:text-bibaRed-100 focus:ring-0 focus:ring-offset-0"
            />
            <Button className="bg-bibaRed-600 hover:bg-bibaRed-500 text-white rounded-r-md rounded-l-none px-6 py-2">
              SUBSCRIBE
            </Button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 pt-8 pb-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {/* Top Categories */}
        <div>
          <h4 className="font-semibold text-lg mb-4">TOP CATEGORIES</h4>
          <ul className="space-y-2 text-sm text-bibaRed-100">
            <li>
              <Link href="#" className="hover:text-white">
                Anarkali Suit Sets
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white">
                Kurtas
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white">
                Biba Girls
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white">
                Jewellery
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white">
                Palazzos
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white">
                Straight Suit Sets
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h4 className="font-semibold text-lg mb-4">CUSTOMER SERVICE</h4>
          <ul className="space-y-2 text-sm text-bibaRed-100">
            <li>
              <Link href="#" className="hover:text-white">
                Returns & Cancellation
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white">
                FAQs
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white">
                Contact us
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white">
                Blog
              </Link>
            </li>
          </ul>
        </div>

        {/* BIBA Brand */}
        <div>
          <h4 className="font-semibold text-lg mb-4">BIBA BRAND</h4>
          <ul className="space-y-2 text-sm text-bibaRed-100">
            <li>
              <Link href="#" className="hover:text-white">
                About us
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white">
                Investor Information
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white">
                Business Enquiry
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white">
                Achievements
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white">
                Store locator
              </Link>
            </li>
          </ul>
        </div>

        {/* My Profile */}
        <div>
          <h4 className="font-semibold text-lg mb-4">MY PROFILE</h4>
          <ul className="space-y-2 text-sm text-bibaRed-100">
            <li>
              <Link href="#" className="hover:text-white">
                My account
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white">
                Track Order
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white">
                Return & Cancellation
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white">
                My cart
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white">
                Wishlist
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white">
                Order history
              </Link>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-lg mb-4">QUICK LINKS</h4>
          <ul className="space-y-2 text-sm text-bibaRed-100">
            <li>
              <Link href="#" className="hover:text-white">
                Shipping Policy
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white">
                Careers
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white">
                Terms of use
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="container mx-auto px-4 pt-6 border-t border-bibaRed-700 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-bibaRed-100">
        <div className="flex items-center gap-4">
          <span className="font-semibold">Follow us</span>
          <div className="flex gap-3">
            <Link href="#" aria-label="Facebook">
              <Facebook className="h-5 w-5 hover:text-white" />
            </Link>
            <Link href="#" aria-label="Instagram">
              <Instagram className="h-5 w-5 hover:text-white" />
            </Link>
            <Link href="#" aria-label="Pinterest">
              <Pinterest className="h-5 w-5 hover:text-white" />
            </Link>
            <Link href="#" aria-label="Youtube">
              <Youtube className="h-5 w-5 hover:text-white" />
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Image
              src="/placeholder.svg?height=20&width=20"
              alt="Secure Payments"
              width={20}
              height={20}
              className="invert"
            />
            <span>100% Secure Payments</span>
          </div>
          <div className="flex gap-1">
            <Image src="/placeholder.svg?height=20&width=30" alt="Visa" width={30} height={20} />
            <Image src="/placeholder.svg?height=20&width=30" alt="Mastercard" width={30} height={20} />
            <Image src="/placeholder.svg?height=20&width=30" alt="Amex" width={30} height={20} />
            <Image src="/placeholder.svg?height=20&width=30" alt="Discover" width={30} height={20} />
            <Image src="/placeholder.svg?height=20&width=30" alt="PayPal" width={30} height={20} />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Image src="/placeholder.svg?height=20&width=20" alt="SSL" width={20} height={20} className="invert" />
          <span>256 BIT Encryption</span>
        </div>
      </div>

      <div className="container mx-auto px-4 text-center text-xs text-bibaRed-200 mt-6">
        <p>Copyright to Biba store | Name of Manufacturer - BIBA Fashion Limited | Country of Manufacture - India</p>
        <p className="mt-4 font-semibold text-bibaRed-50">
          BEWARE OF SPURIOUS PHONE CALLS AND FICTITIOUS/FRAUDULENT OFFERS
        </p>
        <p className="mt-2">
          Please be advised that BIBA does not run any promotions or offers involving electronics or high-value products
          outside of our business. We will never ask for personal information, payments, or banking details over the
          phone. Any such messages are not authorized by BIBA and should be ignored to protect yourself from potential
          scams.
        </p>
      </div>
    </footer>
  )
}

export default Footer
