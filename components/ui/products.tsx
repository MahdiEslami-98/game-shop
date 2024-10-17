"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import getAllProducts from "@/api/productApi/getAllProducts";
import ProductCard from "./productCard";
import Spinner from "./spinner";

const Products = ({ sort }: { sort: string }) => {
  const [page, setPage] = useState(1);
  const params = useSearchParams();
  const category = params.get("category") ?? "";
  const subcategory = params.get("subcategory") ?? "";
  const pageParam = params.get("page");

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["productsPage", category, subcategory, page, sort],
    queryFn: () => getAllProducts(page, sort, category, subcategory),
  });

  useEffect(() => {
    if (pageParam) {
      setPage(Number(pageParam));
    }
  }, []);

  return (
    <>
      <div className="flex flex-wrap gap-4">
        {isSuccess &&
          data.data.data.products &&
          data?.data?.data?.products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        {isLoading && (
          <div className="flex h-full w-full items-center justify-center">
            <Spinner />
          </div>
        )}
      </div>
      <div></div>
    </>
  );
};

export default Products;
