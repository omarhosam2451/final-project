import React from 'react'
import { getAllCategories } from '../services/Categories'
import Link from 'next/link'
import Image from 'next/image'
import { FaBoxOpen } from 'react-icons/fa'


export default async function page() {

    const categories = await getAllCategories()


    return (
        <>
            <div className="bg-[#1BB152] px-30 py-6 mx-auto">

                <p className='text-sm text-white'>
                    <Link href="/" className='opacity-45'>home</Link> / all categories
                </p>


                <div className="flex items-center justify-start my-5">
                    <div className="p-4 flex items-center justify-center rounded-xl me-3">
                        <FaBoxOpen className='text-4xl text-white' />
                    </div>

                    <div>
                        <p className='font-bold text-white text-3xl'>All categories</p>
                        <p className='text-white opacity-80'>Explore our complete product collection</p>
                    </div>
                </div>

            </div>


            <div className="w-10/12 mx-auto mt-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                    {categories.map((item: any) => (
                        <Link href={`/category/${item.slug}`} key={item._id}>
                            <div className="border border-gray-100 rounded-3xl p-6 flex flex-col items-center text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 bg-white group mt-4">
                                <div className="w-24 h-24 rounded-full border-2 border-emerald-50 overflow-hidden group-hover:border-emerald-100 transition-colors">
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
        </>
    )
}
