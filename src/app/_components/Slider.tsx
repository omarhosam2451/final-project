"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"
import Image from "next/image"
import Link from "next/link"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md"

interface sliderProps {
  listOfImages: string[]
}

export default function Slider({ listOfImages }: sliderProps) {
  return (
    <div className="relative w-full h-[450px]">

      <Swiper
        modules={[Navigation, Pagination]}
        navigation={{
          nextEl: ".hero-next",
          prevEl: ".hero-prev",
        }}
        pagination={{ clickable: true , bulletActiveClass : "bg-white! opacity-100! w-6! rounded-2xl!"}}
        loop={true}
        className="w-full h-full"
      >
        {listOfImages.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full ">

              <Image
                src={image}
                alt="hero"
                fill
                className="object-cover"
                priority
              />

              <div className="absolute inset-0 bg-gradient-to-r from-green-700/90 to-green-500/60"></div>

              <div className="absolute left-20 top-1/2 -translate-y-1/2 text-white z-10">

                <h2 className="text-4xl font-bold mb-4">
                  Fresh Products Delivered
                </h2>

                <p className="mb-6 text-lg">
                  Get 20% off your first order
                </p>

                <div className="flex gap-4">

                  <Link
                    href="/allproducts"
                    className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold"
                  >
                    Shop Now
                  </Link>

                  <Link
                    href="/allproducts"
                    className="border border-white px-6 py-3 rounded-lg"
                  >
                    View Details
                  </Link>

                </div>

              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button className="hero-prev  cursor-pointer hover:scale-110 text-green-400 transition absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full shadow flex items-center justify-center text-xl">
    <div className="p-2 rounded-full text-2xl">
        <MdNavigateBefore />
      </div>
      </button>

      <button className="hero-next cursor-pointer hover:scale-110 text-green-400 transition absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full shadow flex items-center justify-center text-xl">
       <div className="p-2 rounded-full text-2xl">
        <MdNavigateNext />
      </div>
      </button>

    </div>
  )
}