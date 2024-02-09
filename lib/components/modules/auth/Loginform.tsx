"use client";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { AiOutlineMail } from "react-icons/ai";
import { VscLock } from "react-icons/vsc";
import TextInput, { InputType } from "../../ui/TextInput";
import Button from "../../ui/Button";
import { BarsSpinner } from "../../ui/Loaders/Spinners";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/lib/service/api/authApi";
import useAuth from "@/lib/hooks/authUser";
import GoogleSignin from "./GoogleSignin";
import Link from "next/link";
import useRoutine from "@/lib/hooks/useRoutine";

const LoginForm = () => {
  const { saveUser } = useAuth();
  const {saveSub} = useRoutine()
  const [isBusy, setIsBusy] = useState(false);
  const router = useRouter();
  const login = useMutation({
    mutationFn: loginUser,
    mutationKey: ["loginuser"],
  });
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: any) => {
    setIsBusy(true);
    login.mutate(data, {
      onSuccess: (data) => {
        toast.success("Login Successful");
        setIsBusy(false);
        localStorage.setItem("glob_token", data.data.access_token);
        saveUser({
          name: data.data.fullname,
          email: data.data.email,
          token: data.data.access_token,
          image: data.data.picture.secure_url,
          country: data.data.country,
          phone: data.data.phone_no,
          joined: data.data.createdAt,
          gender: data.data.gender,
          email_verify: data.data.email_verify,
          id: data.data.id,
          account: "",
          username: data.data.userName
        });
        saveSub(data.data.subscription)
        router.push("/dashboard");
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message);
        setIsBusy(false);
      },
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Controller
            name="email"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Please enter your email",
              },
            }}
            render={({ field }) => (
              <TextInput
                label="Email"
                labelClassName="text-[#000000B2] fw-500"
                icon={<AiOutlineMail className="text-2xl mx-2 lg:mx-4" />}
                placeholder="victorchigozie@gmail.com"
                error={errors.email?.message}
                type={InputType.email}
                {...field}
                ref={null}
              />
            )}
          />
        </div>
        <div className="mt-6 relative">
          <Link href={"/auth/forget"} className="absolute fs-500 top-0 right-0">
            Forgot Password?
          </Link>
          <Controller
            name="password"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Password is required",
              },
              minLength: {
                value: 6,
                message: "Password is too short",
              },
            }}
            render={({ field }) => (
              <TextInput
                label="Password"
                labelClassName="text-[#000000B2] fw-500"
                icon={<VscLock className="text-2xl mx-2 lg:mx-4" />}
                placeholder="*********"
                error={errors.password?.message}
                type={InputType.password}
                {...field}
                ref={null}
              />
            )}
          />
        </div>
        <div className="mt-12">
          <Button
            title={isBusy ? <BarsSpinner size={"14"} color="white" /> : "Login"}
            disabled={!isValid}
          />
        </div>
        <div className="my-6 relative">
          <p className="border-t border-gray-300"></p>
          <div className="absolute -top-5 left-0 w-full flex justify-center">
            <p className="bg-white p-2">OR</p>
          </div>
        </div>
        <div className="mt-6">
          <GoogleSignin />
        </div>
        <div className="mt-4">
          <p>
            Don't have an account, click here to{" "}
            <Link className="fw-500 text-primary" href={"/auth/register"}>
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
