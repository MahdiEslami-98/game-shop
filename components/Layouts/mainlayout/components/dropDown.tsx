"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronLeft } from "lucide-react";
import Image from "next/image";
import { ICategory } from "@/types/api/category";
import { IAllSubCategoryRes, ISubcategory } from "@/types/api/subcategory";
import Link from "next/link";

const DropdownMenu = ({
  text,
  categories,
  subcategories,
}: {
  text: string;
  categories: ICategory;
  subcategories: IAllSubCategoryRes;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subs, setSubs] = useState<ISubcategory[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedCategory(categories.data.categories[0]._id);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as HTMLElement)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const mainSubs = subcategories.data.subcategories.filter(
      (sub) => sub._id === selectedCategory,
    );

    setSubs(mainSubs);
  }, [selectedCategory]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center">
        {text}
        <ChevronDown
          className={`ml-2 h-5 w-5 transition-transform duration-100 ${isOpen ? "rotate-90" : ""}`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div className="absolute -right-[250%] z-10 mt-2 overflow-hidden rounded-[32px] border border-gray-300 bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-dark-boxColor">
          <div className="flex h-[400px] w-[60vw] max-w-5xl">
            <div className="relative w-1/3 border-r border-gray-200 pt-6">
              <Image
                src={"/VR-Metaverse (8) 1.png"}
                alt="image"
                width={150}
                height={150}
                className="absolute bottom-0 right-28 translate-x-1/2"
              />
              {categories.data.categories.map((category) => (
                <button
                  key={category.name}
                  className={`block w-full px-4 py-2 text-left text-sm hover:bg-gray-100/10 ${
                    selectedCategory === category._id ? "bg-gray-100/20" : ""
                  }`}
                  onClick={() => setSelectedCategory(category._id)}
                >
                  <div className="flex items-center justify-between">
                    {category.name}
                    <ChevronLeft />
                  </div>
                </button>
              ))}
            </div>
            <div className="relative w-2/3 pr-4 pt-4">
              <Image
                src={"/Group 3728.png"}
                alt="image"
                width={250}
                height={250}
                className="absolute -bottom-[30px] -left-[22px]"
              />
              <ul>
                {subs.map((subcategory) => (
                  <li key={subcategory._id} className="py-1">
                    <Link
                      href="#"
                      className="text-sm text-gray-700 hover:text-dark-textColor/60 hover:text-gray-900 dark:text-dark-textColor"
                    >
                      {subcategory.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
