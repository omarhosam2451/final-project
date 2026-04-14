"use server";

import { getMyToken } from "@/utils/getMyToken";

export async function getLoggedUserCart() {
  const token = await getMyToken();

  if (!token) {
    return { status: "error", message: "User not authenticated" };
  }

  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v2/cart", {
      method: "GET",
      headers: {
        "token": token as string,
      },
    });

    const finalRes = await res.json();
    return finalRes;
  } catch (error) {
    console.error("Failed to fetch user cart:", error);
    return { status: "error", message: "Network error" };
  }
}
