"use client"

import { useState } from "react"
import Link from "next/link"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { FcGoogle } from "react-icons/fc"
import { FaFacebook, FaEye, FaEyeSlash } from "react-icons/fa"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { signIn } from "next-auth/react"


const loginSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email address"),
    password: z.string().min(1, "Password is required").min(8, "Must be at least 8 characters"),
})


type LoginFormValues = z.infer<typeof loginSchema>


export default function LoginForm() {

    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false)


    const form = useForm<LoginFormValues>({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: zodResolver(loginSchema),
    })


    async function onSubmit(values: LoginFormValues) {
        const result = await signIn("credentials", {
            redirect: false,
            email: values.email,
            password: values.password,
        })

        if (result?.ok) {
            router.push("/")
            toast.success("Signed in successfully", {
                position: "top-center",
                richColors: true,
            })
        } else {
            toast.error(result?.error || "Something went wrong", {
                position: "top-center",
                richColors: true,
            })
        }
    }


    return (
        <div className="w-full max-w-md">
            
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800">Welcome Back!</h2>
                <p className="text-gray-500 text-sm mt-1 uppercase tracking-tighter">Sign in to continue your fresh shopping experience</p>
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


            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                
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
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="text-sm font-medium text-gray-700">Password<span className="text-red-500">*</span></label>
                                <Link href="/forgot-password" title="reset password" className="text-xs text-emerald-600 hover:text-emerald-700 font-medium hover:underline">Forgot?</Link>
                            </div>

                            <div className="relative">
                                <input
                                    {...field}
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="enter your password"
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


                <button
                    type="submit"
                    className="w-full py-3 mt-2 bg-emerald-600 text-white font-semibold rounded-lg text-sm cursor-pointer transition-all duration-300 hover:bg-emerald-700 active:scale-[0.98] flex items-center justify-center gap-2"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    Sign In
                </button>

            </form>


            <p className="text-center text-xs text-gray-500 mt-6 pb-2">
                New to FreshCart?{" "}
                <Link href="/signUp" className="text-emerald-600 font-medium hover:text-emerald-700 hover:underline">
                    Create an account
                </Link>
            </p>

        </div>
    )
}