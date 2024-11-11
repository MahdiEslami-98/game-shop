"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Check, X } from "lucide-react";

const Result = () => {
  const param = useSearchParams();
  const status = param.get("payment");
  const router = useRouter();

  const redirect = () => {
    setTimeout(() => {
      router.push("/");
    }, 3000);
  };

  if (!status) {
    // router.push("/");
    return <></>;
  }

  if (status === "success") {
    return (
      <div className="container mx-auto" onLoad={redirect}>
        <div className="flex min-h-[80vh] items-center justify-center">
          <div>
            <Check className="h-16 w-16 text-green-500 md:h-32 md:w-32" />
          </div>
          <p className="w-1/2 text-lg font-bold md:text-xl lg:w-1/3">
            با تشکر از خرید شما، سفارش شما با موفقیت ثبت شد و به زودی ارسال
            خواهد شد
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto" onLoad={redirect}>
      <div className="flex min-h-[80vh] items-center justify-center">
        <X className="h-16 w-16 text-red-500 md:h-32 md:w-32" />
        <div className="w-1/2 lg:w-1/3">
          <p className="text-lg font-bold md:text-xl">
            پرداخت ناموفق بود. سفارش شما ثبت نشد
          </p>
          <p className="text-lg font-bold md:text-xl">لطفا مجددا تلاش کنید.</p>
        </div>
      </div>
    </div>
  );
};

export default Result;
