import ListingDetails from "@/components/ui/modules/home/listingSection/listingDetails";
import { getSingleListing } from "@/services/listing";

const ListingDetailsPage = async ({
  params,
}: {
  params: { listingId: string };
}) => {
  const { listingId } = await params;
  const { data } = await getSingleListing(listingId);

  return (
    <div>
      <ListingDetails listingData={data} />
    </div>
  );
};

export default ListingDetailsPage;
