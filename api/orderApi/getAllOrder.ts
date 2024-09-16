import { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "../axiosInstance";
import apiRoutes from "../apiRoutes";
import Cookies from "js-cookie";
import { IOrders } from "@/types/api/order";

const getAllOrder = async (
  status = "",
  page = 1,
  sort = "-createdAt",
) => {
  let stat = "";
  if (status) {
    stat = `&deliveryStatus=${status}`;
  }
  try {
    const response = await axiosInstance.get<IOrders>(
      `${apiRoutes.orders}?limit=10&page=${page}&sort=${sort}${stat}`,
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

export default getAllOrder;
