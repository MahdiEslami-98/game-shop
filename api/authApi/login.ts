import { AxiosError, AxiosResponse } from "axios";
import apiRoutes from "../apiRoutes";
import axiosInstance from "../axiosInstance";
import { ILoginRes } from "@/types/api/auth";

const login = async (data: { username: string; password: string }) => {
  try {
    const response = await axiosInstance.post(apiRoutes.auth.login, data);
    return response as AxiosResponse<ILoginRes>;
  } catch (error) {
    throw error as AxiosError;
  }
};

export default login;
