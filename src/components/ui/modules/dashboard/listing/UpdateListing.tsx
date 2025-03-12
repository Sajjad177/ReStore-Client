"use client";

import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
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
import { updateListing } from "@/services/listing";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface UpdateListingFormProps {
  _id: string;
  title: string;
  description: string;
  condition: string;
  price: number;
  status: string;
  image: File | null;
  city: string;
  category: string;
}

const UpdateListing = ({
  listingData,
}: {
  listingData: UpdateListingFormProps;
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: listingData?.title || "",
      description: listingData?.description || "",
      condition: listingData?.condition || "",
      price: listingData?.price || 0,
      status: listingData?.status || "",
      city: listingData?.city || "",
      category: listingData?.category || "",
    },
  });

  const router = useRouter();

  // State for Image Preview
  const [imagePreview, setImagePreview] = useState<string | null>(
    listingData?.image instanceof File
      ? URL.createObjectURL(listingData.image)
      : null
  );
  const [imageFile, setImageFile] = useState<File | null>(
    listingData?.image || null
  );

useEffect(() => {
  if (listingData) {
    Object.keys(listingData).forEach((key) => {
      if (key !== "_id" && key !== "image") {
        setValue(
          key as keyof Omit<UpdateListingFormProps, "_id" | "image">,
          listingData[key as keyof UpdateListingFormProps] as any
        );
      }
    });
  }
}, [listingData, setValue]);


  // Handle Image Upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImagePreview(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  // Remove Image
  const handleRemoveImage = () => {
    setImagePreview(null);
    setImageFile(null);
  };

  // Handle Form Submission
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("condition", data.condition);
      formData.append("price", data.price);
      formData.append("status", data.status);
      formData.append("city", data.city);
      formData.append("category", data.category);

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const res = await updateListing(listingData._id, formData);

      if (res.success) {
        toast.success(res.message);
        router.push("/user/dashboard/listing");
      } else {
        toast.error(res.message || "Could not update listing");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Update Listing
      </h2>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <div>
          <Label className="font-semibold">Title</Label>
          <Input
            {...register("title", { required: "Title is required" })}
            type="text"
            className="w-full mt-1 border rounded-md p-2"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">
              {String(errors.title.message)}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <Label className="font-semibold">Description</Label>
          <Textarea
            {...register("description", {
              required: "Description is required",
            })}
            className="w-full mt-1 border rounded-md p-2"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">
              {String(errors.description.message)}
            </p>
          )}
        </div>

        {/* Condition */}
        <div>
          <Label className="font-semibold">Condition</Label>
          <Select
            onValueChange={(value) => setValue("condition", value)}
            defaultValue={listingData?.condition}
          >
            <SelectTrigger className="w-full border p-2 rounded-md mt-1">
              <SelectValue placeholder="Select Condition" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="used">Used</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Price */}
        <div>
          <Label className="font-semibold">Price</Label>
          <Input
            {...register("price", {
              required: "Price is required",
              valueAsNumber: true,
            })}
            type="number"
            className="w-full mt-1 border rounded-md p-2"
          />
          {errors.price && (
            <p className="text-red-500 text-sm">
              {String(errors.price.message)}
            </p>
          )}
        </div>

        {/* City */}
        <div>
          <Label className="font-semibold">City</Label>
          <Input
            {...register("city", { required: "City is required" })}
            type="text"
            className="w-full mt-1 border rounded-md p-2"
          />
          {errors.city && (
            <p className="text-red-500 text-sm">
              {String(errors.city.message)}
            </p>
          )}
        </div>

        {/* Image Uploader */}
        <div>
          <Label className="font-semibold">Upload Image</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full mt-1 border p-2 rounded-md"
          />
          {imagePreview && (
            <div className="relative mt-2 w-full h-40 border rounded-md overflow-hidden">
              <Image
                src={imagePreview}
                alt="Uploaded Preview"
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
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
            Update Listing
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateListing;
