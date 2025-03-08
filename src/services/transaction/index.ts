"use server";

import { cookies } from "next/headers";

export const getPaurchaseHistory = async (userId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/transactions/purchases/${userId}`,
      {
        next: {
          tags: ["transactions"],
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
