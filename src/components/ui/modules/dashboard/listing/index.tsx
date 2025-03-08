"use client";

import { Pencil, Trash } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { deleteListing } from "@/services/listing";
import { toast } from "sonner";
import Link from "next/link";

const AllListing = ({ listings }: any) => {
  const handleDelete = async (listingId: any) => {
    try {
      const res = await deleteListing(listingId);
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
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">All Listings</h2>
      {/* Responsive Table Wrapper */}
      <div className="overflow-x-auto bg-white">
        <Table className="min-w-full border border-gray-300">
          {/* Table Head */}
          <TableHeader>
            <TableRow className="bg-gray-200 text-gray-700 uppercase text-sm font-semibold">
              <TableHead className="px-4 py-3 text-left">#</TableHead>
              <TableHead className="px-4 py-3 text-left">Image</TableHead>
              <TableHead className="px-4 py-3 text-left">Title</TableHead>

              <TableHead className="px-4 py-3 text-left">Price</TableHead>
              <TableHead className="px-4 py-3 text-left">Status</TableHead>
              <TableHead className="px-4 py-3 text-left">Actions</TableHead>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody>
            {listings && listings.length > 0 ? (
              listings?.map((listing: any, index: number) => (
                <TableRow
                  key={listing._id}
                  className="border-b hover:bg-gray-100 transition"
                >
                  <TableCell className="px-4 py-3 font-medium">
                    {index + 1}
                  </TableCell>

                  {/* Image Column */}
                  <TableCell className="px-4 py-3">
                    <Image
                      src={listing.image}
                      alt={listing.title}
                      width={100}
                      height={100}
                      className="w-16 h-16 rounded-md object-cover border"
                    />
                  </TableCell>

                  <TableCell className="px-4 py-3">{listing.title}</TableCell>

                  {/* Price Column */}
                  <TableCell className="px-4 py-3 font-semibold text-green-600">
                    ${listing.price}
                  </TableCell>

                  {/* Status Column */}
                  <TableCell className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-xs font-bold ${
                        listing.status === "Active"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {listing.status}
                    </span>
                  </TableCell>

                  {/* Actions Column */}
                  <TableCell className="px-4 py-3 flex space-x-3">
                    <Link href={`/user/listing/${listing._id}`}>
                      <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md transition">
                        <Pencil className="w-5 h-5 cursor-pointer" />
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(listing._id)}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md transition cursor-pointer"
                    >
                      <Trash className="w-5 h-5" />
                    </button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="px-4 py-3 text-center text-gray-500"
                >
                  No listings found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AllListing;
