"use client"

import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, PinIcon as Pinterest, Youtube, Twitter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const Footer: React.FC = () => {
  return (
    <footer className="bg-bibaRed-800 text-white pt-12">
      <div className="container mx-auto px-4">
        {/* Newsletter Section */}
        <div className="bg-bibaRed-600 py-8 px-6 rounded-lg flex flex-col md:flex-row items-center justify-between mb-12">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h3 className="text-2xl font-bold mb-2">BE A PART OF BIBA FAMILY</h3>
            <p className="text-lg">Keep yourself updated with style tips & more</p>
          </div>
          <div className="flex w-full md:w-auto max-w-md">
            <Input
              type="email"
              placeholder="Enter email"
              className="flex-1 rounded-l-md border-none focus:ring-0 text-gray-800"
            />
            <Button className="bg-bibaGold-500 hover:bg-bibaGold-600 text-bibaRed-800 font-bold px-6 rounded-r-md">
              SUBSCRIBE
            </Button>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8 pb-8 border-b border-bibaRed-700">
          <div>
            <h4 className="font-bold text-lg mb-4">TOP CATEGORIES</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/category/anarkali-suit-sets" className="hover:text-bibaGold-500">
                  Anarkali Suit Sets
                </Link>
              </li>
              <li>
                <Link href="/category/kurtas" className="hover:text-bibaGold-500">
                  Kurtas
                </Link>
              </li>
              <li>
                <Link href="/category/biba-girls" className="hover:text-bibaGold-500">
                  Biba Girls
                </Link>
              </li>
              <li>
                <Link href="/category/jewellery" className="hover:text-bibaGold-500">
                  Jewellery
                </Link>
              </li>
              <li>
                <Link href="/category/palazzos" className="hover:text-bibaGold-500">
                  Palazzos
                </Link>
              </li>
              <li>
                <Link href="/category/straight-suit-sets" className="hover:text-bibaGold-500">
                  Straight Suit Sets
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">CUSTOMER SERVICE</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/returns-cancellation" className="hover:text-bibaGold-500">
                  Returns & Cancellation
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="hover:text-bibaGold-500">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:text-bibaGold-500">
                  Contact us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-bibaGold-500">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">BIBA BRAND</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about-us" className="hover:text-bibaGold-500">
                  About us
                </Link>
              </li>
              <li>
                <Link href="/investor-information" className="hover:text-bibaGold-500">
                  Investor Information
                </Link>
              </li>
              <li>
                <Link href="/business-enquiry" className="hover:text-bibaGold-500">
                  Business Enquiry
                </Link>
              </li>
              <li>
                <Link href="/achievements" className="hover:text-bibaGold-500">
                  Achievements
                </Link>
              </li>
              <li>
                <Link href="/store-locator" className="hover:text-bibaGold-500">
                  Store locator
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">MY PROFILE</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/my-account" className="hover:text-bibaGold-500">
                  My account
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="hover:text-bibaGold-500">
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="/return-cancellation" className="hover:text-bibaGold-500">
                  Return & Cancellation
                </Link>
              </li>
              <li>
                <Link href="/my-cart" className="hover:text-bibaGold-500">
                  My cart
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="hover:text-bibaGold-500">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link href="/order-history" className="hover:text-bibaGold-500">
                  Order history
                </Link>
              </li>
            </ul>
          </div>

          <div className="hidden xl:block">
            <h4 className="font-bold text-lg mb-4">QUICK LINKS</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/shipping-policy" className="hover:text-bibaGold-500">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-bibaGold-500">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-bibaGold-500">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/terms-of-use" className="hover:text-bibaGold-500">
                  Terms of use
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media & Payment */}
        <div className="flex flex-col md:flex-row items-center justify-between py-6 border-b border-bibaRed-700">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <span className="text-sm">Follow us</span>
            <div className="flex space-x-3">
              <Link href="#" aria-label="Facebook" className="hover:text-bibaGold-500">
                <Facebook size={20} />
              </Link>
              <Link href="#" aria-label="Instagram" className="hover:text-bibaGold-500">
                <Instagram size={20} />
              </Link>
              <Link href="#" aria-label="Pinterest" className="hover:text-bibaGold-500">
                <Pinterest size={20} />
              </Link>
              <Link href="#" aria-label="Youtube" className="hover:text-bibaGold-500">
                <Youtube size={20} />
              </Link>
              <Link href="#" aria-label="Twitter" className="hover:text-bibaGold-500">
                <Twitter size={20} />
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-sm">
              <Image src="/placeholder.svg" alt="Secure Payments" width={20} height={20} className="mr-2" />
              <span>100% Secure Payments</span>
            </div>
            <div className="flex space-x-2">
              <Image src="/placeholder.svg" alt="Visa" width={40} height={20} />
              <Image src="/placeholder.svg" alt="Mastercard" width={40} height={20} />
              <Image src="/placeholder.svg" alt="Amex" width={40} height={20} />
              <Image src="/placeholder.svg" alt="Discover" width={40} height={20} />
              <Image src="/placeholder.svg" alt="PayPal" width={40} height={20} />
            </div>
          </div>
          <div className="flex items-center text-sm mt-4 md:mt-0">
            <Image src="/placeholder.svg" alt="SSL Lock" width={20} height={20} className="mr-2" />
            <span>256 BIT Encryption</span>
          </div>
        </div>

        {/* Copyright and Disclaimer */}
        <div className="text-center py-4 text-sm text-bibaRed-200">
          <p className="mb-2">
            Copyright to Biba store | Name of Manufacturer - BIBA Fashion Limited | Country of Manufacture - India
          </p>
          <p className="font-bold text-bibaGold-500 mb-2">
            BEWARE OF SPURIOUS PHONE CALLS AND FICTITIOUS/FRAUDULENT OFFERS
          </p>
          <p>
            Please be advised that BIBA does not run any promotions or offers involving electronics or high-value
            products outside of our business. We will never ask for personal information, payments, or banking details
            over the phone. Any such messages are not authorized by BIBA and should be ignored to protect yourself from
            potential scams.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
