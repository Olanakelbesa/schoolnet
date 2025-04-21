import { Facebook, Instagram, Twitter, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div>
          <Link href={"/"}>
            <Image
              src={"/logo.png"}
              alt="logo"
              width={120}
              height={120}
              className="py-2"
            />
          </Link>
            <p className="text-gray-300 text-sm">
              Connecting parents and schools across Ethiopia for better educational outcomes.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm">
                  How It Work
                </a>
              </li>
              <li>
                <div className="flex items-center">
                  <a href="#" className="text-gray-300 hover:text-white text-sm">
                    Schools
                  </a>
                  <span className="ml-2 bg-purple-400/10 text-white text-xs px-2 py-1 rounded-full">Coming Soon</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-medium mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-medium mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm">
                  FAQ
                </a>
              </li>
            </ul>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <MapPin size={18} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Twitter size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 py-4 text-center text-gray-400 text-sm">
        © 2025 SchoolNet Ethiopia. All rights reserved.
      </div>
    </footer>
  )
}
