import React, { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div>AuthLayout</div>
      <div>{children}</div>
    </>
  );
};

export default AuthLayout;
