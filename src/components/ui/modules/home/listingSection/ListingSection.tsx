"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import Image from "next/image";
import { Heart } from "lucide-react";
import { addToWishList } from "@/services/wish";
import { toast } from "sonner";
import Link from "next/link";

const conditions = ["new", "used"];

const ListingSection = ({ listings }: { listings: any[] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);

  // Extract unique categories and cities from listings
  const uniqueCategories = [...new Set(listings.map((item) => item.category))];
  const uniqueCities = [...new Set(listings.map((item) => item.city))];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleCityChange = (city: string) => {
    setSelectedCities((prev) =>
      prev.includes(city) ? prev.filter((c) => c !== city) : [...prev, city]
    );
  };

  const handleConditionChange = (condition: string) => {
    setSelectedConditions((prev) =>
      prev.includes(condition)
        ? prev.filter((c) => c !== condition)
        : [...prev, condition]
    );
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setPriceRange([0, 100000]);
    setSelectedCategories([]);
    setSelectedCities([]);
    setSelectedConditions([]);
  };

  const filteredListings = listings.filter((listing) => {
    return (
      listing.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      listing.price >= priceRange[0] &&
      listing.price <= priceRange[1] &&
      (selectedCategories.length === 0 ||
        selectedCategories.includes(listing.category)) &&
      (selectedCities.length === 0 || selectedCities.includes(listing.city)) &&
      (selectedConditions.length === 0 ||
        selectedConditions.includes(listing.condition))
    );
  });

  const handeleAddToWishlist = async (listingId: string) => {
    try {
      const res = await addToWishList(listingId);
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex min-h-screen p-4">
      {/* Sidebar */}
      <div className="w-1/4 p-4 rounded-lg shadow-md hidden lg:block">
        <h2 className="text-lg font-semibold mb-4">Filter</h2>
        <Button
          variant="outline"
          className="mb-4 w-full"
          onClick={handleClearFilters}
        >
          Clear Filters
        </Button>

        {/* Price Filter */}
        <div className="mb-4">
          <h3 className="font-medium">Filter By Price</h3>
          <Slider
            defaultValue={[0, 100000]}
            min={0}
            max={100000}
            step={1000}
            onValueChange={(value: any) => setPriceRange(value)}
          />
          <p>
            Selected Price: ${priceRange[0]} - ${priceRange[1]}
          </p>
        </div>

        {/* Category Filter */}
        {uniqueCategories.length > 0 && (
          <div className="mb-4">
            <h3 className="font-bold">Filter By Category</h3>
            {uniqueCategories.map((category) => (
              <div key={category} className="flex items-center gap-2 mt-1">
                <Checkbox
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => handleCategoryChange(category)}
                />
                <label>{category}</label>
              </div>
            ))}
          </div>
        )}

        {/* City Filter */}
        {uniqueCities.length > 0 && (
          <div className="mb-4">
            <h3 className="font-bold">Filter By City</h3>
            {uniqueCities.map((city) => (
              <div key={city} className="flex items-center gap-2 mt-1">
                <Checkbox
                  checked={selectedCities.includes(city)}
                  onCheckedChange={() => handleCityChange(city)}
                />
                <label>{city}</label>
              </div>
            ))}
          </div>
        )}

        {/* Condition Filter */}
        <div className="mb-4">
          <h3 className="font-bold">Filter By Condition</h3>
          {conditions.map((condition) => (
            <div key={condition} className="flex items-center gap-2 mt-1">
              <Checkbox
                checked={selectedConditions.includes(condition)}
                onCheckedChange={() => handleConditionChange(condition)}
              />
              <label>{condition}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        {/* Search Bar */}
        <div className="w-full flex items-center gap-2 mb-4">
          <Input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full"
          />
          <Button variant="default">Search</Button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredListings.length > 0 ? (
            filteredListings.map((listing) => (
              <Card key={listing._id} className="shadow-md relative">
                <CardHeader>
                  <Image
                    src={listing.image}
                    alt={listing.title}
                    width={500}
                    height={500}
                    className="w-full h-40 object-cover rounded-md"
                  />
                  <CardTitle className="mt-2">{listing.title}</CardTitle>
                  <Heart
                    onClick={() => handeleAddToWishlist(listing._id)}
                    className="absolute top-2 right-2 text-red-500 cursor-pointer"
                  />
                </CardHeader>
                <CardContent>
                  <p className="text-sm">Tk {listing.price}</p>
                  <Link href={`/listings/${listing._id}`}>
                    <Button
                      variant="default"
                      className="mt-2 w-full cursor-pointer bg-emerald-500"
                    >
                      View Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No products found
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingSection;
