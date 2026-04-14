"use client";

import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { toast } from "sonner";
import { addProductToCart } from "../_actions/cart.actions";
import { useCart } from "../_providers/CartContext";
import { Circles } from "react-loader-spinner";

export default function ProductDetailsAddToCartBtn({ productId }: { productId: string }) {
  const { refreshCart } = useCart();
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      const response = await addProductToCart(productId);
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
      onClick={handleAddToCart}
      className={`cursor-pointer flex-1 flex items-center justify-center gap-2 text-white font-semibold py-3 rounded-xl transition ${loading ? "bg-gray-400" : "bg-emerald-500 hover:bg-emerald-600"}`}
    >
      {loading ? (
        <Circles
          height="24"
          width="24"
          color="#ffffff"
          ariaLabel="circles-loading"
          visible={true}
        />
      ) : (
        <>
          <FaShoppingCart /> Add to Cart
        </>
      )}
    </button>
  );
}
