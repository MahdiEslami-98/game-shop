import { AxiosError, AxiosResponse } from "axios";
import apiRoutes from "../apiRoutes";
import axiosInstance from "../axiosInstance";
import { IGetTokenRes } from "@/types/api/auth";

const refreshAccessToken = async (token: string = "") => {
  try {
    if (!token) {
      throw new Error("Refresh token not found");
    }
    const response: AxiosResponse<IGetTokenRes> = await axiosInstance.post(
      apiRoutes.auth.newAccessToken,
      {
        refreshToken: token,
      },
    );
    return response;
  } catch (error) {
    throw error as AxiosError;
  }
};

export default refreshAccessToken;
