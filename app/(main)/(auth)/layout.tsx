import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col-reverse items-center justify-between rounded-[40px] border-2 border-white bg-white p-6 lg:flex-row xl:mx-32 dark:bg-dark-boxColor">
      {children}
    </div>
  );
};

export default AuthLayout;
