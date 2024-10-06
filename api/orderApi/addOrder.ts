import { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "../axiosInstance";
import apiRoutes from "../apiRoutes";
import Cookies from "js-cookie";
import { IAddOrderReq, IAddOrderRes } from "@/types/api/order";

const addOrder = async (data: IAddOrderReq) => {
  try {
    const response = await axiosInstance.post<IAddOrderReq, IAddOrderRes>(
      apiRoutes.orders,
      data,
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

export default addOrder;
