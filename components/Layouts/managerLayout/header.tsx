import { Bell, Menu, CircleUserRound } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Header = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const pathName = usePathname();
  const splitPath = pathName.split("/").at(-1);

  return (
    <header className="flex items-center justify-between bg-white p-4 shadow-sm">
      <div className="flex items-center gap-x-2">
        <button onClick={toggleSidebar} className="ml-2 self-start lg:hidden">
          <Menu size={24} />
        </button>
        <h2 className="mr-2 text-xl font-semibold capitalize">{splitPath}</h2>
      </div>
      <div className="flex items-center">
        <Bell className="ml-4 text-gray-600" />
        <CircleUserRound
          size={28}
          className="text-gray-600"
          strokeWidth={1.7}
        />
      </div>
    </header>
  );
};

export default Header;
