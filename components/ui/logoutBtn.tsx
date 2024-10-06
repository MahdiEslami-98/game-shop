import logout from "@/api/authApi/logout";
import Button from "../Button";
import { forwardRef, LegacyRef } from "react";
import { LogOut } from "lucide-react";
import Cookies from "js-cookie";

const LogoutBtn = (
  { className, sapnClass }: { className?: string; sapnClass?: string },
  ref: LegacyRef<HTMLButtonElement>,
) => {
  const logoutHandler = () => {
    logout()
      .then(() => {
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        Cookies.remove("user_role");
        localStorage.removeItem("user_info");
        window.location.reload();
      })
      .catch((error) => {});
  };

  return (
    <Button
      ref={ref}
      className={`flex p-2 ${className}`}
      onClick={logoutHandler}
    >
      <LogOut size={18} className="mx-2" />
      <span className={`${sapnClass}`}>خروج</span>
    </Button>
  );
};

export default forwardRef(LogoutBtn);
