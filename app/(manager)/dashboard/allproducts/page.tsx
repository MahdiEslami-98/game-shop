"use client";
import apiRoutes from "@/api/apiRoutes";
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
import Pagination from "@/components/ui/pagination";
import Spinner from "@/components/ui/spinner";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const DashboardAllProducts = () => {
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
          <AddProductModal />
        </div>
      </div>
      <div className="mb-2 mt-8 rounded-lg bg-white p-2 shadow-sm">
        <Table className="table-auto border-collapse text-xs sm:text-sm md:table-fixed md:text-base">
          <TableHeader>
            <TableRow>
              <TableHead className="px-1 text-right">تصویر</TableHead>
              <TableHead colSpan={3} className="px-1 text-right">
                نام محصول
              </TableHead>
              <TableHead className="px-1 text-right">دسته بندی</TableHead>
              <TableHead className="px-1 text-center">عملیات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isSuccess &&
              data.data.data &&
              data?.data?.data?.products?.map((item) => (
                <TableRow key={item._id}>
                  <TableCell className="p-2">
                    <Image
                      src={apiRoutes.productThumb + item.thumbnail}
                      alt={item.brand}
                      width={40}
                      height={40}
                      className="h-5 w-5 object-cover object-center sm:h-auto sm:w-auto"
                    />
                  </TableCell>
                  <TableCell className="overflow-hidden p-2" colSpan={3}>
                    <Link
                      className="line-clamp-2 text-xs hover:underline sm:text-sm"
                      href={`/products/${item._id}`}
                    >
                      {item.name}
                    </Link>
                  </TableCell>
                  <TableCell className="w-max overflow-hidden p-2 text-xs sm:text-ellipsis sm:text-sm">
                    <GetCategory id={item.category} />
                  </TableCell>
                  <TableCell className="flex w-max flex-col gap-2 p-2 text-xs sm:flex-row sm:items-center sm:justify-center sm:text-sm md:text-sm">
                    <EditProductModal id={item._id} />
                    <DeleteModal id={item._id} name={item.name} />
                  </TableCell>
                </TableRow>
              ))}
            {isLoading && (
              <TableRow>
                <TableCell colSpan={6} className="px-1 text-right">
                  <Spinner />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={6} className="px-3 text-left">
                {isSuccess && data?.data?.page && data?.data?.total_pages && (
                  <Pagination
                    page={page}
                    total={data.data.total_pages}
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

export default DashboardAllProducts;
