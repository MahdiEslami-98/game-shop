"use client";
import getAllSubcategory from "@/api/subcategoryApi/getAllSubcategory";
import { useQuery } from "@tanstack/react-query";
import CategorySlider from "./categorySlider";

const CategoriesSlider = () => {
  const { data, isSuccess } = useQuery({
    queryKey: ["subcategories"],
    queryFn: () => getAllSubcategory(6),
  });
  return (
    <>
      {isSuccess &&
        data?.data.data.subcategories.map((category, index) => (
          <CategorySlider key={category._id} data={category} index={index} />
        ))}
    </>
  );
};

export default CategoriesSlider;
