"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { FcGoogle } from "react-icons/fc"
import { FaFacebook, FaEye, FaEyeSlash } from "react-icons/fa"
import { signUp } from "../types/types"
import { useRouter } from "next/navigation"
import { toast } from "sonner"


const signUpSchema = z.object({
    name: z.string().min(1, "Name is required").min(3, "Name must be at least 3 characters"),
    email: z.string().min(1, "Email is required").email("Invalid email address"),
    password: z.string().min(1, "Password is required").min(8, "Must be at least 8 characters").regex(/[A-Za-z]/, "Must contain at least one letter").regex(/\d/, "Must contain at least one number").regex(/[@$!%*#?&]/, "Must contain at least one special character"),
    rePassword: z.string().min(1, "Please confirm your password"),
    phone: z.string().min(1, "Phone number is required").regex(/^\+?[0-9\s\-]{7,15}$/, "Invalid phone number"),
}).refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
})


export default function SignUp() {

    const router = useRouter()
    const form = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            phone: ""
        },
        resolver: zodResolver(signUpSchema)
    })


    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)


    async function handleSignUp(values: signUp) {
        const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signup", {
            body: JSON.stringify(values),
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (res.ok) {
            router.push("/login")
            toast.success("Account created successfully", {
                position: "top-center",
                richColors: true,
            })
        } else {
            toast.error("Something went wrong", {
                position: "top-center",
                richColors: true,
            })
        }
    }


    return (
        <div className="w-full max-w-md">
            
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800">Create Your Account</h2>
                <p className="text-gray-500 text-sm mt-1 uppercase">Start your fresh journey with us today</p>
            </div>


            <div className="flex gap-4 mb-6">
                <button
                    type="button"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white cursor-pointer transition-all duration-300 hover:border-emerald-500 hover:shadow-md hover:shadow-emerald-100"
                >
                    <FcGoogle className="text-lg" />
                    Google
                </button>
                
                <button
                    type="button"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white cursor-pointer transition-all duration-300 hover:border-blue-500 hover:shadow-md hover:shadow-blue-100"
                >
                    <FaFacebook className="text-lg text-blue-600" />
                    Facebook
                </button>
            </div>


            <div className="flex items-center gap-3 mb-6">
                <div className="flex-1 h-px bg-gray-200"></div>
                <span className="text-xs text-gray-400">or</span>
                <div className="flex-1 h-px bg-gray-200"></div>
            </div>


            <form onSubmit={form.handleSubmit(handleSignUp)} className="space-y-4">
                
                <Controller
                    name="name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <div className="flex flex-col gap-1">
                            <label htmlFor="name" className="text-sm font-md text-gray-700">Name<span className="text-red-500">*</span></label>
                            <input
                                {...field}
                                id="name"
                                type="text"
                                placeholder="enter your name"
                                className={`w-full px-3 py-2 border rounded-lg text-sm outline-none transition-all duration-200 ${fieldState.invalid ? "border-red-400 focus:ring-2 focus:ring-red-200" : "border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"}`}
                            />
                            {fieldState.error && <p className="text-xs text-red-500">{fieldState.error.message}</p>}
                        </div>
                    )}
                />


                <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <div className="flex flex-col gap-1">
                            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email<span className="text-red-500">*</span></label>
                            <input
                                {...field}
                                id="email"
                                type="email"
                                placeholder="anything@example.com"
                                className={`w-full px-3 py-2 border rounded-lg text-sm outline-none transition-all duration-200 ${fieldState.invalid ? "border-red-400 focus:ring-2 focus:ring-red-200" : "border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"}`}
                            />
                            {fieldState.error && <p className="text-xs text-red-500">{fieldState.error.message}</p>}
                        </div>
                    )}
                />


                <Controller
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <div className="flex flex-col gap-1">
                            <label htmlFor="password" className="text-sm font-medium text-gray-700">Password<span className="text-red-500">*</span></label>
                            <div className="relative">
                                <input
                                    {...field}
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="create a strong password"
                                    className={`w-full px-3 py-2 border rounded-lg text-sm outline-none transition-all duration-200 pr-10 ${fieldState.invalid ? "border-red-400 focus:ring-2 focus:ring-red-200" : "border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"}`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            {fieldState.error && <p className="text-xs text-red-500">{fieldState.error.message}</p>}
                        </div>
                    )}
                />


                <Controller
                    name="rePassword"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <div className="flex flex-col gap-1">
                            <label htmlFor="rePassword" className="text-sm font-medium text-gray-700">Confirm Password<span className="text-red-500">*</span></label>
                            <div className="relative">
                                <input
                                    {...field}
                                    id="rePassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="confirm your password"
                                    className={`w-full px-3 py-2 border rounded-lg text-sm outline-none transition-all duration-200 pr-10 ${fieldState.invalid ? "border-red-400 focus:ring-2 focus:ring-red-200" : "border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"}`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                                >
                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            {fieldState.error && <p className="text-xs text-red-500">{fieldState.error.message}</p>}
                        </div>
                    )}
                />


                <Controller
                    name="phone"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <div className="flex flex-col gap-1">
                            <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone<span className="text-red-500">*</span></label>
                            <input
                                {...field}
                                id="phone"
                                type="tel"
                                placeholder="egyption number"
                                className={`w-full px-3 py-2 border rounded-lg text-sm outline-none transition-all duration-200 ${fieldState.invalid ? "border-red-400 focus:ring-2 focus:ring-red-200" : "border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"}`}
                            />
                            {fieldState.error && <p className="text-xs text-red-500">{fieldState.error.message}</p>}
                        </div>
                    )}
                />


                <button
                    type="submit"
                    className="w-full py-3 mt-2 bg-emerald-600 text-white font-semibold rounded-lg text-sm cursor-pointer transition-all duration-300 hover:bg-emerald-700 active:scale-[0.98] flex items-center justify-center gap-2"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    Create My Account
                </button>

            </form>


            <p className="text-center text-xs text-gray-500 mt-6 pb-2">
                Already have an account?{" "}
                <Link href="/login" className="text-emerald-600 font-medium hover:text-emerald-700 hover:underline">
                    Sign In
                </Link>
            </p>

        </div>
    )
}