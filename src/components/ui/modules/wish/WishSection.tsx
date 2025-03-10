"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { removeFromWishList } from "@/services/wish";


const WishSection = ({ wishListData }: { wishListData: any }) => {
  const handleRemove = async (id: string) => {
    try {
      const res = await removeFromWishList(id);
      console.log(res);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {wishListData?.data?.listings?.length > 0 ? (
          wishListData?.data?.listings.map((item: any) => (
            <Card key={item._id} className="relative shadow-lg">
              <CardHeader className="p-3">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={500}
                  height={500}
                  className="w-full h-40 object-cover rounded-lg"
                />
              </CardHeader>
              <CardContent className="p-4 space-y-2">
                <CardTitle className="text-lg font-semibold">
                  {item.title}
                </CardTitle>
                <p className="text-sm text-gray-600">{item.description}</p>
                <p className="text-lg font-bold text-primary">${item.price}</p>

                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 cursor-pointer"
                  onClick={() => handleRemove(item._id)}
                >
                  <Trash2 size={18} />
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            Your wishlist is empty.
          </p>
        )}
      </div>
    </div>
  );
};

export default WishSection;
