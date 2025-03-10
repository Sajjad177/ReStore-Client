import AllListing from "@/components/ui/modules/dashboard/listing";
import AddListing from "@/components/ui/modules/dashboard/listing/AddListing";
import { getAvailableListings } from "@/services/listing";

const ListingPage = async () => {
  const { data } = await getAvailableListings();

  return (
    <div>
      <AddListing />
      <AllListing listings={data} />
    </div>
  );
};

export default ListingPage;
