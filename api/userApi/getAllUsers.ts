import { AxiosError } from "axios";
import apiRoutes from "../apiRoutes";
import axiosInstance from "../axiosInstance";
import Cookies from "js-cookie";

const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get(apiRoutes.users, {
      headers: {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
    });
    return response;
  } catch (error) {
    throw error as AxiosError;
  }
};

export default getAllUsers;
