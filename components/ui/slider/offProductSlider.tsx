"use client";
import Image from "next/image";
import { useCallback, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import Button from "@/components/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const OffProductSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  const handleNext = () => {
    if (!swiper) return;
    swiper.slideNext();
  };
  const handlePrev = () => {
    if (!swiper) return;
    swiper.slidePrev();
  };

  const handleClickable = (index: number) => {
    if (!swiper) return;
    swiper.slideTo(index);
  };

  return (
    <div className="flex h-full items-center gap-x-8">
      <Button
        disabled={swiper?.realIndex === 0}
        className="group rounded-full p-1 shadow-[0_0_10px_0_#ccc] hover:bg-black disabled:opacity-25 disabled:hover:bg-white"
        onClick={handlePrev}
      >
        <ChevronRight className="group-hover:text-white disabled:group-hover:text-black" />
      </Button>
      <Swiper
        slidesPerView={1}
        onSwiper={setSwiper}
        className="h-full"
        spaceBetween={30}
        pagination={{
          clickable: true,
          el: ".custom-pagination",
          type: "bullets",
          renderBullet: (index: number, className: string) =>
            `<span class="${className}"></span>`,
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <SwiperSlide key={i}>
            <Link href={"#"} className="h-full">
              <div className="flex h-3/5 flex-col items-center justify-center gap-x-4 sm:flex-row">
                <Image
                  src={"/asus-vivobook15-x509-1287x800-1567590182 5.svg"}
                  alt=""
                  width={200}
                  height={130}
                  className="sm:-rotate-[30deg]"
                />
                <p>لپ تاپ 14 اینچ دل inspiron 5410 گرافیک اینتل</p>
              </div>
              <div className="flex flex-col items-end gap-y-4">
                <p className="flex flex-row-reverse gap-x-2 text-description-100">
                  <span className="line-through">17,560,000 تومان</span>
                  <span className="sty rounded-lg bg-[#FF5E5E] px-[3px] py-1 text-white">
                    25%
                  </span>
                </p>
                <p className="rounded-lg bg-right-3 px-6 py-1 text-white">
                  13,170,000 تومان
                </p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
        <div className="custom-pagination absolute bottom-0 left-1/2 z-20 flex -translate-x-1/2 gap-x-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <span
              onClick={() => handleClickable(index)}
              className={`h-3 cursor-pointer rounded-full ${index === activeIndex ? "w-7 bg-secondary-100" : "w-3 bg-gray-400"}`}
              key={index}
            ></span>
          ))}
        </div>
      </Swiper>
      <Button
        disabled={swiper?.realIndex === 4}
        onClick={handleNext}
        className="group rounded-full p-1 shadow-[0_0_10px_0_#ccc] hover:bg-black disabled:opacity-25 disabled:hover:bg-white"
      >
        <ChevronLeft className="group-hover:text-white disabled:group-hover:text-black" />
      </Button>
    </div>
  );
};

export default OffProductSlider;
