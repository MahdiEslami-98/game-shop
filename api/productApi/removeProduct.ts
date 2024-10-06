import { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "../axiosInstance";
import apiRoutes from "../apiRoutes";
import { IDeleteProductRes } from "@/types/api/product";

const removeProduct = async (id: string) => {
  try {
    const res: AxiosResponse<IDeleteProductRes> = await axiosInstance.delete(
      `${apiRoutes.products}/${id}`,
    );
    return res;
  } catch (error) {
    throw error as AxiosError;
  }
};

export default removeProduct;
