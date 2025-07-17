import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Facebook, Instagram, PinIcon as Pinterest, Youtube } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-primary-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        {/* Top Section: Newsletter */}
        <div className="bg-primary-700 py-8 px-6 rounded-lg flex flex-col md:flex-row items-center justify-between gap-6 mb-12 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <Image
              src="/placeholder.svg?height=200&width=200"
              alt="Pattern"
              layout="fill"
              objectFit="cover"
              className="opacity-20"
            />
          </div>
          <div className="relative z-10 text-center md:text-left">
            <h3 className="text-2xl font-bold mb-2">BE A PART OF BIBA FAMILY</h3>
            <p className="text-sm text-primary-100">Keep yourself updated with style tips & more</p>
          </div>
          <div className="relative z-10 flex w-full md:w-auto max-w-md">
            <Input
              type="email"
              placeholder="Enter email"
              className="flex-1 bg-white/20 border-none text-white placeholder:text-primary-100 focus:ring-0 focus:border-primary-500 rounded-r-none"
            />
            <Button className="bg-white text-primary-800 hover:bg-gray-100 rounded-l-none px-6 py-2">SUBSCRIBE</Button>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div>
            <h4 className="font-bold text-lg mb-4 uppercase">TOP CATEGORIES</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-primary-300">
                  Anarkali Suit Sets
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary-300">
                  Kurtas
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary-300">
                  Biba Girls
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary-300">
                  Jewellery
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary-300">
                  Palazzos
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary-300">
                  Straight Suit Sets
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4 uppercase">CUSTOMER SERVICE</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-primary-300">
                  Returns & Cancellation
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary-300">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary-300">
                  Contact us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary-300">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4 uppercase">BIBA BRAND</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-primary-300">
                  About us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary-300">
                  Investor Information
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary-300">
                  Business Enquiry
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary-300">
                  Achievements
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary-300">
                  Store locator
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4 uppercase">MY PROFILE</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-primary-300">
                  My account
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary-300">
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary-300">
                  Return & Cancellation
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary-300">
                  My cart
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary-300">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary-300">
                  Order history
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4 uppercase">QUICK LINKS</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-primary-300">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary-300">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary-300">
                  Terms of use
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section: Social, Payments, Copyright */}
        <div className="border-t border-primary-700 pt-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <span className="text-sm">Follow us</span>
            <div className="flex gap-3">
              <Link href="#" className="text-white hover:text-primary-300">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-white hover:text-primary-300">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-white hover:text-primary-300">
                <Pinterest className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-white hover:text-primary-300">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-center md:items-end gap-2">
            <div className="flex items-center gap-2">
              <Image src="/placeholder.svg?height=20&width=20" alt="Secure" width={20} height={20} />
              <span className="text-sm">100% Secure Payments</span>
              <div className="flex gap-1">
                <Image src="/placeholder.svg?height=20&width=30" alt="Visa" width={30} height={20} />
                <Image src="/placeholder.svg?height=20&width=30" alt="Mastercard" width={30} height={20} />
                <Image src="/placeholder.svg?height=20&width=30" alt="Amex" width={30} height={20} />
                <Image src="/placeholder.svg?height=20&width=30" alt="Discover" width={30} height={20} />
                <Image src="/placeholder.svg?height=20&width=30" alt="PayPal" width={30} height={20} />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Image src="/placeholder.svg?height=20&width=20" alt="SSL" width={20} height={20} />
              <span className="text-sm">256 BIT Encryption</span>
            </div>
          </div>
        </div>

        <div className="text-center text-xs text-primary-100 mt-8">
          <p>Copyright to Biba store | Name of Manufacturer - BIBA Fashion Limited | Country of Manufacture - India</p>
          <p className="mt-4 text-red-300 font-semibold">
            BEWARE OF SPURIOUS PHONE CALLS AND FICTITIOUS/FRAUDULENT OFFERS
          </p>
          <p className="mt-2 max-w-3xl mx-auto">
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
