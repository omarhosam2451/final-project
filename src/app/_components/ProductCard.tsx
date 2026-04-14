"use client";

import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import AddtoCardBtn from "./AddtoCardBtn";


interface ProductProps {
    product: {
        _id: string;
        id?: string;
        title: string;
        imageCover: string;
        category: { name: string };
        price: number;
        priceAfterDiscount?: number;
        ratingsAverage: number;
    };
}


export default function ProductCard({ product }: ProductProps) {

    const hasDiscount = product.priceAfterDiscount && product.priceAfterDiscount < product.price;

    const discountPercentage = hasDiscount 
        ? Math.round(((product.price - product.priceAfterDiscount!) / product.price) * 100)
        : 0;


    return (
        <div className="border relative border-gray-100 rounded-2xl p-4 bg-white overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:border-emerald-100 cursor-pointer">
{hasDiscount && (
    <div className="absolute top-4 left-4 z-10 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-sm pointer-events-none">
        -{discountPercentage}%
    </div>
          )}
      <Link href={`/product/${product._id || product.id}`} className="block">
          <div className="mb-4 overflow-hidden rounded-xl bg-gray-50">
              <Image
src={product.imageCover}
  alt={product.title}
  width={300}
  height={300}
  className="aspect-square object-contain w-full transition-transform duration-500"
                />
            </div>


                <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-1">
                    {product.category.name}
                </p>
        <div className="h-12 overflow-hidden mb-2">
            <h3 className="text-sm font-bold text-gray-800 hover:text-emerald-600 transition-colors line-clamp-2">
                {product.title}
            </h3>
        </div>
        <div className="flex items-center gap-1 text-yellow-400 mb-4">
            <div className="flex">
                {[...Array(5)].map((_, i) =>
                    i < Math.round(product.ratingsAverage) 
                        ? <FaStar key={i} className="text-xs" /> 
                        : <CiStar key={i} className="text-xs" />
                )}
            </div>
            <span className="text-[10px] text-gray-400 font-medium ml-1">
                {product.ratingsAverage.toFixed(1)}
            </span>
        </div>
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-50">
            <div className="flex flex-col">
                {hasDiscount ? (
                    <>
                        <span className="text-emerald-600 font-extrabold text-base">
                            {product.priceAfterDiscount} <span className="text-[10px]">EGP</span>
                        </span>
                        <span className="text-gray-400 text-xs line-through opacity-70">
                            {product.price} EGP
                        </span>
                    </>
                ) : (
                    <span className="text-gray-800 font-extrabold text-base">
                        {product.price} <span className="text-[10px]">EGP</span>
                    </span>
                )}
            </div>
        </div>
    </Link>
    <div className="scale-90 origin-right">
        <AddtoCardBtn productId={product._id || (product as any).id} />
    </div>

        </div>
    );
}