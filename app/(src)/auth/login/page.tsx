"use client"
import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../../public/logo.svg";
import LoginForm from "@/lib/components/modules/auth/Loginform";

const LoginPage = () => {
  return (
    <>
      <div className="bg-primary lg:h-screen">
        <div className="w-full h-full bg-login">
        <div className="box h-full place-center">
          <Link href="/" className="lg:hidden absolute top-6 left-2 lg:left-6">
            <Image
              src={logo}
              alt="logo"
              className="w-48"
              width={400}
              height={100}
            />
          </Link>
          
          <div className="lg:w-[550px] my-36 lg:my-0 mx-auto bg-white lg:px-16 p-6">
          <Image
              src='https://res.cloudinary.com/greenmouse-tech/image/upload/v1689001814/globfolio/Group_48319_zrfe2h.png'
              alt="logo"
              className="w-44 mx-auto my-6 hidden lg:block"
              width={400}
              height={80}
            />
            <div className="mt-6 lg:mt-6">
              <p className="text-xl fw-600">User Login</p>
              <p className="mt-3 fs-500">Fill in your credentials to login to your dashboard</p>
            </div>
            <div className="my-8 lg:my-8 mx-auto">
              <LoginForm />
            </div>
          </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;