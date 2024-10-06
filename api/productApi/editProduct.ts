import axiosInstance from "../axiosInstance";
import apiRoutes from "../apiRoutes";
import Cookies from "js-cookie";
import { AxiosError, AxiosResponse } from "axios";
import { IEditProductRes } from "@/types/api/product";

const editProduct = async (id: string, data: FormData) => {
  try {
    const res: AxiosResponse<IEditProductRes> = await axiosInstance.patch(
      `${apiRoutes.products}/${id}`,
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

export default editProduct;
