import Button from "@/components/Button";

const PaginationBtn = ({
  index,
  currentPage,
  setPage,
}: {
  index: number;
  currentPage: number;
  setPage: (data: number) => void;
}) => {
  return (
    <Button
      className={
        "w-6 rounded-md border border-black py-1 " +
        (index === currentPage
          ? "bg-black text-white"
          : "bg-white text-black hover:bg-gray-300 active:bg-black/65 active:text-white")
      }
      onClick={() => setPage(index)}
    >
      {index}
    </Button>
  );
};

export default PaginationBtn;
