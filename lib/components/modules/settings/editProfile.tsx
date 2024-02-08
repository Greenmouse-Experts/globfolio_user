import React, { useState } from "react";
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

const EditProfile = () => {
    console.log(countries);
    
  const [isBusy, setIsBusy] = useState(false);
  const {
    control,
    handleSubmit,
    watch,
    formState: { isValid, errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      phone_no: "",
      gender: "",
      username: "",
      country: "",
      firstname: "",
      lastname: "",
    },
  });
  const mutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      toast.success(data.message);
      setIsBusy(false);
      close();
    },
    onError: (error) => {
      toast.error(error.message);
      setIsBusy(false);
    },
  });
  const onSubmit = async (data: any) => {
    setIsBusy(true);
    const payload = {
      password: data.old_password,
      new_assword: data.new_password,
      confirm_password: data.new_password_confirmation,
    };
    mutation.mutate(payload);
  };
  return (
    <>
      <div>
        <form>
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
                  labelClassName="text-[#828282] block mt-[15px]"
                  error={errors.gender?.message}
                  {...field}
                  ref={null}
                />
              )}
            />

            <div>
              <p className="text-[#828282] block mt-[15px]">Country</p>
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
                  <select className="" {...field}>
                    <option value="">Select an option</option>
                    {/* {
                        countries.all.
                    } */}
                  </select>
                )}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditProfile;
