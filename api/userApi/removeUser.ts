import { AxiosError } from "axios";
import axiosInstance from "../axiosInstance";
import apiRoutes from "../apiRoutes";
import Cookies from "js-cookie";

const removeUser = async (id: string) => {
  try {
    const response = await axiosInstance.delete(apiRoutes.users + `/${id}`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
    });
    return response;
  } catch (error) {
    throw error as AxiosError;
  }
};

export default removeUser;
