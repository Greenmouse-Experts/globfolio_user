import React, { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { resetPass } from '@/lib/service/api/authApi';
import OTPInput from 'react-otp-input';
import Button from '../../ui/Button';
import { BarsSpinner } from '../../ui/Loaders/Spinners';
import { Controller, useForm } from 'react-hook-form';
import TextInput, { InputType } from '../../ui/TextInput';
import { toast } from 'react-toastify';

const ResetForm = () => {
    const params = useSearchParams();
    const mail = params.get("email");
    const [otp, setOtp] = useState("");
    const router = useRouter();
    const [isBusy, setIsBusy] = useState(false);
    const reset = useMutation({
      mutationFn: resetPass,
      mutationKey: ["resetpass"],
    });
    const {
        control,
        handleSubmit,
        watch,
        formState: { errors, isValid },
      } = useForm({
        mode: "onChange",
        defaultValues: {
            token: "",
            password: "",
            email: mail,
            confirm_password: ""
        },
      });
    const verifyAction = (data:any) => {
      setIsBusy(true);
      const payload = {
        email: mail,
        token: otp,
        password: data.password
      };
      reset.mutate(payload, {
        onSuccess: (data) => {
          toast.success(data.message);
          setIsBusy(false);
          router.push("/auth/login");
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
          <div className="py-4">
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span className="px-3">-</span>}
              renderInput={(props) => (
                <input
                  {...props}
                  className="!w-full border border-gray-400 h-12 rounded text-3xl"
                />
              )}
            />
          </div>
            <form onSubmit={handleSubmit(verifyAction)}>
            <Controller
            name="email"
            control={control}
            disabled
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
                type={InputType.text}
                {...field}
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
                label="New Password"
                labelClassName="text-[#000000B2] fw-500"
                error={errors.password?.message}
                type={InputType.password}
                {...field}
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
                label="Confirm New Password"
                labelClassName="text-[#000000B2] fw-500"
                error={errors.confirm_password?.message}
                type={InputType.password}
                {...field}
              />
            )}
          />
          <div className="mt-12">
            <Button
              title={
                isBusy ? <BarsSpinner size={"16"} color="white" /> : "Continue"
              }
              disabled={(otp.length >= 6 && isValid) ? false : true}
              onClick={verifyAction}
            />
          </div>
            </form>
        </div>
      </>
    );
}

export default ResetForm