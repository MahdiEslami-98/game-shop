"use client";
import removeProduct from "@/api/productApi/removeProduct";
import Button from "@/components/Button";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/reactQueryConfig";
import { useMutation } from "@tanstack/react-query";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

const DeleteModal = ({ id, name }: { id: string; name: string }) => {
  const { toast } = useToast();
  const { mutate: deleteMutate } = useMutation({
    mutationFn: (value: string) => removeProduct(value),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mProducts"] });
      queryClient.invalidateQueries({ queryKey: ["prices"] });
      toast({
        title: "✅محصول با موفقیت حذف شد",
      });
    },
    onError: () => {
      toast({
        title: "❌مشکلی پیش آمده",
      });
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-[50px] rounded-md bg-red-500 py-1 text-white">
        حذف
      </AlertDialogTrigger>
      <AlertDialogContent className="">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-right">
            آیا مطمئن هستید؟
          </AlertDialogTitle>
          <AlertDialogDescription className="text-right">
            {name} به طور کامل حذف خواهد شد
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex gap-x-2">
          <AlertDialogCancel>انصراف</AlertDialogCancel>
          <AlertDialogAction>
            <Button onClick={() => deleteMutate(id)}>حذف</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteModal;
