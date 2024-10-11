"use client";
import signup from "@/api/authApi/signup";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { ISignupReq } from "@/types/api/auth";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

const phoneRegex = /^09\d{9}$/;
const passRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

interface ISignupData extends ISignupReq {
  passwordConfirm?: string;
}

const SignupPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<ISignupData>({
    firstname: "",
    lastname: "",
    username: "",
    phoneNumber: "",
    address: "",
    password: "",
    passwordConfirm: "",
  });

  const [formError, setFormError] = useState({
    firstname: {
      error: true,
      message: "نام باید بیشتر از 3 کاراکتر باشد",
    },
    lastname: {
      error: true,
      message: "نام خانوادگی باید بیشتر از 3 کاراکتر باشد",
    },
    username: {
      error: true,
      message: "نام کاربری باید بیشتر از 3 کاراکتر باشد",
    },
    phoneNumber: {
      error: true,
      message: "شماره موبایل صحیح نمیباشد",
    },
    address: {
      error: true,
      message: "لطفا آدرس خود را وارد کنید",
    },
    password: {
      error: true,
      message:
        "رمز عبور باید بیشتر از 8 کاراکتر و شامل عدد، حروف بزرگ و کوچک و کاراکتر باشد",
    },
    passwordConfirm: {
      error: true,
      message: "رمز عبور با تکرار آن یکسان نمیباشد",
    },
  });

  const [showError, setShowError] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: (data: ISignupReq) => signup(data),
    mutationKey: ["signup"],
    onSuccess: (data) => {
      if (data.data.status === "success") {
        toast({
          title: "✅ثبت نام با موفقیت انجام شد",
          description: "با تشکر از ثبت نام شما",
        });
        const { accessToken, refreshToken } = data.data.token;
        const user = data.data.data.user;
        Cookies.set("access_token", accessToken, { expires: 1 / 96 });
        Cookies.set("refresh_token", refreshToken, { expires: 6 });
        Cookies.set("user_role", user.role, { expires: 6 });
        localStorage.setItem("user_info", JSON.stringify(user));
        router.push("/");
      }
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast({
          title: "❌خطا",
          description: error.message,
        });
      }
    },
  });

  const validate = () => {
    if (
      formError.passwordConfirm.error ||
      formError.password.error ||
      formError.username.error ||
      formError.address.error ||
      formError.firstname.error ||
      formError.lastname.error ||
      formError.phoneNumber.error
    )
      return false;
    return true;
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = validate();
    if (isValid) {
      delete formData.passwordConfirm;
      setShowError(false);
      mutate(formData);
    } else {
      setShowError(true);
    }
  };

  return (
    <>
      <div className="w-full lg:w-1/2">
        <h2 className="flex flex-wrap items-center justify-center gap-x-2 pb-8 text-2xl font-bold text-textcolor-100 dark:text-dark-textColor">
          ایجا میتونی به<span className="text-primary-100">خانواده</span>
          ما بپیوندی !
        </h2>
        <form
          onSubmit={(e) => submitHandler(e)}
          className="flex w-full flex-col items-center justify-center gap-y-8 lg:px-10"
        >
          <div className="flex w-full gap-x-4">
            <Input
              placeholder="نام"
              className="w-full rounded-xl px-4 py-3 shadow outline-secondary-100 dark:bg-primary-25 dark:placeholder:text-dark-descriptionAndDeact"
              onChange={(e) => {
                setFormData({ ...formData, firstname: e.target.value });
                if (e.target.value.length < 3) {
                  setFormError((prev) => ({
                    ...prev,
                    firstname: {
                      error: true,
                      message: "نام باید بیشتر از 3 کاراکتر باشد",
                    },
                  }));
                } else {
                  setFormError((prev) => ({
                    ...prev,
                    firstname: {
                      error: false,
                      message: "",
                    },
                  }));
                }
              }}
            />
            <Input
              placeholder="نام خانوادگی"
              className="w-full rounded-xl px-4 py-3 shadow outline-secondary-100 dark:bg-primary-25 dark:placeholder:text-dark-descriptionAndDeact"
              onChange={(e) => {
                setFormData({ ...formData, lastname: e.target.value });
                if (e.target.value.length < 3) {
                  setFormError((prev) => ({
                    ...prev,
                    lastname: {
                      error: true,
                      message: "نام خانوادگی باید بیشتر از 3 کاراکتر باشد",
                    },
                  }));
                } else {
                  setFormError((prev) => ({
                    ...prev,
                    lastname: {
                      error: false,
                      message: "",
                    },
                  }));
                }
              }}
            />
          </div>
          <div className="flex w-full gap-x-4">
            <Input
              placeholder="نام کاربری"
              className="w-full rounded-xl px-4 py-3 shadow outline-secondary-100 dark:bg-primary-25 dark:placeholder:text-dark-descriptionAndDeact"
              onChange={(e) => {
                setFormData({ ...formData, username: e.target.value });
                if (e.target.value.length < 3) {
                  setFormError((prev) => ({
                    ...prev,
                    username: {
                      error: true,
                      message: "نام کاربری باید بیشتر از 3 کاراکتر باشد",
                    },
                  }));
                } else {
                  setFormError((prev) => ({
                    ...prev,
                    username: {
                      error: false,
                      message: "",
                    },
                  }));
                }
              }}
            />
            <Input
              placeholder="موبایل"
              className="w-full rounded-xl px-4 py-3 shadow outline-secondary-100 dark:bg-primary-25 dark:placeholder:text-dark-descriptionAndDeact"
              onChange={(e) => {
                setFormData({ ...formData, phoneNumber: e.target.value });
                if (!phoneRegex.test(e.target.value)) {
                  setFormError((prev) => ({
                    ...prev,
                    phoneNumber: {
                      error: true,
                      message: "شماره موبایل صحیح نمیباشد",
                    },
                  }));
                } else {
                  setFormError((prev) => ({
                    ...prev,
                    phoneNumber: {
                      error: false,
                      message: "",
                    },
                  }));
                }
              }}
            />
          </div>
          <Input
            placeholder="آدرس"
            className="w-full rounded-xl px-4 py-3 shadow outline-secondary-100 dark:bg-primary-25 dark:placeholder:text-dark-descriptionAndDeact"
            onChange={(e) => {
              setFormData({ ...formData, address: e.target.value });
              if (!e.target.value.length) {
                setFormError((prev) => ({
                  ...prev,
                  address: {
                    error: true,
                    message: "لطفا آدرس خود را وارد کنید",
                  },
                }));
              } else {
                setFormError((prev) => ({
                  ...prev,
                  address: {
                    error: false,
                    message: "",
                  },
                }));
              }
            }}
          />
          <div className="flex w-full gap-x-4">
            <Input
              placeholder="رمز عبور"
              className="w-full rounded-xl px-4 py-3 shadow outline-secondary-100 dark:bg-primary-25 dark:placeholder:text-dark-descriptionAndDeact"
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
                if (!passRegex.test(e.target.value)) {
                  setFormError((prev) => ({
                    ...prev,
                    password: {
                      error: true,
                      message:
                        "رمز عبور باید بیشتر از 8 کاراکتر و شامل عدد، حروف بزرگ و کوچک و کاراکتر باشد",
                    },
                  }));
                } else {
                  setFormError((prev) => ({
                    ...prev,
                    password: {
                      error: false,
                      message: "",
                    },
                  }));
                }
              }}
            />
            <Input
              placeholder="تکرار رمز عبور"
              className="w-full rounded-xl px-4 py-3 shadow outline-secondary-100 dark:bg-primary-25 dark:placeholder:text-dark-descriptionAndDeact"
              onChange={(e) => {
                setFormData({ ...formData, passwordConfirm: e.target.value });
                if (e.target.value !== formData.password) {
                  setFormError((prev) => ({
                    ...prev,
                    passwordConfirm: {
                      error: true,
                      message: "رمز عبور با تکرار آن یکسان نمیباشد",
                    },
                  }));
                } else {
                  setFormError((prev) => ({
                    ...prev,
                    passwordConfirm: {
                      error: false,
                      message: "",
                    },
                  }));
                }
              }}
            />
          </div>
          {showError &&
            (formError.password.error ||
              formError.username.error ||
              formError.passwordConfirm.error ||
              formError.firstname.error ||
              formError.lastname.error ||
              formError.phoneNumber.error ||
              formError.address.error) && (
              <div className="flex w-full items-center justify-between gap-x-2 rounded-2xl border border-alarm-100 bg-alarm-25 px-4 py-3 text-xs text-alarm-100 lg:text-sm">
                <div>
                  <p>{formError.firstname.message}</p>
                  <p>{formError.lastname.message}</p>
                  <p>{formError.username.message}</p>
                  <p>{formError.phoneNumber.message}</p>
                  <p>{formError.address.message}</p>
                  <p>{formError.password.message}</p>
                  <p>{formError.passwordConfirm.message}</p>
                </div>
                <div className="h-full w-10">
                  <Image
                    src={"/icons/eva_alert-triangle-outline.svg"}
                    alt=""
                    width={20}
                    height={20}
                    className="fill-alarm-100"
                  />
                </div>
              </div>
            )}
          <Button
            type="submit"
            className="w-full rounded-xl bg-primary-100 py-3 shadow-[3px_4px_0_0_#000]"
          >
            {isPending ? "لطفا صبر کنید..." : "ثبت نام"}
          </Button>
        </form>
      </div>
      <div className="relative pb-6 lg:pb-0">
        <Image
          src={"/Group 586 1.svg"}
          alt=""
          width={500}
          height={500}
          className=""
        />
        <Link
          href="/login"
          className="absolute left-4 top-4 rounded-2xl bg-secondary-100 px-4 py-[6px] shadow-[-2px_4px_0_0_#000000]"
        >
          ورود
        </Link>
      </div>
    </>
  );
};

export default SignupPage;
