import Image from "next/image";
import Link from "next/link";
import React from "react";

const links = [
  {
    title: "دسته بندی",
    sublinks: [
      "محصولات ما",
      "کیس های اسمبل شده",
      "اسمبل آنلاین",
      "محصولات گیمینگ",
      "دسته دوم",
    ],
  },
  {
    title: "خدمات فروشگاه",
    sublinks: ["خرید اقساطی", "فروش سازمانی", "مجله گیمشاپ", "درباره ما"],
  },
  {
    title: "خدمات کاربران",
    sublinks: [
      "حساب کاربری",
      "سبد خرید",
      "شرایط و قوانین",
      "حفظ حریم خصوصی",
      "گارانتی محصولات",
    ],
  },
  {
    title: "راه‌های ارتباطی",
    sublinks: ["تماس با ما", "درباره ما", "سوالات متداول", "بازخورد مشتریان"],
    className: "md:hidden xl:block",
  },
];

const Footer = () => {
  return (
    <footer>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 border-y border-[#AFAFAF] px-9 md:grid-cols-3 lg:px-0 xl:grid-cols-4">
          {links.map((link) => (
            <div
              key={link.title}
              className={`py-8 lg:px-6 ${link.className ? link.className : ""}`}
            >
              <h3 className="mb-2 text-lg font-medium">{link.title}</h3>
              <ul>
                {link.sublinks.map((sublink) => (
                  <li key={sublink} className="py-1">
                    <p className="w-max cursor-pointer text-sm text-description-100 hover:text-textcolor-100 dark:hover:text-dark-textColor">
                      {sublink}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="container mx-auto grid grid-cols-2 gap-x-8 px-4 pb-14 pt-8 lg:px-9">
        <div className="flex flex-col gap-y-4">
          <Link href="/" className="text-3xl font-bold">
            <span className="text-primary-100">Game</span>
            <span className="text-secondary-100">Shop</span>
          </Link>
          <p className="text-xs text-textcolor-100 lg:text-sm dark:text-dark-textColor">
            ما در فروشگاه اینترنتی گیمشاپ سعی بر این داریم تا بتوانیم تمام
            محصولات سرگرمی و الکترونیکی کاربران مان را به بهترین نحو و در بهترین
            قیمت ، فراهم کنیم تا بتوانیم تمام نیاز های کاربرانمان را در سریع
            ترین حالت ممکن رفع کنیم وما در فروشگاه اینترنتی گیمشاپ سعی بر این
            داریم تا بتوانیم تمام محصولات سرگرمی و الکترونیکی کاربران مان را به
            بهترین نحو و در بهترین قیمت.....
          </p>
        </div>
        <div className="grid grid-cols-1 gap-y-2 md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:items-center">
          <div className="flex h-20 w-full items-center justify-center rounded-2xl border-2 border-white bg-white lg:h-full">
            <Image
              src={`/file_20191206_1550_36991 1.png`}
              alt=""
              width={60}
              height={60}
              className=""
            />
          </div>
          <div className="flex h-20 w-full items-center justify-center rounded-2xl border-2 border-white bg-white lg:h-full">
            <Image
              src={`/T1_1591355889268 1.png`}
              alt=""
              width={60}
              height={60}
              className=""
            />
          </div>
          <div className="flex h-20 w-full items-center justify-center rounded-2xl border-2 border-white bg-white lg:h-full">
            <Image
              src={`/z2 1.png`}
              alt=""
              width={60}
              height={60}
              className=""
            />
          </div>
        </div>
      </div>
      <div className="relative bg-primary-100 px-4 py-[10px] lg:px-9">
        <div className="container mx-auto text-center text-sm text-textcolor-100 lg:flex lg:items-center lg:justify-between lg:text-base">
          <p className="text-xs lg:text-base">
            تمامی حقوق مادی و معنوی این وبسایت برای گیمشاپ محفوظ می باشد
          </p>
          <div className="absolute -top-[32px] left-1/2 flex -translate-x-1/2 items-center justify-center gap-x-4 rounded-t-2xl bg-dark-bodyColor px-6 py-[6px] text-white lg:static lg:translate-x-0 lg:rounded-none lg:bg-primary-100 lg:px-0 lg:py-0 lg:text-textcolor-100 dark:bg-dark-boxColor dark:lg:bg-primary-100">
            <Image
              src={`/icons/bxl-instagram 1.svg`}
              className="invert lg:invert-0"
              alt=""
              width={20}
              height={20}
            />
            <Image
              src={`/icons/bxl-linkedin 1.svg`}
              className="invert lg:invert-0"
              alt=""
              width={20}
              height={20}
            />
            <Image
              src={`/icons/whatsup.svg`}
              alt=""
              width={20}
              height={20}
              className="invert lg:invert-0"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
