"use client";
import Link from "next/link";
import Button from "../Button";
import Image from "next/image";
import { ChevronUp, Star } from "lucide-react";
import apiRoutes from "@/api/apiRoutes";
import numberTo3Digit from "@/util/numberTo3Digit";
import { ProductsEntity } from "@/types/api/product";
import { useCart, useCartActions } from "@/store/cart-store";


const ProductCard = ({ product }: { product: ProductsEntity }) => {
    const cart = useCart();
  const { addToCart, removeFromCart } = useCartActions();
  return (
    <div
      className="group relative block h-[326px] w-[200px] rounded-3xl border-2 border-white bg-white p-4 hover:border-secondary-100 dark:border-dark-boxColor dark:bg-dark-boxColor"
    >
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
          <span>{numberTo3Digit(product.price)} تومان</span>
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
  );
};

export default ProductCard;
