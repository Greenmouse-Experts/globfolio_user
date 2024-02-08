import React, { FC, useState } from 'react'
import Button from '../../ui/Button';
import { BarsSpinner } from '../../ui/Loaders/Spinners';
import TextInput, { InputType } from '../../ui/TextInput';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { updatePassword } from '@/lib/service/api/authApi';

interface Props {
    close: () => void
}
const ChangePassword:FC<Props>= ({close}) => {
    const [isBusy, setIsBusy] = useState(false);
    const {
      control,
      handleSubmit,
      watch,
      formState: { isValid, errors },
    } = useForm({
      mode: "onChange",
      defaultValues: {
        new_password: "",
        old_password: "",
        new_password_confirmation: "",
      },
    });
    const mutation = useMutation({
      mutationFn: updatePassword,
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
        <div className="px-3">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <Controller
                name="old_password"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                }}
                render={({ field }) => (
                  <TextInput
                    label="Old Password"
                    labelClassName="text-[#000000B2] fw-500"
                    placeholder="*********"
                    error={errors.old_password?.message}
                    type={InputType.password}
                    {...field}
                    ref={null}
                  />
                )}
              />
              <Controller
                name="new_password"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                }}
                render={({ field }) => (
                  <TextInput
                    label="New Password"
                    labelClassName="text-[#000000B2] fw-500"
                    placeholder="*********"
                    error={errors.new_password?.message}
                    type={InputType.password}
                    {...field}
                    ref={null}
                  />
                )}
              />
              <Controller
                name="new_password_confirmation"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                  validate: (val) => {
                    if (watch("new_password") != val) {
                      return "Your passwords do no match";
                    }
                  },
                }}
                render={({ field }) => (
                  <TextInput
                    label="Confirm New Password"
                    labelClassName="text-[#000000B2] fw-500"
                    placeholder="*********"
                    error={errors.new_password_confirmation?.message}
                    type={InputType.password}
                    {...field}
                    ref={null}
                  />
                )}
              />
            </div>
            <div className="mt-7">
              <Button title={isBusy ? <BarsSpinner size={"16"} color="white" /> : "Submit"} isBusy={isBusy} disabled={!isValid} />
            </div>
          </form>
        </div>
      </>
    );
}

export default ChangePassword