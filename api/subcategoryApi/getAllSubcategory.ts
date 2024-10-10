import { AxiosError, AxiosResponse } from "axios";
import apiRoutes from "../apiRoutes";
import axiosInstance from "../axiosInstance";
import { IAllSubCategoryRes } from "@/types/api/subcategory";

const getAllSubcategory = async () => {
  try {
    const response: AxiosResponse<IAllSubCategoryRes> = await axiosInstance.get(
      `${apiRoutes.subcategories}?limit=1000`,
    );
    return response.data;
  } catch (error) {
    throw error as AxiosError;
  }
};

export default getAllSubcategory;
