"use client"
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-phone-number-input/style.css";
import PhoneInputWithCountry from "react-phone-number-input/react-hook-form";
import TextInput, { InputType } from "../../ui/TextInput";
import Button from "../../ui/Button";
import { BarsSpinner } from "../../ui/Loaders/Spinners";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/lib/service/api/authApi";
import SelectInput from "../../ui/SelectInput";
import Link from "next/link";
import { useRouter } from "next/navigation";
import GoogleSignUp from "./GoogleSignUp";
import { genderOption } from "@/lib/utils/hardData";
import {countries} from 'country-data-list';

const RegisterForm = () => {
  const [isBusy, setIsBusy] = useState(false);
  const router = useRouter()
  const login = useMutation({
    mutationFn: registerUser,
    mutationKey: ["registeruser"],
  });
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
        email: "",
        phone_no: "",
        userType: "user",
        gender: "",
        username: "",
        password: "",
        country: "",
        firstname: "",
        lastname: "",
        reference: "",
        confirm_password: ""
    },
  });
 
  const onSubmit = (datas: any) => {
    setIsBusy(true);
    login.mutate(datas, {
      onSuccess: (data) => {
        toast.success(data.message);
        setIsBusy(false);
        router.push(`/auth/verify?email=${datas.email}`);
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message);
        setIsBusy(false);
      },
    });
  };
  return (
    <>
      <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-2 gap-5">
        <Controller
            name="firstname"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Please enter your email",
              },
            }}
            render={({ field }) => (
              <TextInput
                label="First Name"
                labelClassName="text-[#000000B2] fw-500"
                error={errors.firstname?.message}
                type={InputType.text}
                {...field}
                ref={null}
              />
            )}
          />
           <Controller
            name="lastname"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Please enter your email",
              },
            }}
            render={({ field }) => (
              <TextInput
                label="Last Name"
                labelClassName="text-[#000000B2] fw-500"
                error={errors.lastname?.message}
                type={InputType.text}
                {...field}
                ref={null}
              />
            )}
          />
           <Controller
            name="username"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Please enter your username",
              },
            }}
            render={({ field }) => (
              <TextInput
                label="Username"
                labelClassName="text-[#000000B2] fw-500"
                error={errors.username?.message}
                type={InputType.text}
                {...field}
                ref={null}
              />
            )}
          />
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
                error={errors.email?.message}
                type={InputType.email}
                {...field}
                ref={null}
              />
            )}
          />
          <div className="mt-[4px]">
            <label className="mb-1 block mt-3 fw-500 text-[#000000B2]">
              Phone Number
            </label>
            <PhoneInputWithCountry
              international
              defaultCountry="NG"
              name="phone_no"
              control={control}
              rules={{
                required: true,
                pattern: {
                  value:
                    /\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/,
                  message: "Please Enter A Valid Number",
                },
              }}
              className="border p-2 border-gray-400 rounded outline-none"
            />
            {errors.phone_no && (
              <p className="error text-red-400 text-sm">Invalid Phone Number</p>
            )}
          </div>
          <Controller
            name="gender"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Please enter your email",
              },
            }}
            render={({ field }) => (
                <SelectInput
                label="Gender"
                selectOptions={genderOption}
                selected={field.value}
                boxClassName="rounded-[4px] border border-gray-400 pr-3 pl-2 add-min"
                labelClassName="text-[#828282] block mt-[15px]"
                error={errors.gender?.message}
                {...field}
                ref={null}
              />
            )}
          />
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
                error={errors.password?.message}
                type={InputType.password}
                {...field}
                ref={null}
              />
            )}
          />
          <Controller
            name="confirm_password"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Password is required",
              },
              validate: (val) => {
                if (watch("password") != val) {
                  return "Your passwords do no match";
                }
              },
            }}
            render={({ field }) => (
              <TextInput
                label="Confirm Password"
                labelClassName="text-[#000000B2] fw-500"
                error={errors.confirm_password?.message}
                type={InputType.password}
                {...field}
                ref={null}
              />
            )}
          />
        </div>
        <div className="lg:w-6/12 lg:pr-4 mt-3 lg:mt-5">
              <p className="text-[#000000B2] fw-500">Country</p>
              <Controller
                name="country"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Please enter your email",
                  },
                }}
                render={({ field }) => (
                  <select className="w-full p-3 rounded-md border border-gray-400" {...field}>
                    <option value="">Select an option</option>
                    {
                        countries.all.map((item, i) => (
                            <option value={item.name} key={i}>{item.name}</option>
                        ))
                    }
                  </select>
                )}
              />
            </div>
        <div className="mt-12">
          <Button
            title={isBusy ? <BarsSpinner size={"14"} color="white" /> : "Register"}
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
                <GoogleSignUp/>
            </div>
            <div className="mt-4">
                <p>Already have an account, click here to <Link className="fw-500 text-primary" href={'/auth/login'}>Login</Link></p>
            </div>
      </form>
    </div>
    </>
  );
};

export default RegisterForm;
