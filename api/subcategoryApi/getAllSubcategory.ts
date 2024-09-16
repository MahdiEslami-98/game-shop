import { AxiosError } from "axios";
import apiRoutes from "../apiRoutes";
import axiosInstance from "../axiosInstance";

const getAllSubcategory = async () => {
  try {
    const response = await axiosInstance.get(apiRoutes.subcategories);
    return response;
  } catch (error) {
    throw error as AxiosError;
  }
};

export default getAllSubcategory;
