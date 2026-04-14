"use client";

import { useState } from "react"
import { FaPlus } from "react-icons/fa"
import { toast } from "sonner"
import { addProductToCart } from "../_actions/cart.actions"
import { useCart } from "../_providers/CartContext"
import { Circles } from "react-loader-spinner"

export default function AddtoCardBtn({ productId }: { productId: string }) {
  const { refreshCart } = useCart();
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      const response = await addProductToCart(productId);
      console.log("Add to Cart Response:", response);
      if (response.status === "success") {
        await refreshCart();
        toast.success(response.message || "Product added to cart!", {
          position: "top-center",
        });
      } else {
        toast.error(response.message || "Failed to add to cart", {
          position: "top-center",
        });
      }
    } catch (error) {
       console.error("Failed to add to cart:", error);
       toast.error("Network error! Try again later.", {
         position: "top-center",
       });
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      disabled={loading}
      onClick={(e) => {
        e.preventDefault(); 
        e.stopPropagation(); 
        handleAddToCart();
      }} 
      className={`absolute border rounded-full bottom-4 cursor-pointer shadow-2xl p-3 right-4 flex items-center justify-center transition-all duration-300 ${loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"}`}
    >
      {loading ? (
        <Circles
          height="18"
          width="18"
          color="#ffffff"
          ariaLabel="circles-loading"
          visible={true}
        />
      ) : (
        <FaPlus className='font-light text-white'/> 
      )}
    </button>
  );
}
