"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getWishList = async (userId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/wish/${userId}`,
      {
        next: {
          tags: ["wishlists"],
        },
        method: "GET",
        headers: {
          Authorization: (await cookies()).get("token")!.value,
        },
      }
    );
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const removeFromWishList = async (listingId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/wish/${listingId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: (await cookies()).get("token")!.value,
        },
      }
    );
    revalidateTag("wishlists");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const addToWishList = async (listingId: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/wish/add`, {
      method: "POST",
      headers: {
        Authorization: (await cookies()).get("token")!.value,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ listings: [listingId] }),
    });
    revalidateTag("wishlists");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
