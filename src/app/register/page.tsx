"use client";

import { Button } from "@/components/ui/button";
import RSInput from "@/components/ui/core/coustomUI/RSInput";
import { registerUser } from "@/services/authService";
import Link from "next/link";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import {
  AiOutlineUser,
  AiOutlineMail,
  AiOutlineLock,
  AiOutlinePhone,
} from "react-icons/ai";
import { toast } from "sonner";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await registerUser(data);
      console.log("register response -> ", res);

      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }

      reset();
    } catch (error: any) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex min-h-screen items-center border justify-center p-4">
      <div className="w-full max-w-4xl flex flex-col md:flex-row rounded-lg overflow-hidden shadow-lg bg-white">
        {/* Left side - Login section */}
        <div className="relative w-full md:w-2/5 bg-emerald-500 text-white p-8 flex flex-col justify-center items-center">
          <h3 className="text-sm font-medium">Re-Store</h3>
          <h1 className="text-3xl md:text-4xl font-bold mt-4">Welcome Back!</h1>
          <p className="text-sm mt-2 text-center">
            To keep connected with us please login with your personal info
          </p>
          <Link href="/login">
            <button className="mt-4 w-32 rounded-full px-4 py-2 text-white border-2 border-white hover:bg-white hover:text-emerald-500 transition duration-300 ease-in-out">
              LOGIN
            </button>
          </Link>
        </div>

        {/* Right side - Signup section */}
        <div className="relative w-full md:w-3/5 bg-white p-8 flex flex-col justify-center items-center">
          <div className="max-w-md w-full">
            <h2 className="text-2xl md:text-3xl font-bold text-emerald-500 mb-6 text-center">
              Create Account
            </h2>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-4">
                {/* Name Field */}
                <div className="relative">
                  <AiOutlineUser className="absolute left-3 top-3 text-gray-500" />
                  <RSInput
                    type="text"
                    placeholder="Name"
                    {...register("name", { required: "Name is required" })}
                    className="pl-10 rounded-md border-gray-300"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name.message as string}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div className="relative">
                  <AiOutlineMail className="absolute left-3 top-3 text-gray-500" />
                  <RSInput
                    type="email"
                    placeholder="Email"
                    {...register("email", { required: "Email is required" })}
                    className="pl-10 rounded-md border-gray-300"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message as string}
                    </p>
                  )}
                </div>

                {/* Phone Field */}
                <div className="relative">
                  <AiOutlinePhone className="absolute left-3 top-3 text-gray-500" />
                  <RSInput
                    type="number"
                    placeholder="Phone Number"
                    {...register("phoneNo", {
                      required: "Phone number is required",
                    })}
                    className="pl-10 rounded-md border-gray-300"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.phone.message as string}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div className="relative">
                  <AiOutlineLock className="absolute left-3 top-3 text-gray-500" />
                  <RSInput
                    type="password"
                    placeholder="Password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                    className="pl-10 rounded-md border-gray-300"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password.message as string}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="flex justify-center mt-6">
                  <Button
                    type="submit"
                    className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full px-8"
                  >
                    Register
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
