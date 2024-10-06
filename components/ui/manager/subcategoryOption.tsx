"use client";
import getSubcategoryByCategory from "@/api/subcategoryApi/getSubcategoryByCategory";
import { ISubcategory } from "@/types/api/subcategory";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const SubcategoryOption = ({ value }: { value: string }) => {
  const { data, isSuccess } = useQuery({
    queryKey: ["subCategoryOption", value],
    queryFn: () => getSubcategoryByCategory(value),
  });
  return (
    <>
      {isSuccess &&
        data.data.data &&
        data?.data?.data?.subcategories.map((sub: ISubcategory) => (
          <option key={sub._id} value={sub._id}>
            {sub.name}
          </option>
        ))}
    </>
  );
};

export default SubcategoryOption;
