"use client";
import React, { useState } from "react";
import OtpInput from "react-otp-input";
import Button from "../../ui/Button";
import { BarsSpinner } from "../../ui/Loaders/Spinners";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { resendCode, verifyUser } from "@/lib/service/api/authApi";
import { toast } from "react-toastify";

const OtpVerify = () => {
  const params = useSearchParams();
  const mail = params.get("email");
  const [otp, setOtp] = useState("");
  const router = useRouter();
  const [isBusy, setIsBusy] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const verify = useMutation({
    mutationFn: verifyUser,
    mutationKey: ["verifyUser"],
  });
  const resend = useMutation({
    mutationFn: resendCode,
    mutationKey: ["resendCode"],
  });
  const verifyAction = () => {
    setIsBusy(true);
    const payload = {
      email: mail,
      token: otp,
    };
    verify.mutate(payload, {
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
  const resendToken = () => {
    setIsLoading(true);
    const payload = {
      email: mail,
    };
    resend.mutate(payload, {
      onSuccess: (data) => {
        toast.success(data.message);
        setIsLoading(false);
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message);
        setIsLoading(false);
      },
    });
  };
  return (
    <>
      <div>
        <div className="py-6">
          <OtpInput
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
        <div className="mt-12">
          <Button
            title={
              isBusy ? <BarsSpinner size={"16"} color="white" /> : "Continue"
            }
            disabled={otp.length >= 6 ? false : true}
            onClick={verifyAction}
          />
        </div>
        <div className="mt-5">
          <p>
            Did not recieve a token,{" "}
            <span className="fw-500 cursor-pointer" onClick={resendToken}>
              {isLoading ? (
                <BarsSpinner size={"16"} color="white" />
              ) : (
                "Click to resend"
              )}
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default OtpVerify;
