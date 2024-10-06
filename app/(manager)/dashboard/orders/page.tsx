"use client";
import getAllOrder from "@/api/orderApi/getAllOrder";
import Input from "@/components/Input";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/Table";
import DeleteModal from "@/components/ui/manager/deleteModal";
import OrderModal from "@/components/ui/manager/orderModal";
import UserOrder from "@/components/ui/manager/userOrder";
import Modal from "@/components/ui/modal";
import Pagination from "@/components/ui/pagination";
import Spinner from "@/components/ui/spinner";
import numberTo3Digit from "@/util/numberTo3Digit";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const OrdersPage = () => {
  const [stat, setStat] = useState("");
  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["orders", stat, page],
    queryFn: () => getAllOrder(stat, page),
    gcTime: 0,
  });
  const orderStatusChangeHandler = (e: React.ChangeEvent<HTMLFormElement>) => {
    setStat(e.target.value);
    setPage(1);
  };

  return (
    <>
      <form
        onChange={orderStatusChangeHandler}
        className="mb-4 flex flex-col items-end gap-x-1 rounded-lg bg-white p-4 shadow-sm sm:flex-row-reverse sm:items-center md:gap-x-8"
      >
        <div className="flex items-center gap-x-1">
          <label htmlFor="all">همه</label>
          <Input type="radio" value={""} name="stat" id="all" defaultChecked />
        </div>
        <div className="flex items-center gap-x-1">
          <label htmlFor="delivered">تحویل شده</label>
          <Input type="radio" value={"true"} name="stat" id="delivered" />
        </div>
        <div className="flex items-center gap-x-1">
          <label htmlFor="pending">در انتظار ارسال</label>
          <Input type="radio" value={"false"} name="stat" id="pending" />
        </div>
      </form>
      <div className="rounded-lg bg-white p-2 shadow-sm">
        <Table className="table-auto border-collapse text-xs sm:text-sm md:text-base">
          <TableHeader>
            <TableRow>
              <TableHead className="px-1 text-right">نام کاربر</TableHead>
              <TableHead className="px-1 text-right">مجموع مبلغ</TableHead>
              <TableHead className="px-1 text-right">زمان ثبت</TableHead>
              <TableHead className="px-1 text-right">وضعیت</TableHead>
              <TableHead className="px-1 text-center">بررسی</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isSuccess &&
              data.data.data &&
              data?.data?.data?.orders.map((item) => (
                <TableRow key={item._id}>
                  <TableCell className="px-1 text-right">
                    <UserOrder id={item.user} />
                  </TableCell>
                  <TableCell className="px-1 text-right">
                    {numberTo3Digit(item.totalPrice)}
                  </TableCell>
                  <TableCell className="px-1 text-right">
                    {new Date(item.createdAt).toLocaleDateString("fa-IR")}
                  </TableCell>
                  <TableCell className="px-1">
                    {item.deliveryStatus ? "تحویل شده" : "در انتظار"}
                  </TableCell>
                  <TableCell className="px-1 text-center">
                    <Modal
                      setIsOpen={setIsOpen}
                      isOpen={isOpen}
                      text="بررسی سفارش"
                    >
                      <OrderModal id={item._id} />
                    </Modal>
                  </TableCell>
                </TableRow>
              ))}
            {isLoading && (
              <TableRow>
                <TableCell colSpan={5} className="px-1 text-left">
                  <Spinner />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={5}>
                {isSuccess && data?.data?.page && data?.data?.total_pages && (
                  <Pagination
                    page={page}
                    total={data?.data?.total_pages}
                    setPage={setPage}
                  />
                )}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </>
  );
};

export default OrdersPage;
