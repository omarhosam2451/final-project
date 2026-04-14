import Link from 'next/link'
import { FaFire, FaStar, FaArrowRight } from 'react-icons/fa'

export default function Cards() {
  return (
    <div className="w-11/12 mx-auto my-10 grid grid-cols-1 md:grid-cols-2 gap-6">

      <div className="relative rounded-3xl p-8 overflow-hidden flex flex-col gap-5"
        style={{ background: 'linear-gradient(135deg, #16a34a, #22c55e)' }}>

        <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white opacity-5 translate-x-10 -translate-y-10" />
        <div className="absolute bottom-0 left-20 w-32 h-32 rounded-full bg-white opacity-5 translate-y-10" />

        <div className="w-fit flex items-center gap-2 bg-white bg-opacity-20 rounded-full px-4 py-1.5  bg-emerald-300!">
          <FaFire className="text-orange-400 text-sm " />
          <span className="text-white text-sm font-medium">Deal of the Day</span>
        </div>

        <div>
          <h2 className="text-3xl font-extrabold text-white">Fresh Organic Fruits</h2>
          <p className="text-green-100 mt-2 text-sm">Get up to 40% off on selected organic fruits</p>
        </div>

        <div className="flex items-baseline gap-3">
          <span className="text-4xl font-extrabold text-white">40% OFF</span>
          <span className="text-green-100 text-sm">Use code: <strong className="text-white">ORGANIC40</strong></span>
        </div>

        <Link
          href="/allproducts"
          className="w-fit flex items-center gap-2 bg-white text-green-700 font-semibold px-6 py-3 rounded-full hover:bg-green-50 transition-all text-sm"
        >
          Shop Now <FaArrowRight />
        </Link>

      </div>

      <div className="relative rounded-3xl p-8 overflow-hidden flex flex-col gap-5"
        style={{ background: 'linear-gradient(135deg, #f97316, #ef4444, #ec4899)' }}>

        <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white opacity-5 translate-x-10 -translate-y-10" />
        <div className="absolute bottom-0 left-20 w-32 h-32 rounded-full bg-white opacity-5 translate-y-10" />

        <div className="w-fit flex items-center gap-2 bg-white bg-opacity-20 rounded-full px-4 py-1.5 bg-red-400!">
          <FaStar className="text-yellow-300 text-sm" />
          <span className="text-white text-sm font-medium">New Arrivals</span>
        </div>

        <div>
          <h2 className="text-3xl font-extrabold text-white">Exotic Vegetables</h2>
          <p className="text-orange-100 mt-2 text-sm">Discover our latest collection of premium vegetables</p>
        </div>

        <div className="flex items-baseline gap-3">
          <span className="text-4xl font-extrabold text-white">25% OFF</span>
          <span className="text-orange-100 text-sm">Use code: <strong className="text-white">FRESH25</strong></span>
        </div>

        <Link
          href="/allproducts"
          className="w-fit flex items-center gap-2 bg-white text-orange-500 font-semibold px-6 py-3 rounded-full hover:bg-orange-50 transition-all text-sm"
        >
          Explore Now <FaArrowRight />
        </Link>

      </div>

    </div>
  )
}