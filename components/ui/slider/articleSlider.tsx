"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Clock, Heart, MessageSquareText } from "lucide-react";

const ArticleSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [slidesPerView, setSlidesPerView] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1440) {
        setSlidesPerView(10 - 3);
      } else if (window.innerWidth >= 1280) {
        setSlidesPerView(10 - 2);
      } else if (window.innerWidth >= 680) {
        setSlidesPerView(10 - 1);
      } else {
        setSlidesPerView(10 - 0);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleClickable = (index: number) => {
    if (!swiper) return;
    swiper.slideTo(index);
  };

  return (
    <Swiper
      slidesPerView={1}
      watchOverflow
      className="h-full w-full"
      onSwiper={setSwiper}
      breakpoints={{
        680: { slidesPerView: 2, spaceBetween: 30 },
        1280: { slidesPerView: 3, spaceBetween: 30 },
        1440: { slidesPerView: 4, spaceBetween: 30 },
      }}
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
      {Array.from({ length: 10 }).map((_, index) => (
        <SwiperSlide key={index} className="flex justify-center">
          <div className="group mb-16 mt-4 w-full rounded-[32px] bg-white p-4 shadow-sm hover:shadow-[0_0_10px_0_#999] md:w-80 dark:bg-dark-boxColor">
            <div className="mb-4 overflow-hidden rounded-[32px]">
              <Image
                alt=""
                width={300}
                height={200}
                src={"/2023_0202_12573400.webp"}
                className="w-full object-cover group-hover:grayscale"
              />
            </div>
            <h4 className="mb-3 text-xl font-medium">
              بهترین کیس های اسمبل شده سال 2023 !
            </h4>
            <p className="pb-3 text-[#898989]">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
              استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در
              ستون و سطرآنچنان که لازم است .
            </p>
            <div className="flex items-center justify-between pt-4 text-[#898989]">
              <p className="flex items-center gap-x-2">
                <Clock className="h-4 w-4" /> 12 مرداد - 1402
              </p>
              <p className="flex items-center gap-x-2">
                <span className="flex items-center gap-x-2">
                  12 <MessageSquareText />
                </span>{" "}
                <span className="flex items-center gap-x-2">
                  23 <Heart />
                </span>
              </p>
            </div>
          </div>
        </SwiperSlide>
      ))}
      <div className="custom-pagination absolute bottom-0 left-1/2 z-20 flex -translate-x-1/2 gap-x-2">
        {Array.from({ length: slidesPerView }).map((_, index) => (
          <span
            onClick={() => handleClickable(index)}
            className={`h-3 cursor-pointer rounded-full ${index === activeIndex ? "w-7 bg-secondary-100" : "w-3 bg-gray-400"}`}
            key={index}
          ></span>
        ))}
      </div>
    </Swiper>
  );
};

export default ArticleSlider;
