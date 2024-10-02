import { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full bg-gradient-to-r from-[#FFF5F7] to-[#F5F9FF]">
      <div className="container mx-auto px-4">{children}</div>
    </div>
  );
};

export default DashboardLayout;
