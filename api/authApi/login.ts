import { AxiosError } from "axios";
import apiRoutes from "../apiRoutes";
import axiosInstance from "../axiosInstance";
import { ILoginData, ILoginRes } from "@/types/api/auth";

const login = async (data: { username: string; password: string }) => {
  try {
    const response = await axiosInstance.post<ILoginData, ILoginRes>(
      apiRoutes.auth.login,
      data,
    );
    return response;
  } catch (error) {
    return error as AxiosError;
  }
};

export default login;
