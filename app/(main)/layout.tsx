import getAllCategory from "@/api/categoryApi/getAllCategory";
import getAllSubcategory from "@/api/subcategoryApi/getAllSubcategory";
import MainLayout from "@/components/Layouts/mainlayout";
import { ICategory } from "@/types/api/category";
import { IAllSubCategoryRes } from "@/types/api/subcategory";
import { ReactNode } from "react";

export const GetStaticProps = async () => {
  const categories = await getAllCategory();
  const subcategories = await getAllSubcategory();
  return {
    props: {
      categories,
      subcategories,
    },
    revalidate: 3600 * 24,
  };
};

const LandingLayout = ({
  children,
  categories,
  subcategories,
}: {
  children: ReactNode;
  categories: ICategory;
  subcategories: IAllSubCategoryRes;
}) => {
  return (
    <MainLayout categories={categories} subcategories={subcategories}>
      {children}
    </MainLayout>
  );
};

export default LandingLayout;
