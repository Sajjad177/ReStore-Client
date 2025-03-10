"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { addTransaction } from "@/services/transaction";
import { useUser } from "@/context/UserContext";
import { toast } from "sonner";

const ListingDetails = ({ listingData }: any) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const isSold = listingData.status.toLowerCase() === "sold";
  const { user } = useUser();

  // Handle form submission
  const onSubmit: SubmitHandler<any> = async (data) => {
    const toastId = toast.loading("Please wait...");
    try {
      const buyData = {
        itemID: listingData._id,
        sellerID: listingData.userID._id,
        buyerID: user?.userId,
        name: data.name,
        phone: data.phone,
        address: data.address,
        city: data.city,
        postalCode: data.postalCode,
      };
      const res = await addTransaction(buyData as any);
      if (res?.data?.checkout_url) {
        setTimeout(() => {
          window.location.replace(res?.data?.checkout_url);
        }, 1000);
      }
      toast.success(res.message, { id: toastId });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white shadow-lg rounded-lg p-6">
        {/* Left Side: Image */}
        <div className="relative">
          <Image
            src={listingData.image}
            alt={listingData.title}
            width={600}
            height={400}
            className="w-full h-auto rounded-lg shadow-md object-cover"
          />
        </div>

        {/* Right Side: Details */}
        <div className="space-y-5">
          <h2 className="text-3xl font-bold text-gray-800">
            {listingData.title}
          </h2>
          <p className="text-gray-600 text-lg">{listingData.description}</p>
          <p className="text-xl font-semibold text-gray-700">
            Price:{" "}
            <span className="text-green-600">Tk {listingData.price}</span>
          </p>

          <div className="flex flex-wrap gap-4">
            <p className="bg-gray-200 px-4 py-2 rounded-md">
              <span className="font-semibold">Condition:</span>{" "}
              {listingData.condition}
            </p>
            <p
              className={`px-4 py-2 rounded-md ${
                isSold ? "bg-red-200 text-red-600" : "bg-gray-200"
              }`}
            >
              <span className="font-semibold">Status:</span>{" "}
              {listingData.status}
            </p>
          </div>

          <p className="text-gray-500">📍 Location: {listingData.city}</p>

          {/* Buy Now Button & Modal */}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="default"
                className={`w-80 text-white font-semibold text-lg py-3 ${
                  isSold
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
                disabled={isSold}
              >
                Buy Now
              </Button>
            </DialogTrigger>
            {!isSold && (
              <DialogContent className="max-w-md rounded-lg">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold">
                    Enter Your Details
                  </DialogTitle>
                </DialogHeader>

                {/* Form Inputs */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                  <Input
                    type="text"
                    placeholder="Full Name"
                    {...register("name", { required: "Name is required" })}
                    className="rounded-md px-4 py-2 border focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">
                      {errors.name.message}
                    </p>
                  )}

                  <Input
                    type="text"
                    placeholder="Phone Number"
                    {...register("phone", {
                      required: "Phone number is required",
                    })}
                    className="rounded-md px-4 py-2 border focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm">
                      {errors.phone.message}
                    </p>
                  )}

                  {/* <Input
                    type="email"
                    placeholder="Email Address"
                    {...register("email", { required: "Email is required" })}
                    className="rounded-md px-4 py-2 border focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )} */}

                  <Input
                    type="text"
                    placeholder="Address"
                    {...register("address", {
                      required: "Address is required",
                    })}
                    className="rounded-md px-4 py-2 border focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm">
                      {errors.address.message}
                    </p>
                  )}

                  <Input
                    type="text"
                    placeholder="City"
                    {...register("city", { required: "City is required" })}
                    className="rounded-md px-4 py-2 border focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm">
                      {errors.city.message}
                    </p>
                  )}

                  <Input
                    type="text"
                    placeholder="Postal Code"
                    {...register("postalCode", {
                      required: "Post Code is required",
                    })}
                    className="rounded-md px-4 py-2 border focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.postalCode && (
                    <p className="text-red-500 text-sm">
                      {errors.postalCode.message}
                    </p>
                  )}

                  <Button
                    type="submit"
                    variant="default"
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold text-lg py-3 cursor-pointer"
                  >
                    Confirm Purchase
                  </Button>
                </form>
              </DialogContent>
            )}
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default ListingDetails;
