import { forgetPass } from '@/lib/service/api/authApi';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import TextInput, { InputType } from '../../ui/TextInput';
import Button from '../../ui/Button';
import { BarsSpinner } from '../../ui/Loaders/Spinners';
import Link from 'next/link';

const ForgetInput = () => {
    const [isBusy, setIsBusy] = useState(false);
    const router = useRouter();
    const login = useMutation({
      mutationFn: forgetPass,
      mutationKey: ["forgetpass"],
    });
    const {
      control,
      handleSubmit,
      formState: { errors, isValid },
    } = useForm({
      mode: "onChange",
      defaultValues: {
        email: "",
      },
    });
  
    const onSubmit = (datas: any) => {
      setIsBusy(true);
      login.mutate(datas, {
        onSuccess: (data) => {
          toast.success(data.message);
          setIsBusy(false);
          router.push(`/auth/reset?email=${datas.email}`)
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
                  error={errors.email?.message}
                  type={InputType.email}
                  {...field}
                />
              )}
            />
          </div>
          <div className="mt-12">
            <Button
              title={isBusy ? <BarsSpinner size={"18"} color="white" /> : "Continue"}
              disabled={!isValid}
            />
          </div>
              <div className="mt-4">
                  <p>Remembered passoword ? click here to <Link className="fw-500 text-primary" href={'/auth/login'}>Login</Link></p>
              </div>
        </form>
      </div>
    );
}

export default ForgetInput