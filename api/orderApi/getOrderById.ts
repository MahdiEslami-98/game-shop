import { AxiosError, AxiosResponse } from "axios";
import apiRoutes from "../apiRoutes";
import axiosInstance from "../axiosInstance";
import Cookies from "js-cookie";
import { IGetOrderByIdRes } from "@/types/api/order";

const getOrderById = async (id: string) => {
  try {
    const response = await axiosInstance.get<IGetOrderByIdRes>(
      `${apiRoutes.orders}/${id}`,
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

export default getOrderById;
