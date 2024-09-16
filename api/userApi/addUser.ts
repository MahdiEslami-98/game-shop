import { AxiosError } from "axios";
import axiosInstance from "../axiosInstance";
import apiRoutes from "../apiRoutes";
import Cookies from "js-cookie";

const addUser = async (data: any) => {
  try {
    const response = await axiosInstance.post(apiRoutes.users, data, {
      headers: {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
    });
    return response;
  } catch (error) {
    throw error as AxiosError;
  }
};

export default addUser;
