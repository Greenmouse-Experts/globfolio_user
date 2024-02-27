import React, { useState } from "react";
import Image from "next/image";
import google from "@/lib/assets/images/google.png";
import { useGoogleLogin } from "@react-oauth/google";
import { useMutation } from "@tanstack/react-query";
import { googleSignup } from "@/lib/service/api/authApi";
import { toast } from "react-toastify";
import useAuth from "@/lib/hooks/authUser";
import { useRouter } from "next/navigation";
import useRoutine from "@/lib/hooks/useRoutine";
import { BarsSpinner } from "../../ui/Loaders/Spinners";

const GoogleSignUp = () => {
  const [isBusy, setIsBusy] = useState(false);
  const { saveUser } = useAuth();
  const {saveSub} = useRoutine()
  const router = useRouter();
  const signUp = useMutation({
    mutationFn: googleSignup,
    mutationKey: ["googleRegister"],
  });
  const handleRegister = (data: any) => {
    setIsBusy(true)
    const payload = {
      access_token: data.access_token,
    };
    signUp.mutate(payload, {
      onSuccess: (data) => {
        toast.success("Login Successful");
        setIsBusy(false);
        localStorage.setItem("glob_token", data.data.access_token);
        saveUser({
          name: data.data.fullname,
          email: data.data.email,
          token: data.data.access_token,
          image: data.data.avatar,
          country: data.data.country,
          phone: data.data.phone_no,
          joined: data.data.createdAt,
          gender: data.data.gender,
          email_verify: data.data.email_verify,
          id: data.data.id,
          account: "",
          username: data.data.userName
        });
        saveSub({
          ...data.data.Subscription,
          planId: data.data.Subscription.id,
        })
        router.push("/dashboard");
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message);
        setIsBusy(false);
      },
    });
  };
  const registerUser = useGoogleLogin({
    onSuccess: (codeResponse) => {
      handleRegister(codeResponse);
    },
    onError: (error) => console.log("Login Failed:", error),
  });
  return (
    <>
      <div
        className="w-full border cursor-pointer border-gray-400 py-2 rounded-[30px] flex justify-center"
        onClick={() => registerUser()}
      >
       {!isBusy && <div className="flex items-center gap-x-3">
          <Image src={google} alt="logo" width={35} height={35} />
          <p className="whitespace-nowrap fw-500">Sign up with Google</p>
        </div>}
        {isBusy &&  <BarsSpinner size={"17"} color="#111827" />}
      </div>
    </>
  );
};

export default GoogleSignUp;
