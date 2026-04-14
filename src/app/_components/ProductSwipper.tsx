"use client"
import React, { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

interface ProductGalleryProps {
  imageCover: string;
  images: string[];
  title: string;
}

export default function ProductSwipper({ imageCover, images, title }: ProductGalleryProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const allImages = [imageCover, ...images];

  return (
    <div className="flex flex-col gap-4">

      <Swiper
        modules={[FreeMode, Thumbs]}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className="w-full rounded-2xl border border-gray-200 overflow-hidden bg-gray-50"
      >
        {allImages.map((img, i) => (
          <SwiperSlide key={i}>
            <div className="relative w-full aspect-square">
              <Image
                src={img}
                alt={`${title}-${i}`}
                fill
                className="object-contain p-4"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        modules={[FreeMode, Thumbs]}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        className="w-full"
      >
        {allImages.map((img, i) => (
          <SwiperSlide key={i} className="cursor-pointer">
            <div className={`relative w-full aspect-square rounded-xl border-2 overflow-hidden bg-gray-50 ${
              activeIndex === i ? "border-emerald-500" : "border-gray-200"
            }`}>
              <Image
                src={img}
                alt={`thumb-${i}`}
                fill
                className="object-contain p-1"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

    </div>
  );
}