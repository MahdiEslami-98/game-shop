import Button from "@/components/Button";
import Input from "@/components/Input";
import ArticleSlider from "@/components/ui/slider/articleSlider";
import CategoriesSlider from "@/components/ui/slider/categoriesSlider";
import HomeSlider from "@/components/ui/slider/homeSlider";
import OffProductSlider from "@/components/ui/slider/offProductSlider";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const heroParts = [
  {
    title: "اسمبل آنلاین",
    description1: "",
    span: "اجزای کیس",
    description2: "خودت رو انتخاب کن",
    button: "همین الان اسمبل کن",
    image: "/case.svg",
    color: "secondary-100",
  },
  {
    title: "کیس های اسمبل شده",
    description1: "بهترین",
    span: "کیس های اسمبل شده",
    description2: " رو انتخاب کن !",
    button: "مشاهده محصولات",
    image: "/case2.svg",
    color: "primary-100",
  },
];

const whyUs = [
  {
    title: "تنوع در محصولات",
    icon: "/icons/Vector1.svg",
    color: "#FF98FB",
  },
  {
    title: "حمل و نقل رایگان",
    icon: "/icons/truck.svg",
    color: "#4E95FF",
  },
  {
    title: "گارانتی 3 ساله",
    icon: "/icons/Vector.svg",
    color: "#FFB370",
  },
  {
    title: "پشتیبانی 24 ساعته",
    icon: "/icons/Vector2.svg",
    color: "#FF5E5E",
  },
  {
    title: "قیمت مناسب",
    icon: "/icons/usd-circle.svg",
    color: "#FFC700",
  },
  {
    title: "تضمین اصالت کالا",
    icon: "/icons/star (1) 1.svg",
    color: "#9773FF",
  },
];

const brands = [
  "/Razer_Inc.-Logo 1.svg",
  "/samsung-logo-text-png-1 1.svg",
  "/Asus-Logo 1.svg",
  "/Porodo-Logo-Typo 1.svg",
  "/1280px-Cooler_Master_black_logo 1.svg",
];

