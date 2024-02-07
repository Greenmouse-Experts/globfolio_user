import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../../public/logo.svg";
import OtpVerify from "@/lib/components/modules/auth/OtpVerify";

const VerifyOtp = () => {
  return (
    <>
      <div className="bg-primary h-screen">
        <div className="w-full h-full bg-login">
          <div className="box h-full place-center">
            <Link
              href="/"
              className="lg:hidden absolute top-6 left-2 lg:left-6"
            >
              <Image
                src={logo}
                alt="logo"
                className="w-48"
                width={400}
                height={100}
              />
            </Link>

            <div className="lg:w-[550px] mx-auto bg-white lg:px-16 p-6">
              <Image
                src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1689001814/globfolio/Group_48319_zrfe2h.png"
                alt="logo"
                className="w-44 mx-auto my-6 hidden lg:block"
                width={400}
                height={80}
              />
              <div className="mt-6 lg:mt-6">
                <p className="text-xl fw-600">Email Verification</p>
                <p className="mt-3 fs-500">
                  Please input the OTP forwarded to your mail
                </p>
              </div>
              <div className="my-8 lg:my-8 mx-auto">
                <OtpVerify />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyOtp;
