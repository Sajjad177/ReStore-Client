import AllListing from "@/components/ui/modules/dashboard/listing";
import AddListing from "@/components/ui/modules/dashboard/listing/AddListing";
import { getAllListings } from "@/services/listing";

const ListingPage = async () => {
  const { data } = await getAllListings();

  return (
    <div>
      <AddListing />
      <AllListing listings={data} />
    </div>
  );
};

export default ListingPage;
