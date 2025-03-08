import PurchaseHistory from "@/components/ui/modules/Purchase/PurchaseHistory";
import { getCurrentUser } from "@/services/authService";
import { getPaurchaseHistory } from "@/services/transaction";

const PurchasesPage = async () => {
  const user = await getCurrentUser();
  const res = await getPaurchaseHistory(user.userId!);
  const data = res.data;

  return (
    <div>
      <PurchaseHistory purchases={data} />
    </div>
  );
};

export default PurchasesPage;
