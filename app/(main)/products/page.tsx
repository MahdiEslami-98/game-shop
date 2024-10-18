"use client";
import getAllProducts from "@/api/productApi/getAllProducts";
import getAllSubcategory from "@/api/subcategoryApi/getAllSubcategory";
import Input from "@/components/Input";
import Collapsible from "@/components/ui/collapsible";
import Products from "@/components/ui/products";
import Spinner from "@/components/ui/spinner";
import Switch from "@/components/ui/switch";
import { useQuery } from "@tanstack/react-query";
import { ArrowDownWideNarrow } from "lucide-react";
import Link from "next/link";
import { Suspense, useState } from "react";

const types = ["ویترین", "خانگی و اداری", "گیمینگ", "رندرینگ", "ماینینگ"];
const sorts = [
  {
    name: "جدیدترین",
    value: "-createdAt",
  },
  {
    name: "ارزانترین",
    value: "price",
  },
  {
    name: "گرانترین",
    value: "-price",
  },
  {
    name: "بیشترین",
    value: "-quantity",
  },
  {
    name: "کمترین",
    value: "quantity",
  },
];

const ProductsAndCategoryPage = () => {
  const [sort, setSort] = useState("-createdAt");
  const [type, setType] = useState("ویترین");

  const { data: subcategories } = useQuery({
    queryKey: ["filterSubcategories"],
    queryFn: () => getAllSubcategory(),
  });

  const { data: maxPriceProduct } = useQuery({
    queryKey: ["maxPrice"],
    queryFn: () => getAllProducts(1, "-price", undefined, undefined, 1),
  });

  const { data: minPriceProduct } = useQuery({
    queryKey: ["minPrice"],
    queryFn: () => getAllProducts(1, "price", undefined, undefined, 1),
  });

  return (
    <div className="lg:px-7">
      <div className="flex gap-x-4">
        <div className="rounded-3xl bg-white px-2 py-6 text-sm sm:px-4 md:text-base xl:py-2.5 dark:bg-dark-boxColor">
          <span className="hidden md:inline">انواع محصول:</span>
          <select
            name="types"
            className="inline outline-0 sm:px-4 xl:hidden dark:bg-dark-boxColor"
          >
            {types.map((t, i) => (
              <option key={i} value={t} className="">
                {t}
              </option>
            ))}
          </select>
          {types.map((t, i) => (
            <span
              className={`mr-5 hidden cursor-pointer rounded-2xl px-5 py-6 xl:inline-block xl:py-3 ${type === t ? "bg-secondary-100 text-white" : "text-description-100"}`}
              key={i}
              onClick={() => setType(t)}
            >
              {t}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-x-4 rounded-3xl bg-white px-2 py-3 text-sm focus:bg-slate-500 sm:px-4 md:text-base xl:gap-x-0 dark:bg-dark-boxColor">
          <label htmlFor="sort" className="flex sm:gap-x-2">
            <ArrowDownWideNarrow className="" />
            <span className="hidden sm:inline">مرتب سازی:</span>
          </label>
          {sorts.map((s, i) => (
            <span
              className={`mr-3 hidden cursor-pointer rounded-2xl px-5 py-3 xl:inline-block ${sort === s.value ? "bg-primary-100 text-white" : "text-description-100"}`}
              key={i}
              onClick={() => setSort(s.value)}
            >
              {s.name}
            </span>
          ))}
          <select
            value={sort}
            name="sort"
            id="sort"
            className="inline-block outline-0 sm:px-3 xl:hidden dark:bg-dark-boxColor"
            onChange={(e) => setSort(e.target.value)}
          >
            {sorts.map((s, i) => (
              <option key={i} value={s.value} className="hover:bg-slate-500">
                {s.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 pt-6 lg:grid-cols-4 xl:grid-cols-5">
        <div className="relative hidden lg:block">
          <div className="sticky top-8">
            <div className="relative rounded-3xl border bg-white px-4 pb-4 pt-11 dark:bg-dark-boxColor">
              <div className="absolute left-1/2 top-0 -translate-x-1/2 rounded-b-3xl bg-secondary-100 px-11 py-1 text-white">
                فیلترها
              </div>
              <Collapsible
                triggerClass="border-b py-3"
                containerClass="bg-[#CCCCCC12] px-3 flex flex-col gap-y-2"
                trigger="دسته بندی‌ها"
              >
                {subcategories?.data.data.subcategories.map((sub) => (
                  <Link
                    href={`/products?subcategory=${sub._id}&category=${sub.category}&page=1`}
                    key={sub._id}
                  >
                    {sub.name}
                  </Link>
                ))}
              </Collapsible>
              <Collapsible
                triggerClass="border-b py-3"
                containerClass="bg-[#CCCCCC12] px-3"
                trigger="محدوده قیمت"
              >
                <Input
                  className="w-full"
                  type="range"
                  min={
                    (minPriceProduct?.data?.data?.products &&
                      minPriceProduct?.data?.data?.products[0].price) ||
                    0
                  }
                  max={
                    (maxPriceProduct?.data?.data?.products &&
                      maxPriceProduct?.data?.data?.products[0].price) ||
                    50000000
                  }
                />
              </Collapsible>
              <div className="flex items-center justify-between gap-x-2 border-b py-3">
                <span>کلای تخفیف دار</span>
                <Switch
                  id="discount"
                  onChange={(value) => {
                    console.log(value);
                  }}
                />
              </div>
              <div className="flex items-center justify-between gap-x-2 border-b py-3">
                <span>فقط کالاهای موجود</span>
                <Switch
                  id="inStock"
                  onChange={(value) => {
                    console.log(value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1 lg:col-span-3 xl:col-span-4">
          <Suspense
            fallback={
              <div className="flex items-center justify-center bg-white">
                <Spinner />
              </div>
            }
          >
            <Products sort={sort} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default ProductsAndCategoryPage;
