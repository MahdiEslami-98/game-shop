"use client";
import apiRoutes from "@/api/apiRoutes";
import Button from "@/components/Button";
import { useCart, useCartActions } from "@/store/cart-store";
import { Minus, Plus, ShoppingBasket, Trash2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const CartBtn = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();
  const cart = useCart();
  const { sumMoneyCart, removeFromCart, incrementQuantity, decrementQuantity } =
    useCartActions();

  useEffect(() => {
    setIsOpen(false);
  }, [pathName]);
  return (
    <>
      <div className="relative">
        <Button
          className="rounded-full border border-black p-2 opacity-70 transition-all duration-200 hover:scale-110 hover:opacity-100 dark:border-dark-textColor dark:opacity-100 dark:hover:opacity-60"
          onClick={() => {
            if (pathName === "/cart") return;
            setIsOpen(!isOpen);
          }}
        >
          <Image
            className="dark:invert"
            width={17}
            height={17}
            alt=""
            src={`/icons/shopping-bag 1.svg`}
          />
        </Button>
        {cart.length > 0 && (
          <div className="absolute -bottom-1/4 left-1/2 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full bg-secondary-100 text-xs text-white">
            {cart.length}
          </div>
        )}
      </div>
      <div
        className={`${isOpen ? "fixed" : "hidden"} left-0 top-0 z-20 h-full w-full bg-[rgba(0,0,0,0.5)] transition-all duration-300`}
        onClick={() => setIsOpen(false)}
      />
      <div
        className={`edit-scroll fixed -left-[280px] top-0 z-30 w-[280px] rounded-br-[40px] bg-white px-4 pb-4 pt-[26px] transition-all duration-300 dark:bg-dark-boxColor ${isOpen ? "translate-x-[280px]" : ""}`}
      >
        <div className="flex items-center justify-between border-b pb-4">
          <h3>سبد خرید شما</h3>
          <Button
            onClick={() => setIsOpen(false)}
            className="rounded-full border border-alarm-100"
          >
            <X className="h-6 w-6 text-alarm-100" />
          </Button>
        </div>
        {cart.length < 1 && (
          <div className="flex flex-col items-center pb-9 pt-14">
            <ShoppingBasket className="h-20 w-20" />
            <p>سبد خرید شما خالی است</p>
          </div>
        )}
        {cart.length > 0 && (
          <div className="flex max-h-[300px] flex-col gap-4 overflow-y-auto py-4">
            {cart.map((item) => (
              <div
                className="flex gap-2 rounded-2xl bg-[#f5f5f5] p-2"
                key={item._id}
              >
                <Link
                  className="flex w-full pt-2 text-xs"
                  href={`/products/${item._id}`}
                >
                  <Image
                    src={`${apiRoutes.productThumb}${item.thumbnail}`}
                    alt={`${item.name}`}
                    width={50}
                    height={50}
                    className="ml-2"
                  />
                  <p className="line-clamp-2 h-10 w-[100px] overflow-hidden pt-2">
                    {item.name}
                  </p>
                </Link>
                <div className="flex w-16 flex-col items-start">
                  <Trash2
                    className="mb-1 ml-2 h-3 w-3 cursor-pointer self-end"
                    onClick={() => removeFromCart(item._id)}
                  />
                  <p className="text-sm text-secondary-100">{item.price}</p>
                  <div className="flex items-center gap-2 rounded-sm bg-black p-px text-white">
                    <Plus
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => incrementQuantity(item._id)}
                    />
                    <span className="text-xs">{item.cartQuantity}</span>
                    <Minus
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => decrementQuantity(item._id)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="flex items-center justify-between px-2 py-3 text-alarm-100">
          <p>قیمت نهایی</p>
          <p>{cart.length > 0 ? sumMoneyCart() : "0"}</p>
        </div>
        <Link href={"/cart"}>
          <Button className="w-full rounded-lg bg-[#27EE8E] py-[6px] shadow-[3px_4px_0_0_#15121D]">
            مشاهده سبد خرید
          </Button>
        </Link>
      </div>
    </>
  );
};

export default CartBtn;
