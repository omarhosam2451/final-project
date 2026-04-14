"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "../_providers/CartContext";
import { createCashOrder, createOnlineOrder } from "../_actions/order.actions";
import { toast } from "sonner";
import { FaArrowLeft, FaBox, FaCreditCard, FaLock, FaMoneyBillWave, FaShieldAlt, FaShippingFast, FaTruck, FaUndoAlt } from "react-icons/fa";


const checkoutSchema = z.object({
    city: z.string().min(2, "City is required"),
    details: z.string().min(5, "Street address is required"),
    postalCode: z.string().min(3, "Postal code is required"),
    phone: z.string().min(5, "Valid phone number is required"),
});


type CheckoutFormData = z.infer<typeof checkoutSchema>;


export default function CheckoutPage() {

    const { cartItems, numOfCartItems, totalCartPrice, cartId, loading, refreshCart } = useCart();
    const [paymentMethod, setPaymentMethod] = useState<"cash" | "online">("cash");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CheckoutFormData>({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            city: "",
            details: "",
            postalCode: "",
            phone: "",
        },
    });


    async function onSubmit(data: CheckoutFormData) {
        if (!cartId) {
            toast.error("Cart not found. Please add items first.", { position: "top-center" });
            return;
        }

        setIsSubmitting(true);

        try {
            if (paymentMethod === "cash") {
                const res = await createCashOrder(cartId, {
                    details: data.details,
                    phone: data.phone,
                    city: data.city,
                    postalCode: data.postalCode,
                });

                if (res.status === "success") {
                    toast.success("Order placed successfully! 🎉", { position: "top-center" });
                    setOrderSuccess(true);
                    await refreshCart();
                } else {
                    toast.error(res.message || "Failed to place order", { position: "top-center" });
                }
            } else {
                const res = await createOnlineOrder(cartId, {
                    details: data.details,
                    phone: data.phone,
                    city: data.city,
                    postalCode: data.postalCode,
                });

                if (res.status === "success" && res.session?.url) {
                    toast.success("Redirecting to secure payment...", { position: "top-center" });
                    window.location.href = res.session.url;
                } else {
                    toast.error(res.message || "Failed to initialize payment session", { position: "top-center" });
                }
            }
        } catch {
            toast.error("Network error. Please try again.", { position: "top-center" });
        } finally {
            setIsSubmitting(false);
        }
    }


    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }


    if (orderSuccess) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-5">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center">
                    <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-800">Order Placed!</h2>
                <p className="text-gray-500 text-lg">Your order has been placed successfully.</p>
                <Link
                    href="/"
                    className="mt-4 bg-emerald-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-colors"
                >
                    Continue Shopping
                </Link>
            </div>
        );
    }


    if (cartItems.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
                <FaBox className="text-6xl text-gray-300" />
                <h2 className="text-2xl font-bold text-gray-700">Your cart is empty</h2>
                <p className="text-gray-500">Add some items before checking out.</p>
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
        <div className="w-11/12 mx-auto py-8 pb-20">
            
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                <Link href="/" className="hover:text-emerald-600 transition-colors">Home</Link>
                <span>/</span>
                <Link href="/cart" className="hover:text-emerald-600 transition-colors">Cart</Link>
                <span>/</span>
                <span className="text-gray-800 font-medium">Checkout</span>
            </div>


            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                        <FaBox className="text-emerald-600 text-xl" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Complete Your Order</h1>
                        <p className="text-gray-500 text-sm">Review your items and complete your purchase</p>
                    </div>
                </div>
                <Link href="/cart" className="hidden md:flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors">
                    <FaArrowLeft className="text-sm" />
                    Back to Cart
                </Link>
            </div>


            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">

                        <div className="rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                            <div className="bg-emerald-600 px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <FaTruck className="text-white text-lg" />
                                    <div>
                                        <h2 className="text-white font-bold text-lg">Shipping Address</h2>
                                        <p className="text-emerald-100 text-sm">Where should we deliver your order?</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 space-y-6">
                                <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl p-4">
                                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                        <span className="text-white text-xs font-bold">i</span>
                                    </div>
                                    <div>
                                        <p className="text-blue-800 font-semibold text-sm">Delivery Information</p>
                                        <p className="text-blue-600 text-xs">Please ensure your address is accurate for smooth delivery</p>
                                    </div>
                                </div>


                                <div className="space-y-2">
                                    <Label htmlFor="city" className="text-gray-700 font-semibold text-sm">
                                        City <span className="text-red-500">*</span>
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="city"
                                            placeholder="e.g. Cairo, Alexandria, Giza"
                                            className="h-12 rounded-xl border-gray-200 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20"
                                            {...register("city")}
                                        />
                                    </div>
                                    {errors.city && (
                                        <p className="text-red-500 text-xs font-medium">{errors.city.message}</p>
                                    )}
                                </div>


                                <div className="space-y-2">
                                    <Label htmlFor="details" className="text-gray-700 font-semibold text-sm">
                                        Street Address <span className="text-red-500">*</span>
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="details"
                                            placeholder="Street name, building number, floor, apartment.."
                                            className="h-12 rounded-xl border-gray-200 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20"
                                            {...register("details")}
                                        />
                                    </div>
                                    {errors.details && (
                                        <p className="text-red-500 text-xs font-medium">{errors.details.message}</p>
                                    )}
                                </div>


                                <div className="space-y-2">
                                    <Label htmlFor="postalCode" className="text-gray-700 font-semibold text-sm">
                                        Postal Code <span className="text-red-500">*</span>
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="postalCode"
                                            placeholder="e.g. 12345"
                                            className="h-12 rounded-xl border-gray-200 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20"
                                            {...register("postalCode")}
                                        />
                                    </div>
                                    {errors.postalCode && (
                                        <p className="text-red-500 text-xs font-medium">{errors.postalCode.message}</p>
                                    )}
                                </div>


                                <div className="space-y-2">
                                    <Label htmlFor="phone" className="text-gray-700 font-semibold text-sm">
                                        Phone Number <span className="text-red-500">*</span>
                                    </Label>
                                    <div className="flex items-center gap-3">
                                        <div className="relative flex-1">
                                            <Input
                                                id="phone"
                                                placeholder="Your phone number"
                                                className="h-12 rounded-xl border-gray-200 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20"
                                                {...register("phone")}
                                            />
                                        </div>
                                    </div>
                                    {errors.phone && (
                                        <p className="text-red-500 text-xs font-medium">{errors.phone.message}</p>
                                    )}
                                </div>
                            </div>
                        </div>


                        <div className="rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                            <div className="bg-emerald-600 px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <FaCreditCard className="text-white text-lg" />
                                    <div>
                                        <h2 className="text-white font-bold text-lg">Payment Method</h2>
                                        <p className="text-emerald-100 text-sm">Choose how you&apos;d like to pay</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 space-y-4">
                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod("cash")}
                                    className={`w-full flex items-center gap-4 p-5 rounded-xl border-2 transition-all cursor-pointer ${
                                        paymentMethod === "cash"
                                            ? "border-emerald-500 bg-emerald-50/50"
                                            : "border-gray-100 hover:border-gray-200"
                                    }`}
                                >
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                                        paymentMethod === "cash" ? "bg-emerald-100" : "bg-gray-100"
                                    }`}>
                                        <FaMoneyBillWave className={`text-xl ${paymentMethod === "cash" ? "text-emerald-600" : "text-gray-400"}`} />
                                    </div>
                                    <div className="text-left flex-1">
                                        <p className="font-bold text-gray-800">Cash on Delivery</p>
                                        <p className="text-sm text-gray-500">Pay when your order arrives at your doorstep</p>
                                    </div>
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                                        paymentMethod === "cash" ? "border-emerald-500 bg-emerald-500" : "border-gray-300"
                                    }`}>
                                        {paymentMethod === "cash" && (
                                            <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                        )}
                                    </div>
                                </button>


                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod("online")}
                                    className={`w-full flex items-center gap-4 p-5 rounded-xl border-2 transition-all cursor-pointer ${
                                        paymentMethod === "online"
                                            ? "border-emerald-500 bg-emerald-50/50"
                                            : "border-gray-100 hover:border-gray-200"
                                    }`}
                                >
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                                        paymentMethod === "online" ? "bg-emerald-100" : "bg-gray-100"
                                    }`}>
                                        <FaCreditCard className={`text-xl ${paymentMethod === "online" ? "text-emerald-600" : "text-gray-400"}`} />
                                    </div>
                                    <div className="text-left flex-1">
                                        <p className="font-bold text-gray-800">Pay Online</p>
                                        <p className="text-sm text-gray-500">Secure payment with Credit/Debit Card via Stripe</p>
                                        <div className="flex gap-1 mt-1">
                                            <div className="w-8 h-5 bg-blue-600 rounded text-white text-[8px] flex items-center justify-center font-bold">VISA</div>
                                            <div className="w-8 h-5 bg-red-500 rounded text-white text-[8px] flex items-center justify-center font-bold">MC</div>
                                            <div className="w-8 h-5 bg-blue-800 rounded text-white text-[8px] flex items-center justify-center font-bold">AE</div>
                                        </div>
                                    </div>
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                                        paymentMethod === "online" ? "border-emerald-500 bg-emerald-500" : "border-gray-300"
                                    }`}>
                                        {paymentMethod === "online" && (
                                            <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                        )}
                                    </div>
                                </button>


                                <div className="flex items-center gap-3 bg-emerald-50 rounded-xl p-4 mt-2">
                                    <FaShieldAlt className="text-emerald-600 text-lg shrink-0" />
                                    <div>
                                        <p className="text-emerald-700 font-semibold text-sm">Secure & Encrypted</p>
                                        <p className="text-emerald-600 text-xs">Your payment info is protected with 256-bit SSL encryption</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="lg:col-span-1">
                        <div className="border border-gray-100 rounded-2xl overflow-hidden sticky top-24 shadow-sm bg-white">
                            
                            <div className="bg-emerald-600 px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <FaBox className="text-white text-lg" />
                                    <div>
                                        <h2 className="text-white font-bold text-lg">Order Summary</h2>
                                        <p className="text-emerald-100 text-sm">{numOfCartItems} Items</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1 mb-6">
                                    {cartItems.map((item: any) => (
                                        <div key={item.product?._id || item._id} className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-100 shrink-0 bg-gray-50">
                                                {item.product?.imageCover ? (
                                                    <Image
                                                        src={item.product.imageCover}
                                                        alt={item.product.title || "Product"}
                                                        width={48}
                                                        height={48}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                                        <FaBox className="text-gray-300" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-800 truncate">{item.product?.title || "Product"}</p>
                                                <p className="text-xs text-gray-400">{item.count} × {item.price} EGP</p>
                                            </div>
                                            <p className="text-sm font-bold text-gray-800 shrink-0">{item.count * item.price}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t border-gray-100 pt-4 space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-500 text-sm">Subtotal</span>
                                        <span className="font-semibold text-gray-800">{totalCartPrice} EGP</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-500 text-sm flex items-center gap-1">
                                            <FaShippingFast className="text-xs" /> Shipping
                                        </span>
                                        <span className="font-bold text-emerald-600">FREE</span>
                                    </div>
                                </div>

                                <div className="border-t border-gray-100 pt-4 mt-4">
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-gray-900 text-lg">Total</span>
                                        <span className="font-bold text-emerald-600 text-2xl">{totalCartPrice} <span className="text-sm text-gray-500">EGP</span></span>
                                    </div>
                                </div>


                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full mt-6 bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-700 cursor-pointer transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <FaLock className="text-sm" />
                                            Place Order
                                        </>
                                    )}
                                </button>


                                <div className="flex items-center justify-center gap-6 mt-5 text-xs text-gray-400">
                                    <div className="flex items-center gap-1">
                                        <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                                        Secure
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                        Fast Delivery
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                                        Easy Returns
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
