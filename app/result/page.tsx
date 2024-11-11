import ResultPageSkeleton from "@/components/skeletons/resultPageSkeleton";
import Result from "@/components/ui/result";
import { Suspense } from "react";

const ResultPage = () => {
  return (
    <Suspense fallback={<ResultPageSkeleton />}>
      <Result />
    </Suspense>
  );
};

export default ResultPage;
