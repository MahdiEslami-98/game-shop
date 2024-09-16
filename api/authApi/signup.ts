import { ISignupReq, ISignupRes } from "@/types/api/auth";
import apiRoutes from "../apiRoutes";
import axiosInstance from "../axiosInstance";

const signup = async (data: { username: string; password: string }) => {
  try {
    const response = await axiosInstance.post<ISignupReq, ISignupRes>(
      apiRoutes.auth.signup,
      data,
    );
    return response;
  } catch (error) {
    return error;
  }
};

export default signup;
