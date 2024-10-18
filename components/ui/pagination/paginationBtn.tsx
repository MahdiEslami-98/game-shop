import Button from "@/components/Button";

const PaginationBtn = ({
  index,
  currentPage,
  setPage,
  className,
  activeClass
}: {
  index: number;
  currentPage: number;
  setPage: (data: number) => void;
  className?: string;
  activeClass?: string;
}) => {
  return (
    <Button
      className={`w-6 rounded-md border border-black py-1 ${
        index === currentPage
          ? `bg-black text-white ${activeClass}`
          : "bg-white text-black hover:bg-gray-300 active:bg-black/65 active:text-white"
      } ${className}`}
      onClick={() => setPage(index)}
    >
      {index}
    </Button>
  );
};

export default PaginationBtn;
