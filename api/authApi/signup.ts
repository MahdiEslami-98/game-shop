import { ISignupReq, ISignupRes } from "@/types/api/auth";
import apiRoutes from "../apiRoutes";
import axiosInstance from "../axiosInstance";
import { AxiosError, AxiosResponse } from "axios";

const signup = async (data: ISignupReq) => {
  try {
    const response = await axiosInstance.post(apiRoutes.auth.signup, data);
    return response as AxiosResponse<ISignupRes>;
  } catch (error) {
    throw error as AxiosError;
  }
};

export default signup;
