import Image from 'next/image'
import React from 'react'
import { FaHeadset,FaTruck, FaLock } from 'react-icons/fa'
import cartImage from "../../assets/images/fresh vegetables and fruits shopping cart illustration, modern clean style, green theme.png"
import SignUpForm from '@/app/_components/SignUpForm'

export default function SignUp() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 md:p-4">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 md:rounded-2xl shadow-lg bg-white overflow-hidden min-h-screen md:min-h-0">

        <div className="flex order-2 md:order-1 flex-col items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-50 p-6 md:p-10">
          <div className="w-full max-w-[200px] md:max-w-sm">
            <Image
              src={cartImage}
              alt="FreshCart shopping cart with fresh vegetables and fruits"
              className="w-full h-auto object-contain drop-shadow-lg"
              priority
            />
          </div>

          <h2 className="mt-4 md:mt-6 text-lg md:text-xl font-bold text-gray-800 text-center">
            FreshCart - Your One-Stop Shop for Fresh Products
          </h2>
          <p className="mt-2 text-xs md:text-sm text-gray-500 text-center">
            Join thousands of happy customers who trust FreshCart for their daily grocery needs
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mt-6">
            <div className="flex items-center gap-1.5 text-[10px] md:text-xs text-gray-600">
              <FaTruck className="text-emerald-500" />
              <span>Free Delivery</span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] md:text-xs text-gray-600">
              <FaLock className="text-emerald-500" />
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] md:text-xs text-gray-600">
              <FaHeadset className="text-emerald-500" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
        <div className="w-full order-1 md:order-2 p-6 md:p-10 flex flex-col items-center justify-center bg-white">
          <SignUpForm />
        </div>

      </div>
    </div>
  )
}
