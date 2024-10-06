"use client";
import getAllCategory from "@/api/categoryApi/getAllCategory";
import { ICategoryEntity } from "@/types/api/category";
import { useQuery } from "@tanstack/react-query";

const CategoryOption = () => {
  const { data, isSuccess } = useQuery({
    queryKey: ["categoryOption"],
    queryFn: () => getAllCategory(),
  });
  return (
    <>
      {isSuccess &&
        data &&
        data?.data?.data?.categories.map((cat: ICategoryEntity) => (
          <option key={cat._id} value={cat._id}>
            {cat.name}
          </option>
        ))}
    </>
  );
};

export default CategoryOption;
