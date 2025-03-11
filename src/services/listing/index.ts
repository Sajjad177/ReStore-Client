"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getAvailableListings = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/listings`, {
      next: {
        tags: ["listings"],
      },
      method: "GET",
      headers: {
        Authorization: (await cookies()).get("token")!.value,
      },
    });
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const getAllListings = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/listings/all`,
      {
        next: {
          tags: ["listings"],
        },
      }
    );
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const addListing = async (listingData: FormData): Promise<any> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/listings`, {
      method: "POST",
      body: listingData,
      headers: {
        Authorization: (await cookies()).get("token")!.value,
      },
    });
    revalidateTag("listings");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const deleteListing = async (listingId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/listings/${listingId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: (await cookies()).get("token")!.value,
        },
      }
    );
    revalidateTag("listings");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const updateListing = async (
  listingId: string,
  listingData: FormData
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/listings/${listingId}`,
      {
        method: "PUT",
        body: listingData,
        headers: {
          Authorization: (await cookies()).get("token")!.value,
        },
      }
    );
    revalidateTag("listings");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const getSingleListing = async (listingId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/listings/${listingId}`
    );
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error.message);
  }
};
