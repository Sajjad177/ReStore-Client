"use client";

import { useEffect, useState } from "react";
import { paymentVerification } from "@/services/transaction";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Data {
  id: number;
  order_id: string;
  currency: string;
  amount: number;
  payable_amount: number;
  discsount_amount: number | null;
  disc_percent: number;
  received_amount: string;
  usd_amt: number;
  usd_rate: number;
  is_verify: number;
  card_holder_name: string | null;
  card_number: string | null;
  phone_no: string;
  bank_trx_id: string;
  invoice_no: string;
  bank_status: string;
  customer_order_id: string;
  sp_code: string;
  sp_message: string;
  name: string;
  email: string | null;
  address: string;
  city: string;
  value1: string | null;
  value2: string | null;
  value3: string | null;
  value4: string | null;
  transaction_status: string | null;
  method: string;
  date_time: string;
}

const PaymentSuccess = () => {
  const searchParams = useSearchParams();
  const order_id = searchParams.get("order_id");

  // State to store fetched data
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!order_id) {
      setError("Order ID is missing!");
      setLoading(false);
      return;
    }

    const fetchPaymentData = async () => {
      try {
        const response = await paymentVerification(order_id);
        console.log("Raw API Response:", response);

        if (
          response?.success &&
          Array.isArray(response.data) &&
          response.data.length > 0
        ) {
          setData(response.data[0]);
        } else {
          setError("No payment data found.");
        }
      } catch (err) {
        console.error("Error fetching payment data:", err);
        setError("Failed to fetch payment details.");
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentData();
  }, [order_id]);

  if (loading) return <div>Loading payment details...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-6 max-w-4xl font-primaryFront">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Order Verification
      </h1>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-4 text-sm">
              <dt className="font-semibold">Order ID:</dt>
              <dd>{data?.order_id}</dd>
              <dt className="font-semibold">Amount:</dt>
              <dd>
                {data?.currency} {data?.amount?.toFixed(2)}
              </dd>
              <dt className="font-semibold">Status:</dt>
              <dd>
                {data?.bank_status === "Success" ? (
                  <p className="bg-green-500  text-xl text-center py-1">
                    {data?.bank_status}
                  </p>
                ) : (
                  <p className="bg-red-500 text-xl text-center py-1">
                    {data?.bank_status}
                  </p>
                )}
              </dd>
              <dt className="font-semibold">Date:</dt>
              <dd>{data?.date_time}</dd>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-4 text-sm">
              <dt className="font-semibold">Method:</dt>
              <dd>{data?.method}</dd>
              <dt className="font-semibold">Transaction ID:</dt>
              <dd>{data?.bank_trx_id}</dd>
              <dt className="font-semibold">Invoice No:</dt>
              <dd>{data?.invoice_no}</dd>
              <dt className="font-semibold">SP Code:</dt>
              <dd>{data?.sp_code}</dd>
              <dt className="font-semibold">SP Message:</dt>
              <dd>
                {data?.sp_message === "Success" ? (
                  <p className="bg-green-500 text-xl text-center py-1">
                    {data?.sp_message}
                  </p>
                ) : (
                  <p className="bg-red-500 text-xl text-center py-1">
                    {data?.sp_message}
                  </p>
                )}
              </dd>
            </dl>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Customer Information</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-2 gap-4 text-sm">
            <dt className="font-semibold">Name:</dt>
            <dd>{data?.name}</dd>
            <dt className="font-semibold">Phone:</dt>
            <dd>{data?.phone_no}</dd>
            <dt className="font-semibold">Address:</dt>
            <dd>{data?.address}</dd>
            <dt className="font-semibold">City:</dt>
            <dd>{data?.city}</dd>
          </dl>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSuccess;
