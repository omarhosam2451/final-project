import Link from 'next/link'
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaShoppingCart, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'
import { SiVisa, SiMastercard, SiPaypal } from 'react-icons/si'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">

      <div className="w-11/12 mx-auto py-14 grid grid-cols-1 md:grid-cols-5 gap-10">

        <div className="md:col-span-1 flex flex-col gap-5">

          <div className="bg-white rounded-xl px-4 py-3 w-fit flex items-center gap-2">
            <FaShoppingCart className="text-emerald-500 text-xl" />
            <span className="text-gray-900 font-extrabold text-lg">FreshCart</span>
          </div>

          <p className="text-sm leading-relaxed">
            FreshCart is your one-stop destination for quality products. From fashion to electronics, we bring you the best brands at competitive prices with a seamless shopping experience.
          </p>

          <div className="flex flex-col gap-3 text-sm">
            <div className="flex items-center gap-3">
              <FaPhone className="text-emerald-500" />
              <span>+1 (800) 123-4567</span>
            </div>
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-emerald-500" />
              <span>support@freshcart.com</span>
            </div>
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-emerald-500" />
              <span>123 Commerce Street, New York, NY 10001</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {[
              { icon: <FaFacebookF />, green: false },
              { icon: <FaTwitter />, green: false },
              { icon: <FaInstagram />, green: false },
              { icon: <FaYoutube />, green: true },
            ].map((item, i) => (
              <Link
                key={i}
                href="/"
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  item.green
                    ? 'bg-gray-700 text-white hover:bg-emerald-600'
                    : 'bg-gray-700 text-gray-300 hover:bg-emerald-500 hover:text-white'
                }`}
              >
                {item.icon}
              </Link>
            ))}
          </div>

        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-white font-bold text-base">Shop</h4>
          {['All Products', 'Categories', 'Brands', 'Electronics', "Men's Fashion", "Women's Fashion"].map((item) => (
            <Link key={item} href="/" className="text-sm hover:text-emerald-500 transition-colors">
              {item}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-white font-bold text-base">Account</h4>
          {['My Account', 'Order History', 'Wishlist', 'Shopping Cart', 'Sign In', 'Create Account'].map((item) => (
            <Link key={item} href="/" className="text-sm hover:text-emerald-500 transition-colors">
              {item}
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-4">
          <h4 className="text-white font-bold text-base">Support</h4>
          {['Contact Us', 'Help Center', 'Shipping Info', 'Returns & Refunds', 'Track Order'].map((item) => (
            <Link key={item} href="/" className="text-sm hover:text-emerald-500 transition-colors">
              {item}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-white font-bold text-base">Legal</h4>
          {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
            <Link key={item} href="/" className="text-sm hover:text-emerald-500 transition-colors">
              {item}
            </Link>
          ))}
        </div>

      </div>

      <div className="border-t border-gray-700">
        <div className="w-11/12 mx-auto py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm">© 2026 FreshCart. All rights reserved.</p>
          <div className="flex items-center gap-4 text-gray-400">
            <SiVisa className="text-2xl" />
            <SiMastercard className="text-2xl" />
            <SiPaypal className="text-2xl" />
          </div>
        </div>
      </div>

    </footer>
  )
}
