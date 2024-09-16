import { AxiosError } from "axios";
import axiosInstance from "../axiosInstance";
import apiRoutes from "../apiRoutes";
import Cookies from "js-cookie";
import { ICategory } from "@/types/api/category";

const getAllCategory = async () => {
  try {
    const response = await axiosInstance.get<ICategory>(apiRoutes.categories, {
      headers: {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
    });
    return response;
  } catch (error) {
    throw error as AxiosError;
  }
};

export default getAllCategory;
