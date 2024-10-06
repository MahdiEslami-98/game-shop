import { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "../axiosInstance";
import apiRoutes from "../apiRoutes";
import Cookies from "js-cookie";
import { IAddProduct } from "@/types/api/product";

const addProduct = async (data: FormData) => {
  try {
    const res: AxiosResponse<IAddProduct> = await axiosInstance.post(
      apiRoutes.products,
      data,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
      },
    );

    return res;
  } catch (error) {
    throw error as AxiosError;
  }
};

export default addProduct;
