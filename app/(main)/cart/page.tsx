"use client";
import apiRoutes from "@/api/apiRoutes";
import Button from "@/components/Button";
import { useCart, useCartActions } from "@/store/cart-store";
import {
  Minus,
  Plus,
  ReceiptText,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  Truck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const CartPage = () => {
  const [tabIndex, setTabIndex] = useState(1);
  const cart = useCart();
  const { sumMoneyCart, removeFromCart, incrementQuantity, decrementQuantity } =
    useCartActions();
  return (
    <div className="rounded-[32px] bg-white p-8 dark:bg-dark-boxColor">
      <div className="mb-4 flex items-center gap-12 border-b-2">
        <Button
          className={`relative flex items-center overflow-hidden pb-4 ${tabIndex === 1 ? "tab-selected" : ""}`}
          onClick={() => setTabIndex(1)}
        >
          سبد خرید
          <ShoppingBag />
        </Button>
        <Button
          className={`relative flex items-center overflow-hidden pb-4 ${tabIndex === 2 ? "tab-selected" : ""}`}
          onClick={() => setTabIndex(2)}
        >
          لیست سفارشات
          <ReceiptText />
        </Button>
      </div>

      {tabIndex === 1 && (
        <div className="flex flex-col gap-5 lg:flex-row">
          <div className="flex w-full flex-col gap-5 lg:w-[55%] xl:w-[65%]">
            {cart.length < 1 && (
              <div className="flex flex-col items-center justify-center gap-4 p-4">
                <Image
                  src={`/emptyCart.svg`}
                  alt="empty-cart"
                  width={320}
                  height={320}
                />
                <p className="text-2xl">سبد خرید شما خالی است</p>
                <p className="text-description-100">
                  در گیمشاپ کلی محصولات جذاب هست که بخوای ببینی !
                </p>
              </div>
            )}
            {cart.length > 0 &&
              cart.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col rounded-3xl border p-4"
                >
                  <div className="flex gap-3">
                    <div className="flex w-full items-center justify-start gap-3">
                      <Image
                        src={`${apiRoutes.productThumb}${item.thumbnail}`}
                        alt={item.name}
                        width={110}
                        height={110}
                        className="rounded-3xl"
                      />
                      <div>
                        <Link
                          href={`/products/${item._id}`}
                          className="block max-w-[600px] overflow-hidden text-ellipsis whitespace-nowrap text-lg font-semibold"
                        >
                          {item.name}
                        </Link>
                        <p className="flex items-center gap-1 text-description-100">
                          <ShieldCheck className="h-4 w-4" />
                          ضمانت اصالت و سلامت فیزیکی
                        </p>
                        <p className="flex items-center gap-1 text-description-100">
                          <Truck className="h-4 w-4" /> ارسال سریع و رایگان
                        </p>
                      </div>
                    </div>
                    <div className="flex w-[75px] flex-col items-end justify-between">
                      <Button
                        className="rounded-[10px] border border-black bg-alarm-100 p-[6px] shadow-[-3px_4px_0_0_#000]"
                        onClick={() => removeFromCart(item._id)}
                      >
                        <Trash2 className="h-5 w-5 text-white" />
                      </Button>
                      <div className="flex items-center gap-3 rounded-lg border border-black bg-[#98AFFF] p-0.5 px-2 shadow-[-3px_4px_0_0_#000]">
                        <Button onClick={() => incrementQuantity(item._id)}>
                          <Plus className="h-4 w-4" />
                        </Button>
                        <span>{item.cartQuantity}</span>
                        <Button onClick={() => decrementQuantity(item._id)}>
                          <Minus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 inline-block self-end rounded-lg border border-black bg-secondary-100 px-4 py-1 text-white shadow-[-3px_4px_0_0_#000]">
                    {item.price} تومان
                  </div>
                </div>
              ))}
          </div>
          <div className="w-full lg:w-[40%] xl:w-[30%]">
            <div className="mb-5 rounded-[20px] border px-3 py-4">
              <div className="mb-3 border-b">
                <div className="mb-6 flex items-center justify-between">
                  <p className="text-description-100">مبلغ سفارش</p>
                  <p>{sumMoneyCart()}</p>
                </div>
                <div className="mb-6 flex items-center justify-between">
                  <p className="text-description-100">هزینه ارسال</p>
                  <p>{sumMoneyCart() < 1 ? 0 : 100000} تومان</p>
                </div>
                <div className="mb-6 flex items-center justify-between text-alarm-100">
                  <p>مبلغ قابل پرداخت</p>
                  <p>
                    {sumMoneyCart() < 1
                      ? sumMoneyCart()
                      : sumMoneyCart() + 100000}{" "}
                    تومان
                  </p>
                </div>
              </div>
              <Link href={"/checkout"}>
                <Button className="w-full rounded-xl border border-black bg-primary-100 py-3 shadow-[3px_4px_0_0_#15121D]">
                  تکمیل سفارش
                </Button>
              </Link>
            </div>
            <Link className="flex justify-center px-3" href={"/"}>
              <Button className="w-full rounded-xl border border-black bg-primary-100 py-3 shadow-[3px_4px_0_0_#15121D]">
                افزودن محصول
              </Button>
            </Link>
          </div>
        </div>
      )}

      {tabIndex === 2 && (
        <div className="flex flex-col items-center justify-center gap-6">
          <Image src={`/STOP.svg`} alt="stop" width={600} height={600} />
          <p className="text-3xl font-bold text-primary-100">
            این صفحه در دست احداث میباشد
          </p>
          <Link className="font-semibold text-secondary-100" href="/">
            بازگشت به صفحه اصلی
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;
