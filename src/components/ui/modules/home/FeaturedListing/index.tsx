import { getAllListings } from "@/services/listing";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const FeaturedListing = async () => {
  const { data } = await getAllListings();
  const featuredListings = data.slice(0, 6); // Get only the first 6 listings

  return (
    <div className="p-6 rounded-lg">
      <h2 className="text-3xl font-bold text-center my-14">
        Featured Listings
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {featuredListings.map((listing: any) => (
          <div key={listing._id} className="bg-white p-4 rounded-lg shadow-md">
            <Image
              src={listing.image}
              alt={listing.title}
              width={500}
              height={500}
              className="w-full h-40 object-cover rounded-md mb-2"
            />
            <h3 className="text-lg font-semibold">{listing.title}</h3>
            <p className="text-gray-600">${listing.price}</p>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="mt-6 text-center">
        <Link href="/listings">
          <Button className="bg-emerald-500 text-lg text-white px-6 py-2 rounded-lg hover:bg-emerald-600 transition cursor-pointer">
            View All
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedListing;
