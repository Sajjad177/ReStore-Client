"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";

const PurchaseHistory = ({ purchases }: { purchases: any[] }) => {
  return (
    <div className="p-4 border">
      <h2 className="text-xl font-semibold mb-4">Purchase History</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Seller Name</TableHead>
              <TableHead>Buyer Name</TableHead>
              <TableHead>Item Title</TableHead>
              <TableHead>Item Image</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment Status</TableHead>
              <TableHead>Transaction Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {purchases.length > 0 ? (
              purchases.map((purchase, index) => (
                <TableRow key={index}>
                  <TableCell>{purchase.sellerID?.name || "N/A"}</TableCell>
                  <TableCell>{purchase.buyerID?.name || "N/A"}</TableCell>
                  <TableCell>{purchase.itemID?.title || "N/A"}</TableCell>
                  <TableCell>
                    {purchase.itemID?.image ? (
                      <Image
                        src={purchase.itemID.image}
                        alt={purchase.itemID.title}
                        width={50}
                        height={50}
                        className="rounded-md object-cover"
                      />
                    ) : (
                      "No Image"
                    )}
                  </TableCell>
                  <TableCell className="font-medium">
                    ${purchase.itemID?.price || "N/A"}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-md text-sm ${
                        purchase.status === "completed"
                          ? "bg-green-200 text-green-700"
                          : "bg-yellow-200 text-yellow-700"
                      }`}
                    >
                      {purchase.status || "N/A"}
                    </span>
                  </TableCell>
                  <TableCell>{purchase.paymentStatus || "N/A"}</TableCell>
                  <TableCell>
                    {purchase.transaction?.date_time || "N/A"}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-4">
                  No purchases found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PurchaseHistory;
