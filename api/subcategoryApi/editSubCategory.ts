import { AxiosError } from "axios";
import apiRoutes from "../apiRoutes";
import axiosInstance from "../axiosInstance";
import Cookies from "js-cookie";

const editSubCategory = async (
  id: string,
  data: { name: string; category: string },
) => {
  try {
    const res = await axiosInstance.patch(
      `${apiRoutes.subcategories}/${id}`,
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

export default editSubCategory;
