import axiosInstance from "../axiosInstance";
import apiRoutes from "../apiRoutes";
import Cookies from "js-cookie";
import { AxiosError } from "axios";
import { IEditProductRes } from "@/types/api/product";

const editProduct = async (id: string, data: FormData) => {
  try {
    const res = await axiosInstance.patch<FormData, IEditProductRes>(
      `${apiRoutes.products}/${id}`,
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

export default editProduct;
