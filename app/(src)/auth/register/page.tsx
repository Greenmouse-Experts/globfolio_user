import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import logo from "../../../../public/logo.svg";
import RegisterForm from '@/lib/components/modules/auth/Registerform';

const RegisterUser = () => {
  return (
    <>
      <div className="bg-primary min-h-[100vh]">
        <div className="w-full h-full bg-login">
        <div className="box h-full place-center lg:py-24">
          <Link href="/" className="lg:hidden absolute top-6 left-2 lg:left-6">
            <Image
              src={logo}
              alt="logo"
              className="w-48"
              width={400}
              height={100}
            />
          </Link>
          
          <div className="lg:w-[750px] my-36 lg:my-0 mx-auto bg-white lg:px-16 p-6">
          <Image
              src='https://res.cloudinary.com/greenmouse-tech/image/upload/v1689001814/globfolio/Group_48319_zrfe2h.png'
              alt="logo"
              className="w-44 mx-auto my-6 hidden lg:block"
              width={400}
              height={80}
            />
            <div className="mt-6 lg:mt-6">
              <p className="text-xl fw-600">Sign Up</p>
              <p className="mt-3 fs-500">Fill in your credentials to sign up on this platform</p>
            </div>
            <div className="my-8 lg:my-8 mx-auto">
              <RegisterForm />
            </div>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}

export default RegisterUser