import Button from "@/components/Button";
import PaginationBtn from "./paginationBtn";
import Dots from "./dots";

const Pagination = ({
  page,
  total,
  setPage,
}: {
  page: number;
  total: number;
  setPage: (value: number) => void;
}) => {
  const btns: JSX.Element[] = [];

  if (total < 6) {
    for (let i = 1; i <= total; i++) {
      btns.push(
        <PaginationBtn
          currentPage={page}
          setPage={setPage}
          index={i}
          key={i}
        />,
      );
    }
  } else if (total >= 6) {
    btns.push(
      <PaginationBtn currentPage={page} setPage={setPage} index={1} key={1} />,
    );
    if (page > 3) {
      btns.push(<Dots key={"a"} />);
    }
    if (page === total) {
      btns.push(
        <PaginationBtn
          currentPage={page}
          setPage={setPage}
          index={page - 2}
          key={2}
        />,
      );
    }
    if (page > 2) {
      btns.push(
        <PaginationBtn
          currentPage={page}
          setPage={setPage}
          index={page - 1}
          key={3}
        />,
      );
    }
    if (page != 1 && page != total) {
      btns.push(
        <PaginationBtn
          currentPage={page}
          setPage={setPage}
          index={page}
          key={4}
        />,
      );
    }
    if (page < total - 1) {
      btns.push(
        <PaginationBtn
          currentPage={page}
          setPage={setPage}
          index={page + 1}
          key={5}
        />,
      );
    }
    if (page === 1) {
      btns.push(
        <PaginationBtn
          currentPage={page}
          setPage={setPage}
          index={page + 2}
          key={6}
        />,
      );
    }
    if (page < total - 2) {
      btns.push(<Dots key={"b"} />);
    }
    btns.push(
      <PaginationBtn
        currentPage={page}
        setPage={setPage}
        index={total}
        key={7}
      />,
    );
  }

  const nextPageHandler = () => {
    if (page < total) {
      setPage(page + 1);
    }
  };
  const pervPageHandler = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  return (
    <div className="-my-1 flex flex-row-reverse items-center justify-start gap-x-2">
      <Button
        className="rounded-md border border-black px-2 py-1"
        onClick={pervPageHandler}
      >
        قبلی
      </Button>
      {btns}
      <Button
        className="rounded-md border border-black px-2 py-1"
        onClick={nextPageHandler}
      >
        بعدی
      </Button>
    </div>
  );
};

export default Pagination;
