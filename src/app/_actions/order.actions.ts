"use server";

import { getMyToken } from "@/utils/getMyToken";

interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
  postalCode: string;
}

export async function createCashOrder(cartId: string, shippingAddress: ShippingAddress) {
  const token = await getMyToken();

  if (!token) {
    return { status: "error", message: "Please log in first!" };
  }

  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v2/orders/${cartId}`, {
      method: "POST",
      body: JSON.stringify({ shippingAddress }),
      headers: {
        "Content-Type": "application/json",
        "token": token as string,
      },
    });

    const finalRes = await res.json();
    console.log("Order Response:", finalRes);
    return finalRes;
  } catch (error) {
    console.error("Order creation failed:", error);
    return { status: "error", message: "Network connection error" };
  }
}

export async function createOnlineOrder(cartId: string, shippingAddress: ShippingAddress) {
  const token = await getMyToken();

  if (!token) {
    return { status: "error", message: "Please log in first!" };
  }

  try {
    const baseUrl = "https://finalproject-delta-nine.vercel.app";
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${baseUrl}`, {
      method: "POST",
      body: JSON.stringify({ shippingAddress }),
      headers: {
        "Content-Type": "application/json",
        "token": token as string,
      },
    });

    const finalRes = await res.json();
    console.log("Online Order Response:", finalRes);
    return finalRes;
  } catch (error) {
    console.error("Online order creation failed:", error);
    return { status: "error", message: "Network connection error" };
  }
}
