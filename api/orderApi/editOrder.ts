import { AxiosError, AxiosResponse } from "axios";
import Cookies from "js-cookie";
import apiRoutes from "../apiRoutes";
import axiosInstance from "../axiosInstance";
import { IEditOrderReq, IEditOrderRes } from "@/types/api/order";
const editOrder = async (id: string, data: IEditOrderReq) => {
  try {
    const response = await axiosInstance.patch<IEditOrderReq, IEditOrderRes>(
      `${apiRoutes.orders}/${id}`,
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

export default editOrder;
