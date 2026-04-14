"use client"


import slider from "../../app/assets/images/Slider.png"
import * as React from "react"
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Image from "next/image"
import { FaBars, FaHeadset, FaSearch, FaShoppingCart, FaTimes, FaUser } from "react-icons/fa"
import { CiHeart } from "react-icons/ci"
import { useSession, signOut } from "next-auth/react"
import { useCart } from "../_providers/CartContext"
import { useState } from "react"


const components: { title: string; href: string; description: string }[] = []


function logout() {
    signOut({ redirect: true, callbackUrl: "/login" })
}


function ListItem({
    title,
    children,
    href,
    ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {

    return (
        <li {...props}>
            <NavigationMenuLink asChild>
                <Link href={href}>
                    <div className="flex flex-col gap-1 text-sm">
                        <div className="leading-none font-medium">{title}</div>
                        <div className="line-clamp-2 text-muted-foreground">{children}</div>
                    </div>
                </Link>
            </NavigationMenuLink>
        </li>
    )
} 


export function Navbar() {

    const session = useSession()
    const { numOfCartItems } = useCart()
    const [isMenuOpen, setIsMenuOpen] = useState(false)


    return (
        <>
            <div className="w-11/12 mx-auto py-4">
                <div className="flex justify-between items-center bg-transparent">
                    
                    <div className="flex items-center gap-8 lg:gap-10">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="text-emerald-600 text-3xl font-bold flex items-center gap-1 shrink-0">
                                <FaShoppingCart className="text-2xl" />
                                <span>FreshCart</span>
                            </div>
                        </Link>

                        <div className="hidden lg:flex items-center bg-gray-50 border border-gray-100 rounded-xl overflow-hidden p-1 shadow-sm w-[420px] transition-all focus-within:ring-1 focus-within:ring-emerald-500">
                            <input 
                                type="search" 
                                placeholder="Search for products, brands and more.." 
                                className="w-full bg-transparent outline-none px-4 py-2 text-sm text-gray-500 placeholder:text-gray-400" 
                            />
                            <button className="bg-emerald-600 text-white p-2 rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer shadow-sm">
                                <FaSearch className="text-sm" />
                            </button>
                        </div>

                        <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-gray-600">
                            <Link href="/" className="hover:text-emerald-600 transition-colors border-b-2 border-transparent hover:border-emerald-600 py-1">Home</Link>
                            <Link href="/allproducts" className="hover:text-emerald-600 transition-colors border-b-2 border-transparent hover:border-emerald-600 py-1">Shop</Link>
                            <Link href="/category" className="hover:text-emerald-600 transition-colors flex items-center gap-1 border-b-2 border-transparent hover:border-emerald-600 py-1">
                                Categories <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </Link>
                            <Link href="/brands" className="hover:text-emerald-600 transition-colors border-b-2 border-transparent hover:border-emerald-600 py-1">Brands</Link>
                        </div>
                    </div>


                    <div className="flex items-center gap-4">
                        <div className="hidden lg:flex items-center gap-2 border-r border-gray-200 pr-4">
                            <div className="p-2 bg-emerald-50 rounded-full">
                                <FaHeadset className="text-emerald-600 text-lg" />
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-400 leading-none">Support</p>
                                <p className="text-xs font-bold text-gray-700">24/7 Help</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 text-xl">
                            <Link href="/wishlist" className="text-gray-600 hover:text-emerald-600 transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                            </Link>

                            <Link href="/cart" className="relative group text-gray-600 hover:text-emerald-600 transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold shadow-sm">
                                    {numOfCartItems}
                                </span>
                            </Link>
                        </div>


                        <button
                            onClick={() => setIsMenuOpen(true)}
                            className="md:hidden p-2 text-gray-700 hover:text-emerald-600 transition-all active:scale-95 cursor-pointer"
                        >
                            <FaBars className="text-2xl" />
                        </button>


                        <div className="hidden md:flex items-center ml-2">
                            {session.data ? (
                                <button
                                    onClick={() => logout()}
                                    className="bg-black text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-gray-800 transition-all active:scale-95 cursor-pointer shadow-md"
                                >
                                    Log Out
                                </button>
                            ) : (
                                <Link href="/login" className="bg-emerald-600 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-emerald-700 transition-all active:scale-95 shadow-md flex items-center gap-2">
                                    <FaUser className="text-xs" />
                                    Sign In
                                </Link>
                            )}
                        </div>
                    </div>
                </div>


                <div
                    className={`fixed inset-0 bg-black/50 z-50 ${isMenuOpen ? "block" : "hidden"}`}
                    onClick={() => setIsMenuOpen(false)}
                >
                    <div
                        className={`fixed right-0 top-0 h-full w-[300px] bg-white shadow-2xl transition-transform duration-300 ease-in-out p-6 flex flex-col ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-8">
                            <div className="text-emerald-600 text-2xl font-bold flex items-center gap-1">
                                <FaShoppingCart />
                                <span>FreshCart</span>
                            </div>
                            <button
                                onClick={() => setIsMenuOpen(false)}
                                className="bg-gray-100 p-2 rounded-full text-gray-500 hover:bg-gray-200 transition-colors cursor-pointer"
                            >
                                <FaTimes className="text-xl" />
                            </button>
                        </div>


                        <div className="relative mb-8 flex items-center bg-gray-50 border border-gray-200 rounded-xl overflow-hidden p-1.5 shadow-sm">
                            <input
                                type="search"
                                placeholder="Search products..."
                                className="w-full bg-transparent outline-none px-4 py-2.5 text-base text-gray-700"
                            />
                            <button className="bg-emerald-500 text-white p-2.5 rounded-lg hover:bg-emerald-600 transition-colors cursor-pointer">
                                <FaSearch className="text-base" />
                            </button>
                        </div>


                        <div className="flex flex-col gap-5 text-lg font-medium text-gray-600 mb-8 border-b border-gray-100 pb-8">
                            <Link href="/" onClick={() => setIsMenuOpen(false)} className="hover:text-emerald-600">Home</Link>
                            <Link href="/allproducts" onClick={() => setIsMenuOpen(false)} className="hover:text-emerald-600">Shop</Link>
                            <Link href="/category" onClick={() => setIsMenuOpen(false)} className="hover:text-emerald-600">Categories</Link>
                            <Link href="/brands" onClick={() => setIsMenuOpen(false)} className="hover:text-emerald-600">Brands</Link>
                        </div>


                        <div className="flex flex-col gap-6 mb-8 border-b border-gray-100 pb-8">
                            <Link href="/wishlist" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 text-gray-600 font-medium group">
                                <div className="p-2 bg-rose-50 rounded-full group-hover:bg-rose-100 transition-colors">
                                    <CiHeart className="text-rose-500 text-xl" />
                                </div>
                                <span>Wishlist</span>
                            </Link>

                            <Link href="/cart" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 text-gray-600 font-medium group relative">
                                <div className="p-2 bg-emerald-50 rounded-full group-hover:bg-emerald-100 transition-colors">
                                    <FaShoppingCart className="text-emerald-600 text-xl" />
                                </div>
                                <span>Cart</span>
                                <span className="bg-emerald-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full ml-auto">
                                    {numOfCartItems}
                                </span>
                            </Link>
                        </div>


                        <div className="grid grid-cols-2 gap-3 mb-8">
                            {session.data ? (
                                <button
                                    onClick={() => logout()}
                                    className="col-span-2 bg-black text-white px-5 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
                                >
                                    Log Out
                                </button>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="bg-emerald-500 text-white py-3 rounded-xl font-bold flex items-center justify-center hover:bg-emerald-600 transition-colors"
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        href="/signUp"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="border-2 border-emerald-500 text-emerald-500 py-3 rounded-xl font-bold flex items-center justify-center hover:bg-emerald-50 transition-colors"
                                    >
                                        Sign Up
                                    </Link>
                                </>
                            )}
                        </div>


                        <div className="mt-auto bg-gray-50 rounded-2xl p-4 flex items-center gap-3 shadow-sm border border-gray-100">
                            <div className="p-3 bg-emerald-100 rounded-full">
                                <FaHeadset className="text-emerald-600 text-xl" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 font-medium">Need Help?</p>
                                <Link href="/support" onClick={() => setIsMenuOpen(false)} className="text-sm font-bold text-gray-700 hover:text-emerald-600 transition-colors">
                                    Contact Support
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
