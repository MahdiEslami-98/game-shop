import { AxiosError } from "axios";
import apiRoutes from "../apiRoutes";
import axiosInstance from "../axiosInstance";
import Cookies from "js-cookie";

const addSubcategory = async (data: { name: string; category: string }) => {
  try {
    const res = await axiosInstance.post(apiRoutes.subcategories, data, {
      headers: {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
    });
  } catch (error) {
    throw error as AxiosError;
  }
};

export default addSubcategory;
