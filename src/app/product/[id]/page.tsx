import ProductSwipper from "@/app/_components/ProductSwipper";
import ProductDetailsAddToCartBtn from "@/app/_components/ProductDetailsAddToCartBtn";
import React from "react";
import { FaStar, FaStarHalfAlt, FaShoppingCart, FaBolt, FaShareAlt } from "react-icons/fa";
import { FiHeart, FiMinus, FiPlus } from "react-icons/fi";


interface PageProps {
  params: Promise<{ id: string }>
}

interface productData {
  title: string
  imageCover: string
  description: string
  price: number
  images: string[]
  ratingsAverage: number
  priceAfterDiscount: number
  brand: brand
  category: category
  _id: string
  id: string
}

interface brand {
  _id: string
  id: string
  name: string
  slug: string
  image: string
}

interface category {
  _id: string
  id: string
  name: string
  slug: string
  image: string
}

export default async function ProductPage({ params }: PageProps) {

  const { id } = await params

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  const data = await res.json()
  const product: productData = data.data

  return (
    <div className="w-11/12 mx-auto py-10">
      <div className="grid grid-cols-4 gap-12">

        <div className="col-span-1 flex flex-col gap-4">
          <ProductSwipper   
            imageCover={product.imageCover}
            images={product.images}
            title={product.title}
          />
        </div>

        <div className="col-span-3 flex flex-col gap-5">

          <div className="flex gap-2">
            <span className="text-sm text-emerald-600 border border-emerald-500 rounded-full px-3 py-1">
              {product.category.name}
            </span>
            <span className="text-sm text-gray-600 border border-gray-300 rounded-full px-3 py-1">
              {product.brand.name}
            </span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>

          <div className="flex items-center gap-2">
            <div className="flex text-yellow-400 text-lg">
              <FaStar /><FaStar /><FaStar /><FaStar /><FaStarHalfAlt />
            </div>
            <span className="text-gray-500 text-sm">{product.ratingsAverage} (reviews)</span>
          </div>

          <p className="text-3xl font-bold text-gray-900">{product.price} EGP</p>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
            <span className="text-emerald-600 text-sm font-medium">In Stock</span>
          </div>

          <hr className="border-gray-200" />

          <p className="text-gray-500 text-sm leading-relaxed">
            {product.description}
          </p>

          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Quantity</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden">
                <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition">
                  <FiMinus />
                </button>
                <span className="px-5 py-2 text-gray-800 font-medium border-x border-gray-300">1</span>
                <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition">
                  <FiPlus />
                </button>
              </div>
              <span className="text-sm text-gray-400">220 available</span>
            </div>
          </div>

          <div className="flex items-center justify-between bg-gray-50 rounded-xl px-5 py-3">
            <span className="text-gray-500 text-sm">Total Price:</span>
            <span className="text-emerald-600 font-bold text-lg">{product.price} EGP</span>
          </div>

          <div className="flex gap-3">
            <ProductDetailsAddToCartBtn productId={product._id || product.id || id} />
            <button className="cursor-pointer flex-1 flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 rounded-xl transition">
              <FaBolt /> Buy Now
            </button>
          </div>

          <div className="flex gap-3">
            <button className="cursor-pointer flex-1 flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50 text-gray-600 py-3 rounded-xl transition text-sm">
              <FiHeart /> Add to Wishlist
            </button>
            <button className="cursor-pointer flex items-center justify-center border border-gray-300 hover:bg-gray-50 text-gray-600 px-4 rounded-xl transition">
              <FaShareAlt />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}