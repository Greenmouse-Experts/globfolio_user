import React, { useState } from "react";
import Image from "next/image";
import google from "@/lib/assets/images/google.png";
import { GoogleLogin } from "@react-oauth/google";
import { useMutation } from "@tanstack/react-query";
import { googleSignup } from "@/lib/service/api/authApi";
import { toast } from "react-toastify";
import useAuth from "@/lib/hooks/authUser";
import { useRouter } from "next/navigation";

const GoogleSignUp = () => {
  const [isBusy, setIsBusy] = useState(false)
  const {saveUser} = useAuth()
  const router = useRouter()
  const signUp = useMutation({
    mutationFn: googleSignup,
    mutationKey: ['googleRegister']
  })
  const handleRegister = (data:any) => {
    console.log(data);
    
    const payload = {
      access_token: data.token
    }
    signUp.mutate(payload, {
      onSuccess: (data) => {
        console.log(data);
        
        toast.success("Login Successful");
        setIsBusy(false);
        localStorage.setItem("glob_token", data.data.access_token);
        saveUser({
          name: data.data.fullname,
          email: data.data.email,
          token: data.data.access_token,
          image: data.data.avatar,
          state: "",
          phone: data.data.phone,
          id: data.data.id,
          account: "",
        });
        router.push("/dashboard");
      },
      onError: (error: any) => {
        console.log(error);
        
        toast.error(error?.response?.data?.message);
        setIsBusy(false);
      },
    })
  }
  return (
    <>
      {/* <div className='w-full border cursor-pointer border-gray-400 py-2 rounded-[30px] flex justify-center'>
            <div className='flex items-center gap-x-3'>
                <Image src={google} alt='logo' width={35} height={35}/>
                <p className='whitespace-nowrap fw-500'>Sign up with Google</p>
            </div>
        </div> */}
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
          handleRegister(credentialResponse)
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </>
  );
};

export default GoogleSignUp;
