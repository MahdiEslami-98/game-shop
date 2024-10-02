"use client";
import login from "@/api/authApi/login";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const passRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

const LoginPage = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [formError, setFormError] = useState({
    username: {
      error: true,
      message: "نام کاربری باید بیشتر از 3 کاراکتر باشد.",
    },
    password: {
      error: true,
      message: "رمز عبور باید بیشتر از 8 کاراکتر باشد",
    },
  });

  const [showError, setShowError] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: (data: { username: string; password: string }) => login(data),
    mutationKey: ["login"],
    onSuccess: (data) => {
      if (data.data.status === "success") {
        const { accessToken, refreshToken } = data.data.token;
        const user = data.data.data.user;
        Cookies.set("access_token", accessToken, { expires: 1 / 96 });
        Cookies.set("refresh_token", refreshToken, { expires: 6 });
        Cookies.set("user_role", user.role, { expires: 6 });
        localStorage.setItem("user_info", JSON.stringify(user));
        if (user.role === "ADMIN") {
          toast({
            title: "✅ورود با موفقیت انجام شد",
            description: `${user.firstname} به پنل مدیریت خوش آمدید`,
          });
          router.push("/dashboard");
        } else {
          toast({
            title: "✅ورود با موفقیت انجام شد",
            description: `${user.firstname} خوش آمدید`,
          });
          router.push("/");
        }
      }
    },
    onError: () => {
      toast({
        title: "نام کاربری یا رمز عبور اشتباه است",
        description: "لطفا مجددا تلاش کنید",
        variant: "destructive",
      });
    },
  });

  const validate = (info: any) => {
    if (info.username.error || info.password.error) return false;
    return true;
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = validate(formError);
    if (isValid) {
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
          به راحتی با{" "}
          <span className="rounded-lg border-2 border-black bg-primary-100 p-2">
            <Image
              src={"/icons/Unlock.svg"}
              alt="unlockIcon"
              width={20}
              height={20}
              className=""
            />
          </span>{" "}
          <span className="text-secondary-100">رمز عبورت</span>
          وارد شو !
        </h2>
        <form
          onSubmit={(e) => submitHandler(e)}
          className="flex w-full flex-col items-center justify-center gap-y-8 lg:px-10"
        >
          <Input
            placeholder="نام کاربری"
            className="w-full rounded-xl px-4 py-3 shadow outline-primary-100 dark:bg-secondary-50 dark:placeholder:text-dark-descriptionAndDeact"
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, username: e.target.value }));
              if (e.target.value.length < 3) {
                setFormError((prev) => ({
                  ...prev,
                  username: {
                    error: true,
                    message: "نام کاربری باید بیشتر از 3 حرف باشد.",
                  },
                }));
              } else {
                setFormError((prev) => ({
                  ...prev,
                  username: { error: false, message: "" },
                }));
              }
            }}
          />
          <Input
            placeholder="رمز عبور"
            className="w-full rounded-xl px-4 py-3 shadow outline-primary-100 dark:bg-secondary-50 dark:placeholder:text-dark-descriptionAndDeact"
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
              if (
                /*!passRegex.test(e.target.value)*/ e.target.value.length < 8
              ) {
                setFormError((prev) => ({
                  ...prev,
                  password: {
                    error: true,
                    message: "رمز عبور باید بیشتر از 8 کاراکتر باشد",
                  },
                }));
              } else {
                setFormError((prev) => ({
                  ...prev,
                  password: { error: false, message: "" },
                }));
              }
            }}
          />
          <div className="flex items-center gap-x-2 self-start py-3">
            <Input type="checkbox" id="remember" className="p-0.5" />
            <label htmlFor="remember">مرا به خاطر بسپار</label>
          </div>
          {showError &&
            (formError.password.error || formError.username.error) && (
              <div className="flex w-full items-center justify-between gap-x-2 rounded-2xl border border-alarm-100 bg-alarm-25 px-4 py-3 text-xs text-alarm-100 lg:text-sm">
                <div>
                  <p>{formError.username.message}</p>
                  <p>{formError.password.message}</p>
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
            className="w-full rounded-xl bg-secondary-100 py-3 shadow-[3px_4px_0_0_#000]"
          >
            {isPending ? "لطفا صبر کنید..." : "ورود"}
          </Button>
        </form>
      </div>
      <div className="relative pb-6 lg:pb-0">
        <Image
          src={"/Frame 123.svg"}
          alt=""
          width={500}
          height={500}
          className=""
        />
        <Link
          href="/signup"
          className="absolute left-4 top-4 rounded-2xl bg-primary-100 px-4 py-[6px] shadow-[-2px_4px_0_0_#000000]"
        >
          ثبت نام
        </Link>
      </div>
    </>
  );
};

export default LoginPage;
