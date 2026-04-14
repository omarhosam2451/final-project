import Link from 'next/link'
import React from 'react'
import { FaBoxOpen } from 'react-icons/fa'
import { productData } from '@/app/page'
import ProductCard from '@/app/_components/ProductCard'

// Re-use the fetch from allproducts or just fetch it here
async function getAllProducts(): Promise<productData[]> {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/products", {
        cache: 'force-cache'
    })
    const finalRes = await res.json()
    return finalRes.data
}

interface PageProps {
    params: Promise<{ slug: string }>
}

export default async function CategoryProductsPage({ params }: PageProps) {
    const { slug } = await params
    
    const allProducts = await getAllProducts()
    const products = allProducts.filter((product: any) => product.category?.slug === slug)
    
    // Get the category name to display in the header
    const categoryName = products.length > 0 ? products[0].category.name : slug.replace(/-/g, ' ')

    return (
        <div className="w-11/12 mx-auto py-6">

            <nav className="text-sm text-gray-500 mb-6">
                <Link href="/" className="hover:text-emerald-600 transition-colors">Home</Link>
                <span className="mx-2">/</span>
                <Link href="/category" className="hover:text-emerald-600 transition-colors">Categories</Link>
                <span className="mx-2">/</span>
                <span className="text-emerald-600 font-bold capitalize">{categoryName}</span>
            </nav>


            <div className="bg-emerald-600 rounded-3xl p-8 mb-12 shadow-lg shadow-emerald-600/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full translate-x-20 -translate-y-20"></div>

                <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
                        <FaBoxOpen className="text-3xl text-white outline-none" />
                    </div>

                    <div className="text-center md:text-left">
                        <h1 className="text-3xl font-extrabold text-white mb-2 capitalize">{categoryName}</h1>
                        <p className="text-emerald-50 max-w-xl opacity-90">Discover our full range of {categoryName} products, curated just for you.</p>
                    </div>
                </div>
            </div>

            {products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                    {products.map((product: any) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <p className="text-gray-500 text-xl">No products found in this category.</p>
                </div>
            )}

        </div>
    )
}
