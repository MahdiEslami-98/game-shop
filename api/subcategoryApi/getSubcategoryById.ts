import { AxiosError } from "axios";
import apiRoutes from "../apiRoutes";
import axiosInstance from "../axiosInstance";

const getSubcategoryById = async (id: string) => {
  try {
    const res = await axiosInstance.get(`${apiRoutes.subcategories}/${id}`);
    return res;
  } catch (error) {
    throw error as AxiosError;
  }
};

export default getSubcategoryById;
