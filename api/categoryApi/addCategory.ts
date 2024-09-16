import { AxiosError } from "axios";
import axiosInstance from "../axiosInstance";
import apiRoutes from "../apiRoutes";
import Cookies from "js-cookie";

const addCategory = async (data: FormData) => {
  try {
    const response = await axiosInstance.post(apiRoutes.categories, data, {
      headers: {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
    });

    return response;
  } catch (error) {
    throw error as AxiosError;
  }
};

export default addCategory;
