import UpdateListingForm from "@/components/ui/modules/dashboard/listing/UpdateListing";
import { getSingleListing } from "@/services/listing";

const UpdateListing = async ({
  params,
}: {
  params: Promise<{ listingId: string }>;
}) => {
  const { listingId } = await params;
  const { data } = await getSingleListing(listingId);

  return (
    <div>
      <UpdateListingForm listingData={data} />
    </div>
  );
};

export default UpdateListing;
