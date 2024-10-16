import { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "../axiosInstance";
import apiRoutes from "../apiRoutes";
import { IProductsRes } from "@/types/api/product";

const getAllProducts = async (
  page = 1,
  sort = "",
  category = "",
  subcategory = "",
  limit = 10,
) => {
  let c = "";
  let s = "";
  if (category) {
    c = "&category=" + category;
  }

  if (subcategory) {
    s = "&subcategory=" + subcategory;
  }

  try {
    const response: AxiosResponse<IProductsRes> = await axiosInstance.get(
      `${apiRoutes.products}?page=${page}&limit=${limit}&sort=${sort}${c}${s}`,
    );
    return response;
  } catch (error) {
    throw error as AxiosError;
  }
};
export default getAllProducts;
