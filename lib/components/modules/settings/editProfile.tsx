import React, { FC, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-phone-number-input/style.css";
import PhoneInputWithCountry from "react-phone-number-input/react-hook-form";
import { updateProfile } from "@/lib/service/api/authApi";
import TextInput, { InputType } from "../../ui/TextInput";
import SelectInput from "../../ui/SelectInput";
import { genderOption } from "@/lib/utils/hardData";
import {countries} from 'country-data-list';
import Button from "../../ui/Button";
import { BarsSpinner } from "../../ui/Loaders/Spinners";
import useAuth from "@/lib/hooks/authUser";

interface Props {
    close: () => void
}
const EditProfile:FC<Props> = ({close}) => {
    const {user, firstName, lastName, saveUser} = useAuth()
  const [isBusy, setIsBusy] = useState(false);
  const {
    control,
    handleSubmit,
    watch,
    formState: { isValid, errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      phone_no: user.phone || "",
      gender: user.gender || "",
    //   username: user.username || "",
      country: user.country || "",
      firstname: firstName ||  "",
      lastname: lastName || "",
    },
  });
  const mutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      toast.success(data.message);
      saveUser({
        ...user,
        phone: data.data.phone_no,
        country: data.data.country,
        name: data.data.fullname
      })
      setIsBusy(false);
      close();
    },
    onError: (error) => {
      toast.error(error.message);
      setIsBusy(false);
    },
  });
  const onSubmit = async (data: any) => {
    console.log(data);
    
    setIsBusy(true);
    const payload = {
      fullname: `${data.firstname} ${data.lastname}`,
      country: data?.country,
      phone_no: data?.phone_no,
      gender: data?.gender
    }
    mutation.mutate(payload);
  };
  return (
    <>
      <div className="lg:px-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid lg:grid-cols-2 gap-5 w-full">
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
            {/* <Controller
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
            /> */}
            <div className="">
              <label className="mb-1 block  fw-500 text-[#000000B2]">
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
                <p className="error text-red-400 text-sm">
                  Invalid Phone Number
                </p>
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
                  labelClassName="text-[#000000B2] fw-500 mt-[15px]"
                  error={errors.gender?.message}
                  {...field}
                  ref={null}
                />
              )}
            />

            <div>
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
                  <select className="w-full p-3 rounded-lg border border-gray-400" {...field}>
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
          </div>
          <div className="mt-12">
          <Button
            title={isBusy ? <BarsSpinner size={"16"} color="white" /> : "Update"}
            disabled={!isValid}
          />
        </div>
        </form>
      </div>
    </>
  );
};

export default EditProfile;
