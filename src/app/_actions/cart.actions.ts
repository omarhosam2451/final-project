"use server";

import { getMyToken } from "@/utils/getMyToken";

export async function addProductToCart(id: string) {
  const token = await getMyToken();

  if (!token) {
    return { status: "error", message: "Please log in first!" };
  }

  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v2/cart", {
      method: "POST",
      body: JSON.stringify({ productId: id }),
      headers: {
        "Content-Type": "application/json",
        "token": token as string,
      },
    });

    const finalRes = await res.json();
    console.log("Cart Action Response:", finalRes);
    return finalRes;
  } catch (error) {
    console.error("Cart action fetch failed:", error);
    return { status: "error", message: "Network connection error" };
  }
}

export async function updateCartProductQuantity(productId: string, count: number) {
  const token = await getMyToken();

  if (!token) {
    return { status: "error", message: "Please log in first!" };
  }

  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${productId}`, {
      method: "PUT",
      body: JSON.stringify({ count }),
      headers: {
        "Content-Type": "application/json",
        "token": token as string,
      },
    });

    const finalRes = await res.json();
    return finalRes;
  } catch (error) {
    console.error("Update cart failed:", error);
    return { status: "error", message: "Network connection error" };
  }
}

export async function removeProductFromCart(productId: string) {
  const token = await getMyToken();

  if (!token) {
    return { status: "error", message: "Please log in first!" };
  }

  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${productId}`, {
      method: "DELETE",
      headers: {
        "token": token as string,
      },
    });

    const finalRes = await res.json();
    return finalRes;
  } catch (error) {
    console.error("Remove from cart failed:", error);
    return { status: "error", message: "Network connection error" };
  }
}

export async function clearCart() {
  const token = await getMyToken();

  if (!token) {
    return { status: "error", message: "Please log in first!" };
  }

  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v2/cart", {
      method: "DELETE",
      headers: {
        "token": token as string,
      },
    });

    const finalRes = await res.json();
    return finalRes;
  } catch (error) {
    console.error("Clear cart failed:", error);
    return { status: "error", message: "Network connection error" };
  }
}
