import LogoutBtn from "@/components/ui/logoutBtn";
import { Home, ShoppingBag, Package, DollarSign, X, Undo2 } from "lucide-react";
import Link from "next/link";

const sidebarItems = [
  { icon: Home, label: "داشبورد", href: "/dashboard" },
  { icon: ShoppingBag, label: "سفارش‌ها", href: "/dashboard/orders" },
  { icon: Package, label: "محصولات", href: "/dashboard/allProducts" },
  {
    icon: DollarSign,
    label: "قیمت و تعداد",
    href: "/dashboard/quantityandprices",
  },
  { icon: Undo2, label: "بازگشت به فروشگاه", href: "/" },
];

const Sidebar = ({
  isOpen,
  toggleSidebar,
}: {
  isOpen: boolean;
  toggleSidebar: () => void;
}) => (
  <div
    className={`absolute h-full bg-gray-800 transition-all duration-200 sm:static ${isOpen ? "bottom-0 right-0 top-0 w-64 p-4" : "w-0 sm:w-14 lg:w-64 lg:p-4"} overflow-hidden`}
  >
    <div className="mb-8 flex items-center justify-between">
      <h1
        className={`animate-fadeIn text-2xl font-bold text-white ${isOpen ? "block" : "hidden lg:block"}`}
      >
        پنل مدیریت
      </h1>
      <button onClick={toggleSidebar} className="text-white lg:hidden">
        {isOpen && <X size={24} />}
      </button>
    </div>
    <nav>
      <ul className="space-y-2">
        {sidebarItems.map((item, index) => (
          <li key={index}>
            <Link
              href={item.href}
              className="flex rounded p-2 text-gray-300 transition-colors duration-200 hover:bg-gray-700 hover:text-white"
            >
              <item.icon className="mx-2" size={18} />
              <span
                className={`animate-fadeIn ${isOpen ? "block" : "hidden lg:block"}`}
              >
                {item.label}
              </span>
            </Link>
          </li>
        ))}
        <li>
          <LogoutBtn
            className="w-full rounded text-alarm-75 transition-colors duration-200 hover:bg-gray-700 hover:text-alarm-100"
            sapnClass={`animate-fadeIn ${isOpen ? "block" : "hidden lg:block"}`}
          />
        </li>
      </ul>
    </nav>
  </div>
);

export default Sidebar;
