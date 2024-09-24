import MainLayout from "@/components/Layouts/mainlayout";
import { ReactNode } from "react";

const LandingLayout = ({ children }: { children: ReactNode }) => {
  return <MainLayout>{children}</MainLayout>;
};

export default LandingLayout;
