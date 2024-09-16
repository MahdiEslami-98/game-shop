import { AxiosError } from "axios";
import apiRoutes from "../apiRoutes";
import axiosInstance from "../axiosInstance";
import Cookies from "js-cookie";
import { IGetTokenReq, IGetTokenRes } from "@/types/api/auth";

const refreshAccessToken = async () => {
  try {
    const token = Cookies.get("refreshToken");
    if (!token) throw new Error("Refresh Token not found");
    const response = await axiosInstance.post<IGetTokenReq, IGetTokenRes>(
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
