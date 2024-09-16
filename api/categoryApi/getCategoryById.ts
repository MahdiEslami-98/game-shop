import { AxiosError } from "axios";
import axiosInstance from "../axiosInstance";
import apiRoutes from "../apiRoutes";
import Cookies from "js-cookie";
import { ICategoryByIdRes } from "@/types/api/category";

const getCategoryById = async (id: string) => {
  try {
    const response = await axiosInstance.get<ICategoryByIdRes>(
      `${apiRoutes.categories}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      },
    );
    return response;
  } catch (error) {
    throw error as AxiosError;
  }
};

export default getCategoryById;
