"use client";

import { Button } from "@/components/ui/button";
import RSInput from "@/components/ui/core/coustomUI/RSInput";
import { loginUser } from "@/services/authService";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineLock, AiOutlineMail } from "react-icons/ai";
import { toast } from "sonner";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>();
  const router = useRouter();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await loginUser(data);

      if (res.success) {
        toast.success(res.message);
        router.push("/");
      } else {
        toast.error(res.message);
      }

      reset();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex min-h-screen items-center border justify-center p-4">
      <div className="w-full max-w-4xl flex flex-col md:flex-row rounded-lg overflow-hidden shadow-lg bg-white">
        {/* Left side - Signup section */}
        <div className="relative w-full md:w-3/5 bg-white p-8 flex flex-col justify-center items-center">
          <div className="max-w-md w-full">
            <h2 className="text-2xl md:text-3xl font-bold text-emerald-500 mb-6 text-center">
              Login Account
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-4">
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

                <div className="flex justify-center mt-6">
                  <Button className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full px-8">
                    LOGIN
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Left side - Login section */}
        <div className="relative w-full md:w-2/5 bg-emerald-500 text-white p-8 flex flex-col justify-center items-center">
          <h3 className="text-sm font-medium">Re-Store</h3>
          <h1 className="text-3xl md:text-4xl font-bold mt-4">Welcome Back!</h1>
          <p className="text-sm mt-2 text-center">{`DON'T HAVE AN ACCOUNT ?`}</p>
          <Link href="/register">
            <button className="mt-4 w-32 rounded-full px-4 py-2 text-white border-2 border-white hover:bg-white hover:text-emerald-500 transition duration-300 ease-in-out">
              REGISTER
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
