"use client";
import { useEffect, useState } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import Button from "@/components/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import getAllProducts from "@/api/productApi/getAllProducts";
import Spinner from "../spinner";
import Image from "next/image";
import apiRoutes from "@/api/apiRoutes";
import Link from "next/link";

const SameProductSlider = ({ subCId }: { subCId: string }) => {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["sameProducts", subCId],
    queryFn: () => getAllProducts(1, undefined, undefined, subCId),
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
    <>
      {isLoading && (
        <div className="flex h-full w-full items-center justify-center">
          <Spinner />
        </div>
      )}
      {isSuccess && (
        <div className="flex h-full items-center gap-x-2 sm:gap-x-8">
          <Button
            className="group hidden rounded-full p-0.5 shadow-[0_0_10px_0_#ccc] hover:bg-black sm:inline-block"
            onClick={handlePrev}
          >
            <ChevronRight className="group-hover:text-white disabled:group-hover:text-black" />
          </Button>
          <Swiper
            onSwiper={setSwiper}
            spaceBetween={30}
            slidesPerView={1}
            watchOverflow
            className="w-full"
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 30 },
              1024: { slidesPerView: 3, spaceBetween: 30 },
              1280: { slidesPerView: 4, spaceBetween: 30 },
              1440: { slidesPerView: 5, spaceBetween: 30 },
            }}
          >
            {data.data.data.products?.map((product) => (
              <SwiperSlide key={product._id}>
                <Link href={`/products/${product._id}`}>
                  <div className="flex flex-col items-center rounded-xl border px-2 pb-2 pt-4">
                    <div className="relative">
                      <Image
                        alt=""
                        src={`${apiRoutes.productThumb}${product.thumbnail}`}
                        width={200}
                        height={200}
                      />
                      <span className="absolute left-2 top-2 rounded bg-alarm-100 px-1 py-px text-sm text-white">
                        20%
                      </span>
                    </div>
                    <p className="mb-9 line-clamp-2 h-10 overflow-hidden pt-2 text-xs">
                      {product.name}
                    </p>
                    <div className="w-full rounded-lg bg-secondary-100 py-1.5 text-center text-white">
                      <span>{product.price} تومان</span>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
          <Button
            onClick={handleNext}
            className="group hidden rounded-full p-0.5 shadow-[0_0_10px_0_#ccc] hover:bg-black sm:inline-block"
          >
            <ChevronLeft className="group-hover:text-white disabled:group-hover:text-black" />
          </Button>
        </div>
      )}
    </>
  );
};

export default SameProductSlider;
