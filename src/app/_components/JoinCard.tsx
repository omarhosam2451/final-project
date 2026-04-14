"use client"

import React, { useState } from 'react'
import { z } from 'zod'
import { MdEmail } from 'react-icons/md'
import { FaLeaf, FaTruck, FaTag, FaApple, FaArrowRight, FaCheckCircle, FaStar } from 'react-icons/fa'
import { SiGoogleplay } from 'react-icons/si'
import { BsLightningFill } from 'react-icons/bs'

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address")
})

export default function JoinCard() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  function handleSubscribe() {
    const result = emailSchema.safeParse({ email })
    if (!result.success) {
      setError(result.error.issues[0].message)
      setSubscribed(false)
      return
    }
    setError("")
    setSubscribed(true)
  }

  return (
    <div className="w-11/12 mx-auto my-10 rounded-3xl bg-gradient-to-br from-emerald-50 to-white border border-gray-100 p-10 grid grid-cols-1 md:grid-cols-2 gap-10 shadow-sm">

      <div className="flex flex-col gap-6">

        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center shadow-md">
            <MdEmail className="text-white text-xl" />
          </div>
          <div>
            <p className="text-xs font-bold tracking-widest text-emerald-600 uppercase">Newsletter</p>
            <p className="text-sm text-gray-400">50,000+ subscribers</p>
          </div>
        </div>

        <div>
          <h2 className="text-4xl font-extrabold text-gray-900 leading-tight">
            Get the Freshest Updates{" "}
            <span className="text-emerald-500">Delivered Free</span>
          </h2>
          <p className="text-gray-500 mt-3 text-sm">
            Weekly recipes, seasonal offers & exclusive member perks.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {[
            { icon: <FaLeaf />, label: "Fresh Picks Weekly" },
            { icon: <FaTruck />, label: "Free Delivery Codes" },
            { icon: <FaTag />, label: "Members-Only Deals" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 border border-gray-200 rounded-full px-4 py-2 text-sm text-gray-600 bg-white shadow-sm">
              <span className="text-emerald-500">{item.icon}</span>
              {item.label}
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <div className="flex-1 flex flex-col">
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setSubscribed(false); setError("") }}
              placeholder="you@example.com"
              className={`w-full border ${error ? 'border-red-400' : 'border-gray-200'} rounded-2xl px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-emerald-400 bg-white shadow-sm`}
            />
            {error && <p className="text-red-400 text-xs mt-1 ml-1">{error}</p>}
          </div>
          <button
            onClick={handleSubscribe}
            className={`flex items-center gap-2 px-6 py-4 rounded-2xl font-semibold text-white text-sm transition-all shadow-md ${
              subscribed
                ? 'bg-emerald-600'
                : 'bg-emerald-500 hover:bg-emerald-600'
            }`}
          >
            {subscribed ? (
              <>
                <FaCheckCircle className="text-lg" />
                You're in
              </>
            ) : (
              <>
                Subscribe
                <FaArrowRight />
              </>
            )}
          </button>
        </div>

        <p className="text-xs text-gray-400 flex items-center gap-1">
          <BsLightningFill className="text-yellow-400" />
          Unsubscribe anytime. No spam, ever.
        </p>

      </div>

      <div className="rounded-3xl bg-gray-900 p-8 flex flex-col gap-6 shadow-xl">

        <div className="flex items-center gap-2">
          <span className="bg-emerald-500 rounded-full p-1.5">
            <BsLightningFill className="text-white text-xs" />
          </span>
          <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase">Mobile App</span>
        </div>

        <div>
          <h3 className="text-2xl font-extrabold text-white">Shop Faster on Our App</h3>
          <p className="text-gray-400 text-sm mt-2">Get app-exclusive deals & 15% off your first order.</p>
        </div>

        <div className="flex flex-col gap-3">
          <button className="flex items-center gap-4 bg-gray-800 hover:bg-gray-700 transition rounded-2xl px-5 py-4 w-full">
            <FaApple className="text-white text-2xl" />
            <div className="text-left">
              <p className="text-gray-400 text-xs uppercase tracking-wider">Download on</p>
              <p className="text-white font-bold text-sm">App Store</p>
            </div>
          </button>
          <button className="flex items-center gap-4 bg-gray-800 hover:bg-gray-700 transition rounded-2xl px-5 py-4 w-full">
            <SiGoogleplay className="text-white text-2xl" />
            <div className="text-left">
              <p className="text-gray-400 text-xs uppercase tracking-wider">Get it on</p>
              <p className="text-white font-bold text-sm">Google Play</p>
            </div>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex text-yellow-400 text-sm">
            {[...Array(5)].map((_, i) => <FaStar key={i} />)}
          </div>
          <span className="text-gray-400 text-sm">4.9 · 100K+ downloads</span>
        </div>

      </div>

    </div>
  )
}