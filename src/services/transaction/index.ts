"use server";

import { revalidateTag } from "next/cache";
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

export const getSalersHistory = async (userId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/transactions/sales/${userId}`,
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

export const addTransaction = async (
  transactionData: FormData
): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/transactions`,
      {
        method: "POST",
        headers: {
          Authorization: (await cookies()).get("token")!.value,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transactionData),
      }
    );
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const paymentVerification = async (order_id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/transactions/verify?order_id=${order_id}`,
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

export const updateTransactionStatus = async (
  transactionId: string,
  status: string
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/transactions/${transactionId}`,
      {
        method: "PUT",
        headers: {
          Authorization: (await cookies()).get("token")!.value,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      }
    );
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const deleteTransaction = async (transactionId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/transactions/${transactionId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: (await cookies()).get("token")!.value,
        },
      }
    );
    revalidateTag("transactions");
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
