import getAllCategory from "@/api/categoryApi/getAllCategory";
import getAllSubcategory from "@/api/subcategoryApi/getAllSubcategory";
import MainLayout from "@/components/Layouts/mainlayout";
import { ICategory } from "@/types/api/category";
import { IAllSubCategoryRes } from "@/types/api/subcategory";
import { ReactNode } from "react";

const LandingLayout = ({ children }: { children: ReactNode }) => {
  return <MainLayout>{children}</MainLayout>;
};

export default LandingLayout;
