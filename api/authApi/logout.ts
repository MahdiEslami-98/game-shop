import { AxiosError } from "axios";
import apiRoutes from "../apiRoutes";
import axiosInstance from "../axiosInstance";
import Cookies from "js-cookie";

const logout = async () => {
  try {
    await axiosInstance.get(apiRoutes.auth.logout, {
      headers: {
        Authorization: `Bearer ${Cookies.get("access_token")}`,
      },
    });
  } catch (error) {
    throw error as AxiosError;
  }
};

export default logout;
