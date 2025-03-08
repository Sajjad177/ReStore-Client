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

const SalesHistory = ({ salesData }: { salesData: any[] }) => {
  return (
    <div className="p-4 border">
      <h2 className="text-xl font-semibold mb-4">Sales History</h2>
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
            {salesData.length > 0 ? (
              salesData.map((sale, index) => (
                <TableRow key={index}>
                  <TableCell>{sale.sellerID?.name || "N/A"}</TableCell>
                  <TableCell>{sale.buyerID?.name || "N/A"}</TableCell>
                  <TableCell>{sale.itemID?.title || "N/A"}</TableCell>
                  <TableCell>
                    {sale.itemID?.image ? (
                      <Image
                        src={sale.itemID.image}
                        alt={sale.itemID.title}
                        width={50}
                        height={50}
                        className="rounded-md object-cover"
                      />
                    ) : (
                      "No Image"
                    )}
                  </TableCell>
                  <TableCell className="font-medium">
                    ${sale.itemID?.price || "N/A"}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-md text-sm ${
                        sale.status === "sold"
                          ? "bg-green-200 text-green-700"
                          : "bg-yellow-200 text-yellow-700"
                      }`}
                    >
                      {sale.status || "N/A"}
                    </span>
                  </TableCell>
                  <TableCell>{sale.paymentStatus || "N/A"}</TableCell>
                  <TableCell>{sale.transaction?.date_time || "N/A"}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-4">
                  No sales data found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SalesHistory;
