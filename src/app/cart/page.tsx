"use client";

import Image from "next/image";
import Link from "next/link";
import { FaPlus, FaMinus, FaTrash, FaArrowLeft } from "react-icons/fa";
import { useCart } from "../_providers/CartContext";
import { updateCartProductQuantity, removeProductFromCart, clearCart } from "../_actions/cart.actions";
import { toast } from "sonner";
import { useState } from "react";


export default function Cart() {


    const { cartItems, numOfCartItems, totalCartPrice, loading, refreshCart } = useCart();
    const [updatingId, setUpdatingId] = useState<string | null>(null);


    async function handleUpdateQuantity(productId: string, newCount: number) {
        setUpdatingId(productId);
        try {
            const res = await updateCartProductQuantity(productId, newCount);
            if (res.status === "success") {
                await refreshCart();
            } else {
                toast.error(res.message || "Failed to update quantity", { position: "top-center" });
            }
        } catch {
            toast.error("Network error", { position: "top-center" });
        } finally {
            setUpdatingId(null);
        }
    }


    async function handleRemoveProduct(productId: string) {
        setUpdatingId(productId);
        try {
            const res = await removeProductFromCart(productId);
            if (res.status === "success") {
                await refreshCart();
                toast.success("Product removed from cart", { position: "top-center" });
            } else {
                toast.error(res.message || "Failed to remove product", { position: "top-center" });
            }
        } catch {
            toast.error("Network error", { position: "top-center" });
        } finally {
            setUpdatingId(null);
        }
    }




    async function handleClearCart() {
        try {
            const res = await clearCart();
            if (res.status === "success" || res.message === "success") {
                await refreshCart();
                toast.success("Cart cleared", { position: "top-center" });
            } else {
                toast.error(res.message || "Failed to clear cart", { position: "top-center" });
            }
        } catch {
            toast.error("Network error", { position: "top-center" });
        }
    }
    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }


    if (cartItems.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
                <FaTrash className="text-6xl text-gray-300" />
                <h2 className="text-2xl font-bold text-gray-700">Your cart is empty</h2>
                <p className="text-gray-500">Looks like you have not added any items yet.</p>
                <Link
                    href="/"
                    className="mt-4 bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
                >
                    Start Shopping
                </Link>
            </div>
        );
    }


    return (
        <div className="w-11/12 mx-auto py-10">
            <h1 className="text-3xl font-bold mb-8">
                <span className="text-emerald-600">Shopping</span> Cart
            </h1>


            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                <div className="lg:col-span-2 space-y-4">
                    {cartItems.map((item: any) => (
                        <div
                            key={item.product._id || item._id}
                            className={`flex items-center gap-4 border border-gray-200 rounded-xl p-4 transition-opacity ${updatingId === item.product._id ? "opacity-50 pointer-events-none" : ""}`}
                        >
                            <div className="w-20 h-20 rounded-lg overflow-hidden border border-gray-100 shrink-0">
                                <Image
                                    src={item.product.imageCover}
                                    alt={item.product.title}
                                    width={80}
                                    height={80}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-gray-800 truncate">{item.product.title}</h3>
                                <p className="text-sm text-gray-400">{item.product.brand?.name}</p>
                                <p className="text-sm text-gray-400">{item.product.category?.name}</p>

                                <div className="flex items-center gap-2 mt-2">
                                    <button
                                        onClick={() => handleUpdateQuantity(item.product._id, item.count - 1)}
                                        className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100 cursor-pointer transition-colors"
                                    >
                                        <FaMinus className="text-xs" />
                                    </button>
                                    <span className="w-8 text-center font-semibold">{item.count}</span>
                                    <button
                                        onClick={() => handleUpdateQuantity(item.product._id, item.count + 1)}
                                        className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100 cursor-pointer transition-colors"
                                    >
                                        <FaPlus className="text-xs" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-col items-end gap-2">
                                <span className="text-emerald-600 font-bold text-lg">${item.price}</span>
                                <button
                                    onClick={() => handleRemoveProduct(item.product._id)}
                                    className="flex items-center gap-1 text-red-500 text-sm hover:text-red-700 cursor-pointer transition-colors"
                                >
                                    <FaTrash className="text-xs" />
                                    <span>Remove</span>
                                </button>
                            </div>
                    </div>
                    ))}


                    <div className="flex items-center justify-between pt-4">
                        <Link
                            href="/"
                            className="flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors"
                        >
                            <FaArrowLeft className="text-sm" />
                            Continue Shopping
                        </Link>
                        <button
                            onClick={handleClearCart}
                            className="flex items-center gap-2 border border-red-400 text-red-500 px-4 py-2 rounded-lg font-semibold hover:bg-red-50 cursor-pointer transition-colors"
                        >
                            <FaTrash className="text-sm" />
                            Clear Cart
                        </button>
                    </div>
                </div>


                <div className="lg:col-span-1">
                    <div className="border border-gray-200 rounded-xl p-6 sticky top-24">
                        <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>

                        <div className="flex justify-between items-center py-3 border-b border-gray-100">
    <span className="text-gray-500 text-sm">Total Items</span>
    <span className="font-semibold">{numOfCartItems}</span>
</div>
<div className="flex justify-between items-center py-3 mt-2">
               <span className="font-bold text-gray-800">Total Price</span>
               <span className="font-bold text-emerald-600 text-lg">$ {totalCartPrice}</span>
           </div>
           <Link href="/checkout" className="w-full mt-6 bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 cursor-pointer transition-colors block text-center shadow-lg shadow-emerald-700/20">
               Checkout
           </Link>
           <p className="text-center text-xs text-gray-400 mt-4 font-medium">
               Taxes and shipping calculated at checkout
           </p>
       </div>
   </div>

            </div>
        </div>
    );
}