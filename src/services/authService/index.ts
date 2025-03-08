"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const registerUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const loginUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const result = await res.json();
    // console.log(result);
    if (result.success) {
      (await cookies()).set("token", result.data.token);
    }

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getCurrentUser = async () => {
  const token = (await cookies()).get("token");
  let decondedToken = null;

  if (token) {
    decondedToken = await jwtDecode(token.value);
    return decondedToken;
  } else {
    return null;
  }
};

export const getUserDetails = async (userId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/users/${userId}`,
      {
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

export const updateUserDetails = async (
  userId: string,
  userData: FieldValues
) => {
  try {
    console.log(userData, "id -> ", userId);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/users/${userId}`,
      {
        method: "PUT",
        headers: {
          Authorization: (await cookies()).get("token")!.value,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const logoutUser = async () => {
  (await cookies()).delete("token");
};
