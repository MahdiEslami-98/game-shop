import axiosInstance from "../axiosInstance";
import apiRoutes from "../apiRoutes";
import Cookies from "js-cookie";
import { AxiosError } from "axios";

const removeOrder = async (id: string) => {
  try {
    const res = await axiosInstance.delete(`${apiRoutes.orders}/${id}`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("access_token")}`,
      },
    });
  } catch (error) {
    throw error as AxiosError;
  }
};

export default removeOrder;