const Home = () => {
  return (
    <>
      <HomeSlider />
      <div className="grid grid-cols-1 gap-x-[30px] gap-y-6 pt-[40px] sm:gap-y-10 lg:px-7 xl:grid-cols-2">
        <div className="flex flex-col gap-y-6 sm:gap-y-10">
          {heroParts.map((part, i) => (
            <div key={i} className="relative">
              <div className="flex flex-col items-start gap-y-6 rounded-2xl bg-white pb-5 pr-6 pt-10 sm:[clip-path:polygon(0_35%,100%_0,100%_100%,0_100%)] dark:bg-dark-boxColor">
                <p className={`text-sm text-${part.color}`}>
                  <span
                    className={`mr-1 inline-block h-1 w-1 rounded-full bg-${part.color}`}
                  ></span>
                  <span
                    className={`mr-1 inline-block h-1 w-5 rounded-2xl bg-${part.color}`}
                  ></span>{" "}
                  {part.title}
                </p>
                <p className="w-1/2 text-2xl font-bold">
                  {part.description1}{" "}
                  <span className={`text-${part.color}`}>{part.span}</span>{" "}
                  {part.description2}
                </p>
                <Link
                  href="#"
                  className={`flex items-center gap-x-2 rounded-lg bg-${part.color} px-2 py-1`}
                >
                  {part.button} <ChevronLeft />
                </Link>
              </div>
              <Image
                src={part.image}
                alt=""
                width={230}
                height={230}
                className="absolute left-0 top-1/2 h-[150px] w-[150px] -translate-y-1/2 sm:left-12 sm:h-auto sm:w-auto"
              />
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-y-4 rounded-2xl bg-white p-4 dark:bg-dark-boxColor">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-y-4">
              <p className="text-xs text-primary-100">
                <span className="mr-1 inline-block h-1 w-1 rounded-full bg-primary-100"></span>
                <span className="mr-1 inline-block h-1 w-5 rounded-2xl bg-primary-100"></span>{" "}
                خرید کن ولی ارزون تر !
              </p>
              <p className="text-lg font-bold md:text-2xl">
                تخفیف های ویژه گیمشاپ
              </p>
            </div>
            <Link
              href={"#"}
              className="flex items-center gap-x-2 rounded-lg border border-primary-100 px-2 py-1 text-xs text-primary-100 sm:text-sm lg:text-base"
            >
              مشاهده محصولات{" "}
              <ChevronLeft className="h-4 w-4 sm:h-auto sm:w-auto" />
            </Link>
          </div>
          <div className="h-80 pt-5 xl:h-full">
            <OffProductSlider />
          </div>
        </div>
      </div>
      <section className="flex flex-col-reverse gap-y-14 pt-14 lg:px-7">
        <CategoriesSlider />
      </section>
      <section className="pt-16 lg:px-7">
        <div className="flex items-center gap-x-8 pb-8">
          <p className="flex items-center text-nowrap text-3xl font-bold">
            <span className="ml-1 inline-block h-1 w-2 rounded-full bg-black dark:bg-white"></span>
            <span className="ml-3 inline-block h-1 w-5 rounded-2xl bg-black dark:bg-white"></span>
            اخبار و مقالات
          </p>
          <div className="h-0.5 w-full bg-description-50"></div>
          <Link
            href={"#"}
            className="flex items-center gap-x-2 text-nowrap rounded-lg border border-black px-2 py-1 dark:border-white"
          >
            مشاهده همه <ChevronLeft className="h-4 w-4" />
          </Link>
        </div>
        <div className="h-full">
          <ArticleSlider />
        </div>
      </section>
      <section className="pt-16 lg:-mb-16 lg:px-7">
        <div className="flex items-center justify-center">
          <p className="text-3xl font-bold">
            <span className="ml-1 inline-block h-1 w-1 rounded-full bg-primary-100"></span>
            <span className="ml-1 inline-block h-1 w-5 rounded-2xl bg-primary-100"></span>
            چرا ما رو باید <span className="text-primary-100">انتخاب</span> کنید
            ؟
          </p>
        </div>
        <div
          dir="ltr"
          className="grid grid-cols-3 justify-center justify-items-center gap-y-8 pt-10 lg:grid-cols-6"
        >
          {whyUs.map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-y-4">
              <div
                style={{ backgroundColor: item.color }}
                className={`flex h-[75px] w-[75px] items-center justify-center rounded-3xl text-white`}
              >
                <Image
                  src={item.icon}
                  alt=""
                  width={32}
                  height={32}
                  style={{ fill: "white" }}
                />
              </div>
              <p className="text-xs md:text-sm lg:text-base">{item.title}</p>
            </div>
          ))}
        </div>
        <div className="mt-24 -rotate-[5deg] rounded-[32px] bg-secondary-50 lg:-rotate-[3deg] xl:-rotate-2">
          <div className="rotate-[5deg] space-y-6 rounded-[32px] bg-secondary-100 py-10 lg:rotate-[3deg] xl:rotate-2">
            <p className="flex items-center justify-center text-lg font-bold text-white sm:text-2xl">
              <span className="ml-1 inline-block h-1 w-1 rounded-full bg-white"></span>
              <span className="ml-1 inline-block h-1 w-5 rounded-2xl bg-white"></span>
              فقط با ایمیل ، عضو خبرنامه ما شو !
            </p>
            <div className="mx-auto flex w-[90%] items-center justify-center rounded-2xl bg-white px-2 py-1 sm:w-1/2">
              <Input
                placeholder="ایمیل خود را وارد کنید"
                className="h-full w-full px-2 outline-none"
              />
              <Button className="rounded-2xl bg-secondary-100 p-2">
                <ChevronLeft className="text-white" />
              </Button>
            </div>
          </div>
        </div>
        <div
          dir="ltr"
          className="mt-20 grid grid-cols-2 items-center justify-center justify-items-center gap-y-8 sm:grid-cols-3 lg:grid-cols-5"
        >
          {brands.map((brand, i) => (
            <div className="" key={i}>
              <Image
                width={150}
                height={50}
                src={brand}
                alt=""
                className="max-h-20"
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
