import Payment from "@/components/ui/payment";
import Spinner from "@/components/ui/spinner";
import { Suspense } from "react";

const PaymentPage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex h-full w-full items-center justify-center">
          <Spinner />
        </div>
      }
    >
      <Payment />
    </Suspense>
  );
};

export default PaymentPage;
