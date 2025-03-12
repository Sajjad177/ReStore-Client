"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { getUserDetails } from "@/services/authService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const ProfileSection = () => {
  const { user } = useUser();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.userId) return;
      try {
        setLoading(true);
        const data = await getUserDetails(user.userId);
        setUserData(data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user?.userId]);


  if (loading)
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-gray-500 text-lg">Loading user data...</p>
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center  p-6">
      <Card className="w-full max-w-lg shadow-xl bg-white rounded-lg">
        <CardHeader className="flex flex-col items-center justify-center py-6">
          <Image
            src={
              userData?.profilePicture || "https://avatar.iran.liara.run/public"
            }
            alt="Profile Picture"
            width={120}
            height={120}
            className="rounded-full border-4 border-gray-300"
          />
          <CardTitle className="text-3xl font-bold mt-3 flex gap-3 items-center">
            {userData?.name || "User Name"}
            <span className="text-gray-500 text-sm">({userData?.role})</span>
          </CardTitle>
          <p className="text-gray-500 text-xl">
            {userData?.email || "No Email Provided"}
          </p>
        </CardHeader>
        <CardContent className="px-6 py-4">
          <div className="text-center space-y-3">
            <p className="text-gray-600 text-lg">
              📞 {userData?.phoneNo || "No Phone Number Available"}
            </p>
            <Link href={`/profile/${user?.userId}`}>
              <Button className="w-full bg-emerald-500 text-white hover:bg-emerald-700 py-2 rounded-md cursor-pointer">
                Edit Profile
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSection;
