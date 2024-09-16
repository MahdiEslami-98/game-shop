import { AxiosError } from "axios";
import axiosInstance from "../axiosInstance";
import apiRoutes from "../apiRoutes";
import Cookies from "js-cookie";

const editUser = async (id: string, data: any) => {
  try {
    const response = await axiosInstance.patch(
      apiRoutes.users + `/${id}`,
      data,
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

export default editUser;
