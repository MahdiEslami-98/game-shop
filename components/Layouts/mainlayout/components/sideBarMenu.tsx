"use client";
import Button from "@/components/Button";
import Image from "next/image";
import { useState } from "react";
import { navItems, topOfHeader } from "../header";
import Link from "next/link";
import { X } from "lucide-react";

const SideBarMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button
        className="rounded-full border border-black p-2 opacity-70 transition-all duration-200 hover:scale-110 hover:opacity-100 lg:hidden dark:border-dark-textColor dark:opacity-100 dark:hover:opacity-60"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Image
          className="dark:invert"
          alt="menu"
          src={"/icons/dashicons_menu-alt.svg"}
          width={20}
          height={20}
        />
      </Button>
      <div
        className={`${isOpen ? "" : "hidden"} fixed bottom-0 left-0 right-0 top-0 z-30 bg-black/5 transition-all duration-300 lg:hidden dark:bg-black/30`}
        onClick={() => setIsOpen(false)}
      />
      <div
        className={`blur-filter fixed bottom-0 top-0 z-40 w-80 lg:hidden dark:bg-dark-bodyColor/60 ${isOpen ? "right-0" : "-right-full"} border-l px-4 py-6 transition-all duration-300`}
      >
        <Button
          onClick={() => setIsOpen(false)}
          className="absolute left-6 top-6 text-2xl text-description-75 hover:text-textcolor-75 dark:text-dark-descriptionAndDeact dark:hover:text-dark-textColor"
        >
          <X />
        </Button>
        <Link className="pr-8 text-3xl font-bold" href={"/"}>
          <span className="text-primary-100">Game</span>{" "}
          <span className="text-secondary-100">Shop</span>
        </Link>
        <ul className="flex flex-col pt-6">
          <li></li>
          {navItems.map((item, i) => (
            <li key={i} className="border-b py-3 last:border-none">
              <Link href={"#"}>{item}</Link>
            </li>
          ))}
          {topOfHeader.map((item, i) => (
            <li key={i} className="border-b py-3 last:border-none">
              <Link href={"#"}>{item}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default SideBarMenu;