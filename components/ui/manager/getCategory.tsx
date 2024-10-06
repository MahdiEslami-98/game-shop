"use client";

import getCategoryById from "@/api/categoryApi/getCategoryById";
import { useQuery } from "@tanstack/react-query";

const GetCategory = ({ id }: { id: string }) => {
  const { data, isSuccess } = useQuery({
    queryKey: ["category", id],
    queryFn: () => getCategoryById(id),
  });
  return isSuccess && data && <span>{data?.data?.data?.category?.name}</span>;
};

export default GetCategory;
