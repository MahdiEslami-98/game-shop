"use client";
import editProduct from "@/api/productApi/editProduct";
import getProductById from "@/api/productApi/getProductById";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/reactQueryConfig";
import { modules } from "@/lib/reactQuillModules";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import CategoryOption from "./categoryOption";
import SubcategoryOption from "./subcategoryOption";
import "react-quill/dist/quill.snow.css";
import {
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialog,
  AlertDialogCancel,
} from "../alert-dialog";
import Spinner from "../spinner";

const EditProductModal = ({ id }: { id: string }) => {
  const [category, setCategory] = useState("");
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    category: "",
    subcategory: "",
    quantity: 0,
    thumbnail: new File([], ""),
    brand: "",
    description: "",
    images: [] as File[],
  });
  const [formError, setFormError] = useState({
    name: {
      error: false,
      message: "",
    },
    price: {
      error: false,
      message: "",
    },
    category: {
      error: false,
      message: "",
    },
    subcategory: {
      error: false,
      message: "",
    },
    quantity: {
      error: false,
      message: "",
    },
    thumbnail: {
      error: false,
      message: "",
    },
    brand: {
      error: false,
      message: "",
    },
    description: {
      error: false,
      message: "",
    },
    images: {
      error: false,
      message: "",
    },
  });
  const [showError, setShowError] = useState(false);
  const { toast } = useToast();

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["productDialog", id],
    queryFn: () => getProductById(id),
  });

  const { mutate: editMutate } = useMutation({
    mutationFn: (value: FormData) => editProduct(id, value),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mProducts"] });
      toast({
        title: "✅محصول با موفقیت ویرایش شد",
      });
      setOpen(false);
    },
    onError: (error) => {
      toast({
        title: "❌مشکلی پیش آمده",
        description: error.message,
      });
    },
  });

  const validation = (data: {
    name: string;
    price: number;
    category: string;
    subcategory: string;
    quantity: number;
    thumbnail: File;
    brand: string;
    description: string;
    images: Array<File> | [];
  }) => {
    if (data.name.length < 3) {
      setFormError((prev) => ({
        ...prev,
        name: {
          error: true,
          message: "نام باید بیشتر از 3 کاراکتر باشد",
        },
      }));
    } else {
      setFormError((prev) => ({
        ...prev,
        name: {
          error: false,
          message: "",
        },
      }));
    }

    if (+data.price < 10000 && isNaN(+data.price)) {
      setFormError((prev) => ({
        ...prev,
        price: {
          error: true,
          message: "قیمت باید بیشتر از 10000 باشد",
        },
      }));
    } else {
      setFormError((prev) => ({
        ...prev,
        price: {
          error: false,
          message: "",
        },
      }));
    }

    if (data.category === "") {
      setFormError((prev) => ({
        ...prev,
        category: {
          error: true,
          message: "یک دسته بندی را انتخاب کنید",
        },
      }));
    } else {
      setFormError((prev) => ({
        ...prev,
        category: {
          error: false,
          message: "",
        },
      }));
    }

    if (data.subcategory === "") {
      setFormError((prev) => ({
        ...prev,
        subcategory: {
          error: true,
          message: "یک زیر دسته بندی را انتخاب کنید",
        },
      }));
    } else {
      setFormError((prev) => ({
        ...prev,
        subcategory: {
          error: false,
          message: "",
        },
      }));
    }

    if (+data.quantity < 1 && isNaN(+data.quantity)) {
      setFormError((prev) => ({
        ...prev,
        quantity: {
          error: true,
          message: "تعداد را وارد کنید",
        },
      }));
    } else {
      setFormError((prev) => ({
        ...prev,
        quantity: {
          error: false,
          message: "",
        },
      }));
    }

    if (!data.thumbnail) {
      setFormError((prev) => ({
        ...prev,
        thumbnail: {
          error: true,
          message: "تصویر را انتخاب کنید",
        },
      }));
    } else {
      setFormError((prev) => ({
        ...prev,
        thumbnail: {
          error: false,
          message: "",
        },
      }));
    }

    if (data.brand.length < 3) {
      setFormError((prev) => ({
        ...prev,
        brand: {
          error: true,
          message: "نام برند باید بیشتر از 3 کاراکتر باشد",
        },
      }));
    } else {
      setFormError((prev) => ({
        ...prev,
        brand: {
          error: false,
          message: "",
        },
      }));
    }

    if (data.description.length < 10) {
      setFormError((prev) => ({
        ...prev,
        description: {
          error: true,
          message: "توضیحات باید بیشتر از 10 کاراکتر باشد",
        },
      }));
    } else {
      setFormError((prev) => ({
        ...prev,
        description: {
          error: false,
          message: "",
        },
      }));
    }

    if (data.images.length < 1) {
      setFormError((prev) => ({
        ...prev,
        images: {
          error: true,
          message: "تصاویر را انتخاب کنید",
        },
      }));
    } else {
      setFormError((prev) => ({
        ...prev,
        images: {
          error: false,
          message: "",
        },
      }));
    }
  };

  const validate = () => {
    validation(formData);
    return !formError.name.error &&
      !formError.price.error &&
      !formError.category.error &&
      !formError.subcategory.error &&
      !formError.quantity.error
      ? true
      : false;
  };

  const submitDialog = (
    e: React.FormEvent<HTMLFormElement>,
    data: {
      name: string;
      price: number;
      category: string;
      subcategory: string;
      quantity: number;
      thumbnail: File;
      brand: string;
      description: string;
      images: Array<File>;
    },
  ) => {
    e.preventDefault();

    const isValid = validate();
    if (!isValid) {
      setShowError(true);
      return;
    }

    setShowError(false);
    const myformData = new FormData();

    myformData.append("name", data.name);
    myformData.append("price", String(data.price));
    myformData.append("category", data.category);
    myformData.append("subcategory", data.subcategory);
    myformData.append("quantity", String(data.quantity));

    data.images.forEach((img: File) => {
      myformData.append("images", img);
    });

    myformData.append("thumbnail", data.thumbnail);
    myformData.append("brand", data.brand);
    myformData.append("description", data.description);

    editMutate(myformData);
  };

  useEffect(() => {
    if (!data) return;
    const { name, price, category, subcategory, quantity, brand, description } =
      data?.data?.data?.product;
    setFormData((prev) => ({
      ...prev,
      name,
      price,
      category: category._id,
      subcategory: subcategory._id,
      quantity,
      brand,
      description,
    }));
    setCategory(category._id);
  }, [data]);
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className={"w-[50px] rounded-md bg-yellow-400 py-1 text-white"}>
          ویرایش
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent
        onClick={() => setOpen(false)}
        className="sm:max-w-[600px] rtl:space-x-reverse"
      >
        <AlertDialogHeader>
          <AlertDialogTitle className="text-right">
            ویرایش محصول
          </AlertDialogTitle>
          <AlertDialogCancel className="absolute left-4 top-2 mt-0 h-7 w-8 overflow-hidden p-0 opacity-40 hover:opacity-100">
            <Button className="h-full w-full bg-white">X</Button>
          </AlertDialogCancel>
        </AlertDialogHeader>
        {isLoading && <Spinner />}
        {isSuccess && data.data.data && (
          <form
            className="flex flex-col gap-y-2"
            onSubmit={(e) => submitDialog(e, formData)}
          >
            <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
              <div className="flex flex-col gap-y-1">
                <label htmlFor="name">نام کالا :</label>
                <Input
                  id="name"
                  className="rounded-md border border-black px-4"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
                {showError && formError.name.error && (
                  <span className="text-xs text-red-500">
                    {formError.name.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-y-1">
                <label htmlFor="price">قیمت :</label>
                <Input
                  type="number"
                  id="price"
                  value={formData.price}
                  className="rounded-md border border-black px-4"
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, price: +e.target.value }))
                  }
                />
                {showError && formError.price.error && (
                  <span className="text-xs text-red-500">
                    {formError.price.message}
                  </span>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-4">
              <div>
                <label htmlFor="category">دسته بندی :</label>
                <select
                  value={formData.category}
                  id="category"
                  className="mt-1 w-full rounded-md border border-black px-4"
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }));
                    setCategory(e.target.value);
                  }}
                >
                  <option value="">انتخاب کنید</option>
                  <CategoryOption />
                </select>
                {showError && formError.category.error && (
                  <span className="text-xs text-red-500">
                    {formError.category?.message}
                  </span>
                )}
              </div>
              <div>
                <label htmlFor="sub">زیر دسته بندی :</label>
                <select
                  value={formData.subcategory}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      subcategory: e.target.value,
                    }))
                  }
                  id="sub"
                  className="mt-1 w-full rounded-md border border-black px-4"
                >
                  <option value="">انتخاب کنید</option>
                  <SubcategoryOption value={category} />
                </select>
                {showError && formError.subcategory.error && (
                  <span className="text-xs text-red-500">
                    {formError?.subcategory?.message}
                  </span>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-4">
              <div>
                <label htmlFor="brand">برند :</label>
                <Input
                  value={formData.brand}
                  className="mt-1 w-full rounded-md border border-black px-4"
                  id="brand"
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, brand: e.target.value }))
                  }
                />
                {showError && formError.brand.error && (
                  <span className="text-xs text-red-500">
                    {formError.brand?.message}
                  </span>
                )}
              </div>
              <div>
                <label htmlFor="quantity">تعداد :</label>
                <Input
                  value={formData.quantity}
                  type="number"
                  className="mt-1 w-full rounded-md border border-black px-4"
                  id="quantity"
                />
                {showError && formError.quantity.error && (
                  <span className="text-xs text-red-500">
                    {formError.quantity?.message}
                  </span>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
              <div className="flex flex-col gap-y-1">
                <label htmlFor="image">تصویر :</label>

                <Input
                  accept="image/*"
                  multiple
                  type="file"
                  id="image"
                  className="overflow-hidden rounded-md border border-black text-slate-500 file:ml-4 file:border-0 file:bg-black file:px-3 file:py-1 file:font-medium file:text-white hover:file:bg-gray-800"
                  onChange={(e) => {
                    const file = Array.from(e.target.files || []);
                    setFormData((prev) => ({ ...prev, images: file }));
                  }}
                />
                {showError && formError.images.error && (
                  <span className="text-xs text-red-500">
                    {formError.images?.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-y-1">
                <label htmlFor="thumbnail">thumbnail :</label>
                <Input
                  type="file"
                  accept="image/*"
                  id="thumbnail"
                  className="overflow-hidden rounded-md border border-black text-slate-500 file:ml-4 file:border-0 file:bg-black file:px-3 file:py-1 file:font-medium file:text-white hover:file:bg-gray-800"
                  onChange={(e) => {
                    const file = Array.from(e.target.files || []);
                    setFormData((prev) => ({ ...prev, thumbnail: file[0] }));
                  }}
                />
              </div>
            </div>
            <div>
              <label htmlFor="description">توضیحات :</label>
              <ReactQuill
                theme="snow"
                className="left-to-right max-h-[120px] max-w-[550px] overflow-y-auto sm:max-h-[150px]"
                modules={modules}
                value={formData.description}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, description: value }))
                }
              />
              {showError && formError.description.error && (
                <span className="text-xs text-red-500">
                  {formError?.description?.message}
                </span>
              )}
            </div>
            <div>
              <Button
                className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white"
                type="submit"
              >
                ویرایش کالا
              </Button>
            </div>
          </form>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EditProductModal;
