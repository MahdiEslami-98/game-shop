import apiRoutes from "@/api/apiRoutes";
import Image from "next/image";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, FreeMode } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/thumbs";
import "swiper/css/free-mode";

const ProductImageSlider = ({ images }: { images: string[] }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  return (
    <>
      <Swiper
        className="mySwiper2 mb-3"
        spaceBetween={10}
        modules={[FreeMode, Thumbs]}
        thumbs={{ swiper: thumbsSwiper }}
      >
        {images.map((image, i) => (
          <SwiperSlide key={i}>
            <Image
              width={600}
              height={600}
              src={`${apiRoutes.productImg}${image}`}
              alt=""
              className="rounded-2xl"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        className="mySwiper"
        onSwiper={setThumbsSwiper}
        freeMode
        modules={[FreeMode]}
        spaceBetween={10}
        slidesPerView={4}
        watchSlidesProgress
      >
        {images.map((image, i) => (
          <SwiperSlide key={i}>
            <Image
              src={`${apiRoutes.productImg}${image}`}
              width={150}
              height={100}
              alt=""
              className="rounded-2xl"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ProductImageSlider;
