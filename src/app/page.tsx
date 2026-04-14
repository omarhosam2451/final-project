import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'
import { getAllCategories } from './services/Categories'
import JoinCard from './_components/JoinCard'
import Cards from './_components/Cards'
import Slider from './_components/Slider'
import ProductCard from './_components/ProductCard'
import sliderPic from "./assets/images/sliderImage.png"


export interface productData {
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


export interface brand {
    _id: string
    id: string
    name: string
    slug: string
    image: string
}


export interface category {
    _id: string
    id: string
    name: string
    slug: string
    image: string
}


export async function getAllProducts(): Promise<productData[]> {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/products", {
        cache: 'force-cache'
    })
    const finalRes = await res.json()

    return finalRes.data
}


export default async function Home() {

    const products = await getAllProducts()
    const categories = await getAllCategories()
    const imageArr = [sliderPic.src, sliderPic.src, sliderPic.src]


    return (
        <>
            <Slider listOfImages={imageArr} />

            <div className="w-11/12 mx-auto py-20">
                <div className="flex justify-between items-center mb-10">
                    <div className="text-4xl font-semibold">
                        shop by <span className='text-emerald-600'>category</span>
                    </div>
                    <div>
                        <Link href="/category" className='text-emerald-500 font-semibold text-xl hover:text-emerald-600 transition-colors'>
                            view all categories <FaArrowRight className='inline-block ml-2'/>
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                    {categories.map((item: any) => (
                        <Link href={`/category/${item.slug}`} key={item._id}>
                            <div className="border border-gray-100 rounded-3xl p-6 flex flex-col items-center text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 bg-white group mt-4">
                                <div className="w-24 h-24 rounded-full border border-gray-50 overflow-hidden group-hover:border-emerald-100 transition-colors">
                                    <Image src={item.image} alt={item.name} width={96} height={96} className="w-full h-full object-cover" />
                                </div>
                                <h3 className="mt-4 text-lg font-bold text-gray-800 group-hover:text-emerald-600 transition-colors">
                                    {item.name}
                                </h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="w-10/12 mx-auto mb-20">
                <Cards />
            </div>

            <div className="w-11/12 mx-auto py-10">
                <div className="text-4xl font-semibold mb-10">
                    Featured <span className='text-emerald-600'>products</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
                    {products.map((product: any) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            </div>

            <JoinCard />
        </>
    )
}