import { AxiosError } from "axios";
import axiosInstance from "../axiosInstance";
import apiRoutes from "../apiRoutes";
import { IProductByIdRes } from "@/types/api/product";

const getProductById = async (id: string) => {
  try {
    const res = await axiosInstance.get<IProductByIdRes>(
      `${apiRoutes.products}/${id}`,
    );
    return res;
  } catch (error) {
    throw error as AxiosError;
  }
};

export default getProductById;
