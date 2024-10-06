import { AxiosError, AxiosResponse } from "axios";
import apiRoutes from "../apiRoutes";
import axiosInstance from "../axiosInstance";
import Cookies from "js-cookie";
import { IUserByIdRes } from "@/types/api/user";

const getUserById = async (id: string) => {
  try {
    const response: AxiosResponse<IUserByIdRes> = await axiosInstance.get(
      apiRoutes.users + `/${id}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
      },
    );
    return response;
  } catch (error) {
    throw error as AxiosError;
  }
};

export default getUserById;
