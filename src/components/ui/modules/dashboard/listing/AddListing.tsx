"use client";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import Image from "next/image";
import { X } from "lucide-react";
import RSInput from "@/components/ui/core/coustomUI/RSInput";
import { addListing } from "@/services/listing";
import { toast } from "sonner";

type FormValues = {
  title: string;
  description: string;
  condition: string;
  price: number;
  image: File | null;
  category: string;
  city: string;
};

const AddListing = () => {
  const [image, setImage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  // Handle Image Upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setValue("image", file);
    }
  };

  // Remove Image
  const handleRemoveImage = () => {
    setImage(null);
    setValue("image", null);
  };

  // Handle Form Submission
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const formData = new FormData();

      formData.append("data", JSON.stringify(data));
      if (data.image) {
        formData.append("image", data.image);
      }

      const res = await addListing(formData);
      if (res.success) {
        toast.success(res.message);
        reset();
      } else {
        toast.error(res.message || "Could not add listing");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">
            Add New Listing
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-800">
              Add New Listing
            </DialogTitle>
          </DialogHeader>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Title */}
            <div>
              <Label className="font-semibold">Title</Label>
              <RSInput
                {...register("title", { required: "Title is required" })}
                type="text"
                placeholder="Enter title"
                className="w-full mt-1 border rounded-md p-2"
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <Label className="font-semibold">Description</Label>
              <Textarea
                {...register("description", {
                  required: "Description is required",
                })}
                placeholder="Enter description"
                className="w-full mt-1 border rounded-md p-2"
              />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Condition */}
            <div>
              <Label className="font-semibold">Condition</Label>
              <Select
                onValueChange={(value) => setValue("condition", value)}
                defaultValue="new"
              >
                <SelectTrigger className="w-full border p-2 rounded-md mt-1">
                  <SelectValue placeholder="Select Condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="used">Used</SelectItem>
                </SelectContent>
              </Select>
              <input type="hidden" {...register("condition")} />
            </div>

            {/* Category */}
            <div>
              <Label className="font-semibold">Category</Label>
              <Select
                onValueChange={(value) => setValue("category", value)}
                defaultValue=""
              >
                <SelectTrigger className="w-full border p-2 rounded-md mt-1">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="clothing">Clothing</SelectItem>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="furniture">Furniture</SelectItem>
                  <SelectItem value="books">Books</SelectItem>
                  <SelectItem value="home-appliances">
                    Home-Appliances
                  </SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <input
                type="hidden"
                {...register("category", { required: "Category is required" })}
              />
              {errors.category && (
                <p className="text-red-500 text-sm">
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* Price */}
            <div>
              <Label className="font-semibold">Price</Label>
              <RSInput
                {...register("price", {
                  required: "Price is required",
                  valueAsNumber: true,
                })}
                type="number"
                placeholder="Enter price"
                className="w-full mt-1 border rounded-md p-2"
              />
              {errors.price && (
                <p className="text-red-500 text-sm">{errors.price.message}</p>
              )}
            </div>

            {/* City */}
            <div>
              <Label className="font-semibold">City</Label>
              <RSInput
                {...register("city", { required: "City is required" })}
                type="text"
                placeholder="Enter city"
                className="w-full mt-1 border rounded-md p-2"
              />
              {errors.city && (
                <p className="text-red-500 text-sm">{errors.city.message}</p>
              )}
            </div>

            {/* Image Uploader */}
            <div>
              <Label className="font-semibold">Upload Image</Label>
              <RSInput
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full mt-1 border p-2 rounded-md"
              />

              {image && (
                <div className="relative mt-2 w-full h-40 border rounded-md overflow-hidden">
                  <Image
                    src={image}
                    alt="Uploaded Preview"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 cursor-pointer hover:bg-red-600 transition"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end mt-6">
              <Button
                type="submit"
                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
              >
                Submit Listing
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddListing;
