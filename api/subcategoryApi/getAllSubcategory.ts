import { AxiosError, AxiosResponse } from "axios";
import apiRoutes from "../apiRoutes";
import axiosInstance from "../axiosInstance";
import { IAllSubCategoryRes } from "@/types/api/subcategory";

const getAllSubcategory = async (limit: number = 999, sort = "updatedAt") => {
  try {
    const response: AxiosResponse<IAllSubCategoryRes> = await axiosInstance.get(
      `${apiRoutes.subcategories}?limit=${limit}&sort=${sort}`,
    );
    return response;
  } catch (error) {
    throw error as AxiosError;
  }
};

export default getAllSubcategory;
