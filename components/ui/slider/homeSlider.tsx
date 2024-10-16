"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/a11y";
import { useState } from "react";

const imageSrc = [
  "/poster/Cases slider pc v1 copy-1600x400.jpg",
  "/poster/CPU cooler slider pc v1 copy-1600x400.jpg",
  "/poster/Monitors slider pc v1 copy-1600x400.jpg",
  "/poster/RAM slider pc v1 copy-1600x400.jpg",
  "/poster/razer slider pc v1 copy-1600x400.jpg",
  "/poster/laptop slider pc v1 copy-1600x400.jpg",
];

const HomeSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const handleClickable = (index: number) => {
    if (!swiper) return;
    swiper.slideTo(index);
  };
  return (
    <Swiper
      modules={[Autoplay]}
      slidesPerView={1}
      onSwiper={setSwiper}
      pagination={{
        clickable: true,
        el: ".custom-pagination",
        type: "bullets",
        renderBullet: (index: number, className: string) =>
          `<span class="${className}"></span>`,
      }}
      loop
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
    >
      {imageSrc.map((item, index) => (
        <SwiperSlide key={index + 1}>
          <Image
            src={item}
            alt="slider item"
            width={1990}
            height={400}
            quality={100}
            className="h-36 w-full sm:h-auto"
            priority
          />
        </SwiperSlide>
      ))}
      <div className="custom-pagination absolute bottom-3 left-1/2 z-40 flex -translate-x-1/2 gap-x-2">
        {imageSrc.map((_: string, index: number) => (
          <span
            onClick={() => handleClickable(index)}
            className={`h-2 cursor-pointer rounded-full sm:h-3 ${index === activeIndex ? "w-5 bg-secondary-100 sm:w-7" : "w-2 bg-gray-400 sm:w-3"}`}
            key={index}
          ></span>
        ))}
      </div>
    </Swiper>
  );
};

export default HomeSlider;
