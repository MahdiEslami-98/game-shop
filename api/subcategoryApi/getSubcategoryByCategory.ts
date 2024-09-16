import { IAllSubCategoryRes } from "@/types/api/subcategory";
import apiRoutes from "../apiRoutes";
import axiosInstance from "../axiosInstance";
import { AxiosError } from "axios";

const getSubcategoryByCategory = async (id: string) => {
  try {
    const res = await axiosInstance.get<IAllSubCategoryRes>(
      `${apiRoutes.subcategories}?category=${id}`,
    );

    return res;
  } catch (error) {
    throw error as AxiosError;
  }
};

export default getSubcategoryByCategory;
