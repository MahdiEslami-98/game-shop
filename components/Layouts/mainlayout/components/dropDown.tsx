"use client";
// import { useState } from "react";

// const DropdownContainer = ({ text }: { text: string }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleDropdown = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div className="relative inline-block text-left">
//       <button
//         className="inline-flex w-full justify-center text-sm transition duration-150 ease-in-out focus:outline-none"
//         id="menu-button"
//         onClick={toggleDropdown}
//         aria-haspopup="true"
//       >
//         {text}
//         <svg
//           className="h-5 w-5"
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 20 20"
//           fill="currentColor"
//         >
//           <path
//             fillRule="evenodd"
//             d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
//             clipRule="evenodd"
//           />
//         </svg>
//       </button>
//       {isOpen && (
//         <div
//           className="absolute -right-[29027%] z-10 mt-2 w-full rounded-md bg-white text-right shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:w-[600px] lg:w-[900px] dark:bg-dark-boxColor"
//           role="menu"
//           aria-orientation="vertical"
//           aria-labelledby="menu-button"
//           tabIndex={-1}
//         >
//           <div className="py-1" role="none">
//             <a
//               href="#"
//               className="block px-4 py-2 text-sm text-textcolor-100 hover:bg-gray-100 hover:text-gray-900 dark:text-dark-textColor"
//               role="menuitem"
//               tabIndex={-1}
//               id="menu-item-0"
//             >
//               Menu item 1
//             </a>
//             <a
//               href="#"
//               className="block px-4 py-2 text-sm text-textcolor-100 hover:bg-gray-100 hover:text-gray-900 dark:text-dark-textColor"
//               role="menuitem"
//               tabIndex={-1}
//               id="menu-item-1"
//             >
//               Menu item 2
//             </a>
//             <a
//               href="#"
//               className="block px-4 py-2 text-sm text-textcolor-100 hover:bg-gray-100 hover:text-gray-900 dark:text-dark-textColor"
//               role="menuitem"
//               tabIndex={-1}
//               id="menu-item-2"
//             >
//               Menu item 3
//             </a>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DropdownContainer;

// import React, { useState } from "react";
// import { ChevronDown, ChevronRight } from 'lucide-react';

// const categories = [
//   { name: "Electronics", subcategories: ["Phones", "Laptops", "Tablets"] },
//   { name: "Clothing", subcategories: ["Men", "Women", "Kids"] },
//   { name: "Books", subcategories: ["Fiction", "Non-fiction", "Educational"] },
//   { name: "Home & Garden", subcategories: ["Furniture", "Decor", "Gardening"] },
// ];

// const DropdownMenu = ({ text }: { text: string }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState(categories[0]);

//   return (
//     <div className="relative">
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="flex w-full items-center justify-between px-4 py-2 text-left focus:outline-none"
//       >
//         {text}
//         {/* <ChevronDown className="w-5 h-5 ml-2 -mr-1" aria-hidden="true" /> */}
//         <svg
//           className="h-5 w-5"
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 20 20"
//           fill="currentColor"
//         >
//           <path
//             fillRule="evenodd"
//             d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
//             clipRule="evenodd"
//           />
//         </svg>
//       </button>

//       {isOpen && (
//         <div className="absolute z-10 mt-2 w-full origin-top-right rounded-md border border-gray-300 bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none md:w-[70%]">
//           <div className="flex flex-col md:flex-row">
//             <div className="w-full border-r border-gray-200 md:w-1/3">
//               {categories.map((category) => (
//                 <button
//                   key={category.name}
//                   className={`block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 ${
//                     selectedCategory.name === category.name ? "bg-gray-100" : ""
//                   }`}
//                   onClick={() => setSelectedCategory(category)}
//                 >
//                   <div className="flex items-center justify-between">
//                     {category.name}
//                     {/* <ChevronRight className="h-5 w-5" aria-hidden="true" /> */}
//                     &lsaquo;
//                   </div>
//                 </button>
//               ))}
//             </div>
//             <div className="w-full p-4 md:w-2/3">
//               <h3 className="mb-2 text-lg font-medium">
//                 {selectedCategory.name}
//               </h3>
//               <ul>
//                 {selectedCategory.subcategories.map((subcategory) => (
//                   <li key={subcategory} className="py-1">
//                     <p className="text-sm text-gray-700 hover:text-gray-900">
//                       {subcategory}
//                     </p>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DropdownMenu;

import React, { useState, useRef, useEffect } from "react";
// import { ChevronDown, ChevronRight } from "lucide-react";

const categories = [
  { name: "Electronics", subcategories: ["Phones", "Laptops", "Tablets"] },
  { name: "Clothing", subcategories: ["Men", "Women", "Kids"] },
  { name: "Books", subcategories: ["Fiction", "Non-fiction", "Educational"] },
  { name: "Home & Garden", subcategories: ["Furniture", "Decor", "Gardening"] },
];

const DropdownMenu = ({ text }: { text: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center">
        {text}
        {/* <ChevronDown className="ml-2 h-5 w-5" aria-hidden="true" /> */}
        &#8964;
      </button>

      {isOpen && (
        <div className="absolute -right-[250%] z-10 mt-2 rounded-md border border-gray-300 bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="flex w-[55vw] max-w-5xl">
            <div className="w-1/3 border-r border-gray-200">
              {categories.map((category) => (
                <button
                  key={category.name}
                  className={`block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 ${
                    selectedCategory.name === category.name ? "bg-gray-100" : ""
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  <div className="flex items-center justify-between">
                    {category.name}
                    &rsaquo;
                  </div>
                </button>
              ))}
            </div>
            <div className="w-2/3 p-4">
              <h3 className="mb-2 text-lg font-medium">
                {selectedCategory.name}
              </h3>
              <ul>
                {selectedCategory.subcategories.map((subcategory) => (
                  <li key={subcategory} className="py-1">
                    <a
                      href="#"
                      className="text-sm text-gray-700 hover:text-gray-900"
                    >
                      {subcategory}
                    </a>
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
