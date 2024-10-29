"use client";
import getProductById from "@/api/productApi/getProductById";
import Button from "@/components/Button";
import ArticleSlider from "@/components/ui/slider/articleSlider";
import ProductImageSlider from "@/components/ui/slider/productImage";
import SameProductSlider from "@/components/ui/slider/sameProductslider";
import { useCart, useCartActions } from "@/store/cart-store";
import numberTo3Digit from "@/util/numberTo3Digit";
import { useQuery } from "@tanstack/react-query";
import {
  ChevronDown,
  ChevronLeft,
  Sparkle,
  Star,
  StarHalf,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const tabs = ["بررسی تخصصی", "مشخصات", "دیدگاه‌ها", "پرسش‌ها"];
const details = [
  {
    id: 1,
    title: "وزن",
    description: "1650 گرم",
  },
  {
    id: 2,
    title: "حافظه",
    description: "8 گیگابایت",
  },
  {
    id: 3,
    title: "رنگ",
    description: "سفید",
  },
  {
    id: 4,
    title: "محصول کشور",
    description: "چین",
  },
  {
    id: 5,
    title: "مدل",
    description: "Xbox",
  },
  {
    id: 6,
    title: "سال ساخت",
    description: "2022",
  },
];

const scores = [
  {
    id: 1,
    score: "4.5",
    description: "کیفیت",
  },
  {
    id: 2,
    score: "4.1",
    description: "طراحی و زیبایی",
  },
  {
    id: 3,
    score: "3.9",
    description: "امکانات و قابلیت‌ها",
  },
  {
    id: 4,
    score: "4.2",
    description: "کیفیت ساخت",
  },
  {
    id: 5,
    score: "4.0",
    description: "ارزش خرید در برابر قیمت",
  },
];

const ProductPage = ({ params }: { params: { id: string } }) => {
  const [tab, setTab] = useState(0);
  const [showMore1, setShowMore1] = useState(false);
  const cart = useCart();
  const { addToCart, removeFromCart } = useCartActions();
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["product", params.id],
    queryFn: () => getProductById(params.id),
  });

  const findMain = (id: string) => {
    return cart.find((item) => item._id === id);
  };

  return (
    <>
      {isLoading && <div>loading</div>}
      {isSuccess && (
        <div className="rounded-[40px] bg-white p-6 dark:bg-dark-boxColor">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
            <div
              dir="ltr"
              className="mb-8 rounded-[32px] border px-6 py-4 lg:col-span-2"
            >
              <ProductImageSlider images={data.data.data.product.images} />
            </div>
            <div className="lg:col-span-3">
              <h2 className="pt-4 text-2xl">{data.data.data.product.name}</h2>
              <div className="flex items-center gap-x-2 pt-4">
                <span className="text-nowrap text-xs text-description-75">
                  Full Product Model Name In English
                </span>
                <span className="inline-block h-px w-full bg-description-75"></span>
              </div>
              <div className="flex items-center gap-x-2 pt-4">
                <span className="flex items-center text-xs">
                  <Star className="size-4 fill-yellow-400 text-yellow-400" />
                  3.5
                </span>
                <Link
                  onClick={() => setTab(2)}
                  href={"#tabs"}
                  className="border-r pr-2 text-xs text-secondary-50"
                >
                  دیدگاه‌ها
                </Link>
                <Link
                  onClick={() => setTab(3)}
                  href={"#tabs"}
                  className="border-r pr-2 text-xs text-secondary-50"
                >
                  پرسش‌ها
                </Link>
              </div>
              <div className="mt-12 flex flex-col rounded-xl border p-4">
                <div className="flex items-center gap-x-6">
                  <p className="text-lg font-medium">قیمت :</p>
                  <p className="text-lg font-medium">
                    {numberTo3Digit(data.data.data.product.price)}
                  </p>
                </div>
                <div className="flex flex-row-reverse items-center gap-x-6">
                  <Button className="rounded-xl border border-black bg-secondary-100 px-4 py-2 text-white shadow-[3px_4px_0_0_#000]">
                    خرید اقساطی
                  </Button>
                  <Button
                    onClick={() => {
                      if (findMain(data.data.data.product._id)) {
                        removeFromCart(data.data.data.product._id);
                      } else {
                        addToCart(data.data.data.product, 1);
                      }
                    }}
                    className={`rounded-xl border border-black px-4 py-2 text-white shadow-[3px_4px_0_0_#000] ${findMain(data.data.data.product._id) ? "bg-alarm-100" : "bg-primary-100"}`}
                  >
                    {findMain(data.data.data.product._id)
                      ? "حذف از سبد"
                      : "افزودن به سبد"}
                  </Button>
                </div>
              </div>
              <div className="pt-10">
                <p className="pb-4 pt-6 text-lg font-medium">ویژگی‌ها</p>
                {details.slice(0, 4).map((detail, i) => (
                  <div className="flex items-center gap-x-2" key={i}>
                    <span className="flex items-center gap-x-3 text-xs text-description-75">
                      <Sparkle className="size-4" /> {detail.title} :
                    </span>{" "}
                    <span>{detail.description}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="hidden gap-x-10 rounded-2xl border py-2 lg:grid lg:grid-cols-3 lg:justify-items-center xl:grid-cols-5">
            <div className="flex items-center gap-x-2">
              <Image
                alt=""
                src={"/icons/original-products.svg"}
                width={48}
                height={48}
                className="dark:invert"
              />{" "}
              <span>اصل بودن کالا</span>
            </div>
            <div className="flex items-center gap-x-2">
              <Image
                alt=""
                src={"/icons/days-return.svg"}
                width={48}
                height={48}
                className="dark:invert"
              />{" "}
              <span>هفت روز ضمانت برگشت کالا</span>
            </div>
            <div className="flex items-center gap-x-2">
              <Image
                alt=""
                src={"/icons/cash-on-delivery.svg"}
                width={48}
                height={48}
                className="dark:invert"
              />{" "}
              <span>امکان پرداخت در محل</span>
            </div>
            <div className="flex items-center gap-x-2">
              <Image
                alt=""
                src={"/icons/support.svg"}
                width={48}
                height={48}
                className="dark:invert"
              />{" "}
              <span>24 ساعته ، 7 روز هفته</span>
            </div>
            <div className="flex items-center gap-x-2">
              <Image
                alt=""
                src={"/icons/express-delivery.svg"}
                width={48}
                height={48}
                className="dark:invert"
              />{" "}
              <span>تحویل سریع</span>
            </div>
          </div>
          <div className="mt-8 rounded-2xl border px-6 py-4">
            <div className="mb-8 border-b pb-[13px]">
              <span className="relative px-2 after:absolute after:-bottom-3.5 after:left-0 after:h-0.5 after:w-full after:rounded-xl after:bg-secondary-100 after:content-['']">
                کالاهای مشابه
              </span>
            </div>
            <div>
              <SameProductSlider
                subCId={data?.data?.data?.product?.subcategory._id}
              />
            </div>
          </div>
          <div className="mt-8 rounded-2xl border px-6 py-4">
            <div
              id="tabs"
              className="no-scrollbar flex gap-x-4 overflow-x-auto border-b pb-[13px]"
            >
              {tabs.map((t, i) => (
                <span
                  onClick={() => setTab(i)}
                  key={i}
                  className={`cursor-pointer text-nowrap px-2 ${tab === i ? "relative text-secondary-100 after:absolute after:-bottom-3.5 after:left-0 after:h-0.5 after:w-full after:rounded-xl after:bg-secondary-100 after:content-['']" : ""}`}
                >
                  {t}
                </span>
              ))}
            </div>
            {tab === 0 && (
              <div className="pt-8">
                <h3 className="text-2xl font-bold">
                  قطعات گیمینگ تحسین‌برانگیز
                </h3>
                <p className="my-6">{data?.data?.data?.product?.description}</p>
                <Image
                  src={"/8d9L6TUjZC6ipwERotbxon-1920-80.jpg.webp"}
                  alt=""
                  width={1920}
                  height={1080}
                  className="rounded-2xl border"
                />
                <h3 className="pt-8 text-2xl font-bold">
                  کیفیت ساخت طلسم کننده
                </h3>
                <p className="my-6">
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                  استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و
                  مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی
                  تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای
                  کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و
                  آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم
                  افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص
                  طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این
                  صورت می توان امید داشت که تمام و دشواری موجود در ارائه
                  راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل
                  حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای
                  موجود طراحی اساسا مورد استفاده قرار گیرد.
                </p>
                <Image
                  alt=""
                  src={"/pm9bMfEbjetRyMtLHzpiyn-1200-80.jpg.webp"}
                  width={1920}
                  height={1080}
                  className="rounded-2xl border"
                />
                <h3 className="pt-8 text-2xl font-bold">فراتر از تصور</h3>
                <p className="my-6">
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                  استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و
                  مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی
                  تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای
                  کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و
                  آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم
                  افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص
                  طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این
                  صورت می توان امید داشت که تمام و دشواری موجود در ارائه
                  راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل
                  حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای
                  موجود طراحی اساسا مورد استفاده قرار گیرد.
                </p>
              </div>
            )}
            {tab === 1 && (
              <div className={`pt-12`}>
                <div
                  className={`overflow-hidden transition-all duration-400 ease-linear ${showMore1 ? "max-h-[500px]" : "max-h-60"}`}
                >
                  {data.data.data.product.name && (
                    <p className="pb-4">
                      <span className="inline-block w-36 text-description-100">
                        نام محصول:
                      </span>
                      <span className="inline-block min-w-40 rounded-md bg-description-50 px-2 py-1">
                        {data.data.data.product.name}
                      </span>
                    </p>
                  )}
                  {data.data.data.product.brand && (
                    <p className="pb-4">
                      <span className="inline-block w-36 text-description-100">
                        برند محصول:
                      </span>
                      <span className="inline-block min-w-40 rounded-md bg-description-50 px-2 py-1">
                        {data.data.data.product.brand}
                      </span>
                    </p>
                  )}
                  {details.map((detail) => (
                    <p key={detail.id} className="pb-4">
                      <span className="inline-block w-36 text-description-100">
                        {detail.title} :
                      </span>
                      <span className="inline-block min-w-40 rounded-md bg-description-50 px-2 py-1">
                        {detail.description}
                      </span>
                    </p>
                  ))}
                </div>
                <div className="flex flex-row-reverse">
                  <Button
                    onClick={() => setShowMore1(!showMore1)}
                    className="flex items-center rounded-lg bg-secondary-100 px-2 py-1 text-white"
                  >
                    {showMore1 ? "بستن" : "مشاهده بیشتر"}
                    <ChevronDown
                      className={`${showMore1 ? "rotate-180" : ""} transition-all duration-400`}
                    />
                  </Button>
                </div>
              </div>
            )}
            {tab === 2 && (
              <div className="grid grid-cols-1 pt-9 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <div className="rounded-3xl border p-4">
                  <p className="flex items-center gap-x-3 text-2xl">
                    <Star className="size-4 fill-yellow-400 text-yellow-400" />{" "}
                    4.5
                  </p>
                  <p className="flex items-center gap-x-1 pb-10 pt-0.5">
                    <Star className="size-4 fill-yellow-400 text-yellow-400" />
                    <Star className="size-4 fill-yellow-400 text-yellow-400" />
                    <Star className="size-4 fill-yellow-400 text-yellow-400" />
                    <Star className="size-4 fill-yellow-400 text-yellow-400" />
                    <StarHalf className="size-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-description-75">
                      از مجموع امتیازات
                    </span>
                  </p>
                  <div>
                    {scores.map((score) => (
                      <div className="mb-4" key={score.id}>
                        <span className="text-sm">{score.description}</span>
                        <div className="flex items-center gap-x-2">
                          <div className="h-2 w-full rounded-full bg-secondary-50">
                            <div
                              className={`h-2 rounded-full bg-secondary-100`}
                              style={{ width: `${+score.score * 20}%` }}
                            ></div>
                          </div>
                          <span className="inline-block w-6">
                            {score.score}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-span-2"></div>
              </div>
            )}
            {tab === 3 && <div>3</div>}
          </div>
          <div className="mt-8 rounded-2xl border px-6 py-4">
            <div className="mb-8 flex items-center justify-between border-b pb-2">
              <span className="relative px-2 text-sm after:absolute after:-bottom-3.5 after:left-0 after:h-0.5 after:w-full after:rounded-xl after:bg-secondary-100 after:content-[''] sm:text-base">
                اخبار و مقالات
              </span>
              <Link
                className="flex items-center gap-x-1 rounded-lg border border-black px-1 py-1 sm:gap-x-2 sm:px-2 dark:border-white"
                href={"#"}
              >
                مشاهده همه <ChevronLeft />
              </Link>
            </div>
            <div className="flex h-full">
              <ArticleSlider />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductPage;
