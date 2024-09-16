import { AxiosError } from "axios";
import axiosInstance from "../axiosInstance";
import apiRoutes from "../apiRoutes";
import { IDeleteProductRes } from "@/types/api/product";

const removeProduct = async (id: string) => {
  try {
    const res = await axiosInstance.delete<IDeleteProductRes>(
      `${apiRoutes.products}/${id}`,
    );
    return res;
  } catch (error) {
    throw error as AxiosError;
  }
};

export default removeProduct;
