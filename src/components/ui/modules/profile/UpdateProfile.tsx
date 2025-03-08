"use client";

import { useState } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { updateUserDetails } from "@/services/authService";
import { useRouter } from "next/navigation";

interface FormData {
  _id: string;
  name: string;
  email: string;
  phoneNo: string;
  password?: string;
}

const UpdateProfileSection = ({ profileData }: { profileData: FormData }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: profileData?.name || "",
      email: profileData?.email || "",
      phoneNo: profileData?.phoneNo || "",
      password: "", 
    },
  });

  const [newPassword, setNewPassword] = useState("");
  const router = useRouter();

  // Form Submission
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      if (newPassword) {
        data.password = newPassword;
      }

      const res = await updateUserDetails(profileData._id, data);
      console.log(res);
      if (res.success) {
        toast.success(res.message);
        router.push("/dashboard/profile");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <Card className="w-full max-w-lg bg-white shadow-lg rounded-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Update Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div>
              <Label>Name</Label>
              <Input
                {...register("name", { required: "Name is required" })}
                type="text"
                className="w-full mt-1 border rounded-md p-2"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <Label>Email</Label>
              <Input
                {...register("email", {
                  required: "Email is required",
                })}
                type="email"
                className="w-full mt-1 border rounded-md p-2"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <Label>Phone Number</Label>
              <Input
                {...register("phoneNo", {
                  required: "Phone number is required",
                })}
                type="tel"
                className="w-full mt-1 border rounded-md p-2"
              />
              {errors.phoneNo && (
                <p className="text-red-500 text-sm">{errors.phoneNo.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <Label>New Password</Label>
              <Input
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setValue("password", e.target.value); 
                }}
                type="password"
                placeholder="Enter new password (optional)"
                className="w-full mt-1 border rounded-md p-2"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end mt-6">
              <Button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Update Profile
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateProfileSection;
