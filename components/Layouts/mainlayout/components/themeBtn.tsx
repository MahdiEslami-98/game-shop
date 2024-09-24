"use client";
import Button from "@/components/Button";
import { ThemeContext } from "@/context/themeContext";
import Image from "next/image";
import { useContext } from "react";

const ThemeBtn = ({className}: {className?: string}) => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <Button
      onClick={toggleTheme}
      className={`dark:text-dark-textColor dark:border-dark-textColor overflow-hidden rounded-full border border-black p-2 text-black ${className}`}
    >
      <Image
        className="text-textcolor-100 dark:invert"
        width={17}
        height={17}
        alt=""
        src={`${theme === "light" ? "/icons/dark_mode_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg" : "/icons/light_mode_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"}`}
      />
    </Button>
  );
};

export default ThemeBtn;
