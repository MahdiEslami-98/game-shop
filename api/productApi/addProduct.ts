import { AxiosError } from "axios";
import axiosInstance from "../axiosInstance";
import apiRoutes from "../apiRoutes";
import Cookies from "js-cookie";
import { IAddProduct } from "@/types/api/product";

const addProduct = async (data: FormData) => {
  try {
    const res = await axiosInstance.post<FormData, IAddProduct>(
      apiRoutes.products,
      data,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      },
    );

    return res;
  } catch (error) {
    throw error as AxiosError;
  }
};

export default addProduct;
