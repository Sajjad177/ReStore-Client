import ListingSection from "@/components/ui/modules/home/listingSection/ListingSection";
import { getAllListings } from "@/services/listing";

const AllListingPage = async () => {
  const { data } = await getAllListings();

  return (
    <div>
      <ListingSection listings={data} />
    </div>
  );
};

export default AllListingPage;
