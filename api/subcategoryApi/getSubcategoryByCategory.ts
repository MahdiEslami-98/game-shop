import { IAllSubCategoryRes } from "@/types/api/subcategory";
import apiRoutes from "../apiRoutes";
import axiosInstance from "../axiosInstance";
import { AxiosError, AxiosResponse } from "axios";

const getSubcategoryByCategory = async (id: string) => {
  try {
    const res: AxiosResponse<IAllSubCategoryRes> = await axiosInstance.get(
      `${apiRoutes.subcategories}?category=${id}`,
    );

    return res;
  } catch (error) {
    throw error as AxiosError;
  }
};

export default getSubcategoryByCategory;
