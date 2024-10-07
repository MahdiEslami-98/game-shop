"use client";
import getAllProducts from "@/api/productApi/getAllProducts";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/Table";
import AddProductModal from "@/components/ui/manager/addProductModal";
import DeleteModal from "@/components/ui/manager/deleteModal";
import EditProductModal from "@/components/ui/manager/editProductModal";
import GetCategory from "@/components/ui/manager/getCategory";
import Modal from "@/components/ui/modal";
import Pagination from "@/components/ui/pagination";
import Spinner from "@/components/ui/spinner";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const DashboardAllPrices = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [page, setPage] = useState(1);
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["mProducts", page],
    queryFn: () => getAllProducts(page, "-createdAt"),
  });
  return (
    <>
      <div className="flex justify-between rounded-lg bg-white p-2 shadow-sm">
        <p className="pr-8 text-xl md:text-2xl">کالاها</p>
        <div>
          <Modal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            text="افزودن کالا +"
            className="max-h-screen w-full sm:w-[600px] sm:max-w-[600px]"
            triggerClass="bg-sky-500 rounded-lg px-3 py-2 text-sm text-white "
          >
            <AddProductModal setOpen={setIsOpen} />
          </Modal>
        </div>
      </div>
      <div className="mb-2 mt-8 rounded-lg bg-white p-2 shadow-sm">
        <Table className="table-fixed border-collapse text-xs sm:text-sm md:text-base">
          <TableHeader>
            <TableRow>
              <TableHead className="px-1 text-right">تصویر</TableHead>
              <TableHead className="px-1 text-right">نام محصول</TableHead>
              <TableHead className="px-1 text-right">دسته بندی</TableHead>
              <TableHead className="px-1 text-center">عملیات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isSuccess &&
              data.data.data &&
              data?.data?.data?.products?.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>
                    <Image
                      src={process.env.PRODUCT_THUMB + item.thumbnail}
                      alt={item.brand}
                      width={80}
                      height={80}
                      className="w-20 object-cover object-center"
                    />
                  </TableCell>
                  <TableCell>
                    <Link
                      className="line-clamp-2 text-xs hover:underline sm:text-base"
                      href={`/product/${item._id}`}
                    >
                      {item.name}
                    </Link>
                  </TableCell>
                  <TableCell className="overflow-hidden text-ellipsis text-xs sm:text-base">
                    <GetCategory id={item.category} />
                  </TableCell>
                  <TableCell className="gap-y-2 text-xs sm:flex sm:items-center sm:justify-center sm:gap-x-2 sm:gap-y-0 sm:text-sm md:text-base">
                    <Modal
                      isOpen={openEditModal}
                      setIsOpen={setOpenEditModal}
                      className="max-h-screen w-full sm:w-[600px] sm:max-w-[600px]"
                      text="ویرایش"
                    >
                      <EditProductModal
                        id={item._id}
                        setOpen={setOpenEditModal}
                      />
                    </Modal>
                    <Modal
                      isOpen={openDeleteModal}
                      setIsOpen={setOpenDeleteModal}
                      className="w-full sm:w-[400px] sm:max-w-[400px]"
                      text="حذف"
                    >
                      <DeleteModal
                        id={item._id}
                        name={item.name}
                        setIsOpen={setOpenDeleteModal}
                      />
                    </Modal>
                  </TableCell>
                </TableRow>
              ))}
            {isLoading && (
              <TableRow>
                <TableCell colSpan={4} className="px-1 text-right">
                  <Spinner />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4} className="px-1 text-left">
                {isSuccess && data?.data?.page && data?.data?.total_pages && (
                  <Pagination
                    page={page}
                    total={data.data.total}
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

export default DashboardAllPrices;
