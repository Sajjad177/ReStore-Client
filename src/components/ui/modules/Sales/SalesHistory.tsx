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
import { Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  deleteTransaction,
  updateTransactionStatus,
} from "@/services/transaction";
import { toast } from "sonner";

const SalesHistory = ({ salesData }: { salesData: any[] }) => {
  // Function to update status
  const handleStatusChange = async (id: string, status: string) => {
    try {
      const res = await updateTransactionStatus(id, status);
      if (res.status) {
        toast.success("Status updated successfully");
      } else {
        toast.error("Could not update status");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // Function to delete a sale entry
  const handleDelete = async (id: string) => {
    try {
      const res = await deleteTransaction(id);
      if (res.status) {
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
    <div className="p-4 border">
      <h2 className="text-xl font-semibold mb-4">Sales History</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Buyer Name</TableHead>
              <TableHead>Item Title</TableHead>
              <TableHead>Item Image</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment Status</TableHead>
              <TableHead>Transaction Date</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {salesData?.length > 0 ? (
              salesData?.map((sale, index) => (
                <TableRow key={index}>
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
                    <Select
                      onValueChange={(value) =>
                        handleStatusChange(sale._id, value)
                      }
                      defaultValue={sale.status || "pending"}
                    >
                      <SelectTrigger className="w-28">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-md text-sm ${
                        sale.paymentStatus === "Completed"
                          ? "bg-green-200 text-green-700"
                          : "bg-yellow-200 text-yellow-700"
                      }`}
                    >
                      {sale.paymentStatus || "N/A"}
                    </span>
                  </TableCell>
                  <TableCell>{sale.transaction?.date_time || "N/A"}</TableCell>
                  <TableCell>
                    <button
                      onClick={() => handleDelete(sale._id)}
                      className="text-red-500 hover:text-red-700 cursor-pointer"
                    >
                      <Trash2 size={18} />
                    </button>
                  </TableCell>
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
