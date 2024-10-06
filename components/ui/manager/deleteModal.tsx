import removeProduct from "@/api/productApi/removeProduct";
import Button from "@/components/Button";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/reactQueryConfig";
import { useMutation } from "@tanstack/react-query";

const DeleteModal = ({
  setIsOpen,
  id,
  name,
}: {
  setIsOpen: (isOpen: boolean) => void;
  id: string;
  name: string;
}) => {
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
    <>
      <div className="w-96">
        <h3 className="mb-4 text-lg font-semibold">آیا مطمئن هستید؟</h3>
        <p className="text-red-500">{name} به طور کامل حذف خواهد شد</p>
      </div>
      <div className="flex flex-row-reverse gap-x-2 pt-4">
        <Button
          className="w-20 rounded-lg bg-gray-800 py-2 text-white"
          onClick={() => setIsOpen(false)}
        >
          انصراف
        </Button>
        <Button onClick={() => deleteMutate(id)} className="w-20 rounded-lg bg-alarm-100 py-2 text-white">
          تایید
        </Button>
      </div>
    </>
  );
};

export default DeleteModal;
