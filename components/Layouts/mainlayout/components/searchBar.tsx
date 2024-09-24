import Button from "@/components/Button";
import Input from "@/components/Input";
import Image from "next/image";
import { usePathname } from "next/navigation";

const SearchBar = () => {
  const pathName = usePathname();
  return (
    <div
      className={`container mx-auto px-4 ${pathName === "/login" || pathName === "/signup" ? "hidden" : ""}`}
    >
      <form
        action=""
        className="flex items-center rounded-2xl bg-white px-2 py-1 dark:bg-dark-boxColor"
      >
        <Input
          placeholder="دنبال چی میگردی ؟"
          className="h-8 w-full pr-4 outline-none dark:bg-dark-boxColor dark:text-dark-textColor"
        />
        <Button className="rounded-[14px] bg-primary-100 p-[11px]">
          <Image
            className="invert"
            src="/icons/magnifier.svg"
            alt="search"
            width={24}
            height={24}
          />
        </Button>
      </form>
    </div>
  );
};

export default SearchBar;
