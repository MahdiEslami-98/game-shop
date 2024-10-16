import Button from "@/components/Button";
import Image from "next/image";
import ThemeBtn from "./components/themeBtn";
import Link from "next/link";
import Dropdown from "./components/dropDown";
import SearchBar from "./components/searchBar";
import CartBtn from "./components/cartBtn";

const topOfHeader = ["خرید اقساطی", "فروش سازمانی", "مجله گیمشاپ", "درباره ما"];

const navItems = ["کیس اسمبل شده", "اسمبل آنلاین", "گیمینگ"];

const Header = () => {
  return (
    <header>
      <div className="rounded-b-3xl bg-gradient-to-l from-[#F5F9FF] to-[#FFF5F7] py-[10px] shadow-[0_4px_8px_rgba(0,0,0,0.03)] dark:from-dark-topOfHeader dark:to-dark-topOfHeader dark:text-dark-textColor">
        <div className="container mx-auto flex items-center justify-between px-4">
          <Link href="/" className="text-3xl font-bold lg:hidden">
            <span className="text-primary-100">Game</span>
            <span className="text-secondary-100">Shop</span>
          </Link>
          <ul className="hidden items-center gap-x-6 text-sm text-textcolor-25 lg:flex dark:text-dark-descriptionAndDeact">
            {topOfHeader.map((item, index) => (
              <li key={index}>
                <Link
                  href="#"
                  className="hover:text-textcolor-75 dark:hover:text-dark-textColor"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeBtn className="lg:hidden" />
          <div className="hidden cursor-pointer items-center gap-x-1 lg:flex">
            021-12345678
            <div className="overflow-hidden rounded-full border border-black p-2 dark:border-dark-textColor dark:text-dark-textColor">
              <Image
                className="dark:invert"
                alt="callNumber"
                src="/icons/phone-call 1.svg"
                width={14}
                height={14}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto flex justify-between px-4 py-6">
        <>
          <Link href="/" className="hidden text-3xl font-bold lg:block">
            <span className="text-primary-100">Game</span>
            <span className="text-secondary-100">Shop</span>
          </Link>
        </>
        <Button className="rounded-full border border-black p-2 lg:hidden dark:border-dark-textColor">
          <Image
            className="dark:invert"
            alt="menu"
            src={"/icons/dashicons_menu-alt.svg"}
            width={20}
            height={20}
          />
        </Button>
        <nav className="hidden lg:block">
          <ul className="flex items-center gap-x-6 text-sm text-textcolor-25 dark:text-dark-descriptionAndDeact">
            <li className="hover:text-textcolor-100 dark:hover:text-dark-textColor">
              <Dropdown text="محصولات ما"></Dropdown>
            </li>
            {navItems.map((item, index) => (
              <li key={index}>
                <Link
                  href="#"
                  className="hover:text-textcolor-100 dark:hover:text-dark-textColor"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-x-4">
          <ThemeBtn className={"hidden lg:inline"} />
          <span className="hidden h-4 w-px border border-description-100 lg:inline"></span>
          <CartBtn />
          <Link
            href={"/login"}
            className="rounded-full border border-black p-2 opacity-70 transition-all duration-200 hover:scale-110 hover:opacity-100 dark:border-dark-textColor dark:opacity-100 dark:hover:opacity-60"
          >
            <Image
              className="dark:invert"
              width={17}
              height={17}
              alt=""
              src={`/icons/user (1) 1.svg`}
            />
          </Link>
        </div>
      </div>
      <SearchBar />
    </header>
  );
};
export default Header;
