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
        "h-8 w-8 rounded-md border border-black " +
        (index === currentPage ? "bg-black text-white" : "bg-white text-black")
      }
      onClick={() => setPage(index)}
    >
      {index}
    </Button>
  );
};

export default PaginationBtn;
