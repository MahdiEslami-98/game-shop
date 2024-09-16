import {
  IEditPriceAndQuantityRes,
  IEditProductPriceAndQuantityData,
} from "@/types/api/product";
import { AxiosError } from "axios";
import axiosInstance from "../axiosInstance";
import apiRoutes from "../apiRoutes";
import Cookies from "js-cookie";

const editProductPriceAndQuantity = async (
  date: IEditProductPriceAndQuantityData[],
) => {
  try {
    const response = await Promise.all(
      date.map(async (item) => {
        const myForm = new FormData();
        if (item.price) {
          myForm.append("price", item.price);
        }
        if (item.quantity) {
          myForm.append("quantity", item.quantity);
        }
        const res = await axiosInstance.patch<IEditPriceAndQuantityRes>(
          `${apiRoutes.products}/${item.id}`,
          myForm,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("accessToken")}`,
            },
          },
        );
        return res;
      }),
    );
    return response;
  } catch (error) {
    throw error as AxiosError;
  }
};

export default editProductPriceAndQuantity;
