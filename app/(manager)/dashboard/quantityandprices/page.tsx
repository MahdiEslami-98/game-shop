"use client";
import editProductPriceAndQuantity from "@/api/productApi/editProductPriceAndQuantity";
import getAllProducts from "@/api/productApi/getAllProducts";
import Button from "@/components/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/Table";
import PricesAndquantityTableBodyItem from "@/components/ui/manager/prices&quantityTableBodyItem";
import Pagination from "@/components/ui/pagination";
import Spinner from "@/components/ui/spinner";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/reactQueryConfig";
import { IEditProductPriceAndQuantityData } from "@/types/api/product";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

const DashboardQAndP = () => {
  const [page, setPage] = useState(1);
  const { toast } = useToast();
  const [productsInfo, setProductInfo] = useState<
    IEditProductPriceAndQuantityData[] | []
  >([]);
  const [pend, setPend] = useState(false);

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["prices", page],
    queryFn: () => getAllProducts(page, "-createdAt"),
  });

  const { mutate: editMutate, isPending } = useMutation({
    mutationFn: (value: IEditProductPriceAndQuantityData[]) =>
      editProductPriceAndQuantity(value),
    onSuccess: () => {
      setPend((prev) => !prev);
      queryClient.invalidateQueries({ queryKey: ["prices"] });
      setProductInfo([]);
      toast({
        title: "✅محصول با موفقیت ویرایش شد",
      });
    },
    onError: (error) => {
      toast({
        title: "❌مشکلی پیش آمده",
      });
    },
  });

  const saveHandler = () => {
    if (productsInfo.length < 1) {
      toast({
        title: "❌هیچ محصولی ویرایش نشده",
      });
      return;
    }
    editMutate(productsInfo);
  };
  return (
    <>
      <div className="flex justify-between rounded-lg bg-white p-4 shadow-sm">
        <p className="text-xl md:text-2xl">موجودی و قیمت ها</p>
        <div className="flex items-center gap-x-2">
          <Button
            onClick={saveHandler}
            disabled={productsInfo.length < 1 || isPending ? true : false}
            className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white disabled:opacity-40"
          >
            ذخیره
          </Button>
          <Button
            className="rounded-md border border-black px-4 py-2 text-sm font-medium disabled:opacity-40"
            onClick={() => {
              setProductInfo([]);
              setPend((prev) => !prev);
            }}
          >
            لغو
          </Button>
        </div>
      </div>
      <div className="mt-6 rounded-lg bg-white p-2 shadow-sm">
        <Table className="table-fixed border-collapse">
          <TableHeader>
            <TableRow>
              <TableHead colSpan={4} className="text-right">
                نام محصول
              </TableHead>
              <TableHead className="text-right">قیمت</TableHead>
              <TableHead className="text-right">موجودی</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isSuccess &&
              data.data.data.products &&
              data?.data?.data?.products.map((item) => (
                <PricesAndquantityTableBodyItem
                  key={item._id}
                  tableItem={item}
                  productsInfo={productsInfo}
                  setProductInfo={setProductInfo}
                  pend={pend}
                />
              ))}
            {isLoading && (
              <TableRow>
                <TableCell colSpan={6}>
                  <Spinner />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={6} className="text-left">
                {isSuccess && data.data.page && data.data.total_pages && (
                  <Pagination
                    page={page}
                    setPage={setPage}
                    total={data?.data?.total_pages}
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

export default DashboardQAndP;
