import { AxiosError } from "axios";
import apiRoutes from "../apiRoutes";
import axiosInstance from "../axiosInstance";

const removeSubcategory = async (id: string) => {
  try {
    const res = await axiosInstance.delete(`${apiRoutes.subcategories}/${id}`);
    return res;
  } catch (error) {
    throw error as AxiosError;
  }
};

export default removeSubcategory;
