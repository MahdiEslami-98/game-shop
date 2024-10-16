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
import apiRoutes from "@/api/apiRoutes";
import { useCart, useCartActions } from "@/store/cart-store";

const CategorySlider = ({
  data,
  index,
}: {
  data: ISubcategory;
  index: number;
}) => {
  const cart = useCart();
  const { addToCart, removeFromCart } = useCartActions();
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
          className="flex w-max items-center rounded-lg border border-white px-1 py-2 text-white"
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
        spaceBetween={30}
        watchOverflow
        onSwiper={setSwiper}
        className="h-full w-full"
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 30 },
          1024: { slidesPerView: 3, spaceBetween: 30 },
          1280: { slidesPerView: 4, spaceBetween: 30 },
          1440: { slidesPerView: 5, spaceBetween: 30 },
        }}
      >
        {isSuccess &&
          products.data.data.products &&
          products?.data?.data?.products.map((product) => (
            <SwiperSlide key={product._id}>
              <div className="group relative block h-[326px] w-[200px] rounded-3xl border-2 border-white bg-white p-4 hover:border-secondary-100 dark:border-dark-boxColor dark:bg-dark-boxColor">
                <Link href={`/products/${product._id}`}>
                  <div className="mb-3 overflow-hidden rounded-2xl bg-gray-300">
                    <Image
                      alt=""
                      src={`${apiRoutes.productThumb}${product.thumbnail} `}
                      width={150}
                      height={150}
                      className="w-full"
                    />
                  </div>
                  <p className="mb-5 line-clamp-2 h-11">{product.name}</p>
                  <div className="flex items-center justify-between">
                    <span className="flex gap-x-1">
                      <Star className="h-5 w-5 text-[#FFC700]" />
                      3.5
                    </span>
                    <span>{product.price} تومان</span>
                  </div>
                </Link>
                <Button
                  className={`absolute bottom-0 right-1/2 flex w-16 translate-x-1/2 justify-center rounded-t-3xl group-hover:w-32 ${
                    cart.find((item) => item._id === product._id)
                      ? "bg-alarm-100"
                      : "bg-secondary-100"
                  }`}
                >
                  <ChevronUp className="h-6 w-6 text-white group-hover:hidden" />
                  {!cart.find((item) => item._id === product._id) ? (
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(
                          {
                            __v: 0,
                            _id: product._id,
                            quantity: product.quantity,
                            brand: product.brand,
                            category: {
                              _id: product.category,
                              name: "",
                              __v: 0,
                              createdAt: "",
                              updatedAt: "",
                              slugname: "",
                              icon: "",
                            },
                            subcategory: {
                              _id: product.subcategory,
                              __v: 0,
                              category: product.category,
                              createdAt: "",
                              updatedAt: "",
                              slugname: "",
                              name: "",
                            },
                            name: product.name,
                            price: product.price,
                            thumbnail: product.thumbnail,
                            description: product.description,
                            createdAt: "",
                            updatedAt: "",
                            slugname: "",
                            images: product.images ?? [],
                            rating: {
                              rate: 0,
                              count: 0,
                            },
                          },
                          1,
                        );
                      }}
                      className={`hidden text-white group-hover:inline`}
                    >
                      افزودن به سبد
                    </span>
                  ) : (
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromCart(product._id);
                      }}
                      className={`hidden text-white group-hover:inline-block`}
                    >
                      حذف از سبد
                    </span>
                  )}
                </Button>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default CategorySlider;
