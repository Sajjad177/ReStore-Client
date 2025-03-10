import WishSection from "@/components/ui/modules/wish/WishSection";
import { getCurrentUser } from "@/services/authService";
import { getWishList } from "@/services/wish";
import React from "react";

const WishListPage = async () => {
  const user = await getCurrentUser();
  const data = await getWishList(user.userId!);
  console.log(data);

//   const wishList = data.data;

  return (
    <div>
      <WishSection wishListData={data} />
    </div>
  );
};

export default WishListPage;
