"use client";
import getAllProducts from "@/api/productApi/getAllProducts";
import Button from "@/components/Button";
import { ISubcategory } from "@/types/api/subcategory";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, ChevronUp, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import ProductCard from "../productCard";

const CategorySlider = ({
  data,
  index,
}: {
  data: ISubcategory;
  index: number;
}) => {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  const { data: products, isSuccess } = useQuery({
    queryKey: ["subcategoryProducts", data.category, data._id],
    queryFn: () =>
      getAllProducts(undefined, undefined, data.category, data._id),
  });

  const handleNext = () => {
    if (!swiper) return;
    swiper.slideNext();
  };
  const handlePrev = () => {
    if (!swiper) return;
    swiper.slidePrev();
  };

  return (
    <div className="flex items-center">
      <div
        className={`relative ml-11 flex h-[326px] w-48 flex-col items-center justify-between gap-y-8 rounded-3xl p-6 ${index % 2 === 0 ? "bg-primary-100" : "bg-secondary-100"}`}
      >
        <p className="text-center text-2xl font-bold text-white">{data.name}</p>
        <Image src={`/category.svg`} alt="" width={150} height={150} />
        <Link
          className="flex w-max items-center rounded-lg border border-white px-1 py-2 text-white hover:bg-white/85"
          href={`/products?category=${data.category}&subcategory=${data._id}&page=1`}
        >
          مشاهده همه <ChevronLeft className="h-4 w-4" />
        </Link>
        <Button
          onClick={handleNext}
          className="group absolute -left-3 top-[40%] mb-4 rounded-full border bg-white shadow-[0_0_10px_0_#000] hover:bg-black"
        >
          <ChevronLeft className="group-hover:text-white dark:text-black" />
        </Button>
        <Button
          onClick={handlePrev}
          className="group absolute -left-3 bottom-[40%] rounded-full border bg-white shadow-[0_0_10px_0_#000] hover:bg-black"
        >
          <ChevronRight className="text-black group-hover:text-white" />
        </Button>
      </div>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        watchOverflow
        onSwiper={setSwiper}
        className="h-full w-full"
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 10 },
          1024: { slidesPerView: 3, spaceBetween: 10 },
          1280: { slidesPerView: 4, spaceBetween: 10 },
          1440: { slidesPerView: 5, spaceBetween: 10 },
        }}
      >
        {isSuccess &&
          products.data.data.products &&
          products?.data?.data?.products.map((product) => (
            <SwiperSlide key={product._id} className="py-2.5 pr-1.5">
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default CategorySlider;
