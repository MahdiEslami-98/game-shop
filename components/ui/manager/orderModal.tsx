"use client";
import editOrder from "@/api/orderApi/editOrder";
import getOrderById from "@/api/orderApi/getOrderById";
import Button from "@/components/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/Table";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/reactQueryConfig";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogCancel,
} from "../alert-dialog";

const OrderModal = ({ id }: { id: string }) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const { data, isSuccess } = useQuery({
    queryKey: ["orderById", id],
    queryFn: () => getOrderById(id),
  });

  const { mutate: editOrderMutate } = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: { deliveryStatus: boolean };
    }) => editOrder(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orderById"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: () => {
      toast({
        title: "❌مشکلی پیش آمده",
      });
    },
  });

  const editOrderDelivery = (id: string, status: boolean) => {
    editOrderMutate({ id, data: { deliveryStatus: !status } });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button>بررسی وضعیت</Button>
      </AlertDialogTrigger>
      <AlertDialogContent
        onClick={() => setOpen(false)}
        className="sm:max-w-[520px]"
      >
        <AlertDialogHeader>
          <AlertDialogTitle className="text-right">
            مشاهده سفارش
          </AlertDialogTitle>
          <AlertDialogCancel className="absolute left-4 top-2 h-7 w-8 opacity-40 hover:opacity-100">
            <Button className="">X</Button>
          </AlertDialogCancel>
        </AlertDialogHeader>
        <div className="flex items-center gap-x-4">
          <p className="w-24 text-nowrap">نام مشتری :</p>
          <p>
            {isSuccess &&
              data?.data?.data?.order?.user?.firstname +
                " " +
                data?.data?.data?.order?.user?.lastname}
          </p>
        </div>
        <div className="flex items-center gap-x-4">
          <p className="w-24 text-nowrap">آدرس :</p>
          <p>{isSuccess && data?.data?.data?.order?.user?.address}</p>
        </div>
        <div className="flex items-center gap-x-4">
          <p className="w-24 text-nowrap">تلفن :</p>
          <p>{isSuccess && data?.data?.data?.order?.user?.phoneNumber}</p>
        </div>
        <div className="flex items-center gap-x-4">
          <p className="w-24 text-nowrap">زمان تحویل :</p>
          <p>
            {new Date(
              data?.data?.data?.order?.deliveryDate ?? "",
            ).toLocaleDateString("fa-IR")}
          </p>
        </div>
        <div className="flex items-center gap-x-4">
          <p className="w-24 text-nowrap">زمان سفارش :</p>
          <p>
            {new Date(
              data?.data?.data?.order?.createdAt ?? "",
            ).toLocaleDateString("fa-IR")}
          </p>
        </div>
        <div className="max-h-56 overflow-y-auto">
          <Table className="table-fixed border">
            <TableHeader>
              <TableRow>
                <TableHead className="text-right" colSpan={3}>
                  کالا
                </TableHead>
                <TableHead className="text-right">قیمت</TableHead>
                <TableHead className="text-center">تعداد</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data?.data?.order?.products.map((product) => (
                <TableRow key={product.product._id}>
                  <TableCell className="py-2" colSpan={3}>
                    {product.product.name}
                  </TableCell>
                  <TableCell className="py-2">
                    {product.product.price}
                  </TableCell>
                  <TableCell className="py-2 text-center">
                    {product.count}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-center">
          {isSuccess && !data?.data?.data?.order.deliveryStatus && (
            <Button
              onClick={() =>
                editOrderDelivery(
                  data?.data?.data?.order._id,
                  data?.data?.data?.order.deliveryStatus,
                )
              }
              className="rounded-md border border-black bg-black px-4 py-2 text-white"
            >
              تحویل داده شد
            </Button>
          )}
          {isSuccess && data?.data?.data?.order.deliveryStatus && (
            <div className="flex flex-col items-center gap-y-2">
              <p>
                <span>در تاریخ </span>
                <span className="font-bold underline underline-offset-4">
                  {new Date(
                    data?.data?.data?.order.updatedAt ?? "",
                  ).toLocaleDateString("fa-IR")}
                </span>
                <span> تحویل داده شد</span>
              </p>
              <Button
                onClick={() =>
                  editOrderDelivery(
                    data?.data?.data?.order._id,
                    data?.data?.data?.order.deliveryStatus,
                  )
                }
                className="rounded-md border border-black px-1"
              >
                تغییر وضعیت
              </Button>
            </div>
          )}
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default OrderModal;
