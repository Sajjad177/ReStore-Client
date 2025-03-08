import SalesHistory from "@/components/ui/modules/Sales/SalesHistory";
import { getCurrentUser } from "@/services/authService";
import { getSalersHistory } from "@/services/transaction";
import React from "react";

const TrackSales = async () => {
  const user = await getCurrentUser();
  const res = await getSalersHistory(user.userId!);
  
  const data = res.data;
  return (
    <div>
      <SalesHistory salesData = {data} />
    </div>
  );
};

export default TrackSales;
