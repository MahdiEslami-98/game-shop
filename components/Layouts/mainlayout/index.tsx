"use client";
import React, { ReactNode, useContext } from "react";
import Header from "./header";
import Footer from "./footer";
import { ThemeContext } from "@/context/themeContext";

const MainLayout = ({ children }: { children: ReactNode }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={`${theme === "dark" ? "dark" : ""} bg-gradient-to-b from-[#FFF5F7] to-[#F5F9FF] text-textcolor-100 dark:from-dark-bodyColor dark:to-dark-bodyColor dark:text-dark-textColor`}
    >
      <div className="">
        <Header />
        <main className="container mx-auto px-4 pb-16 pt-5 lg:pb-32 lg:pt-9">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
