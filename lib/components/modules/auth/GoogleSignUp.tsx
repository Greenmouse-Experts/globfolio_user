import React from 'react'
import Image from 'next/image'
import google from '@/lib/assets/images/google.png'

const GoogleSignUp = () => {
  return (
    <>
        <div className='w-full border cursor-pointer border-gray-400 py-2 rounded-[30px] flex justify-center'>
            <div className='flex items-center gap-x-3'>
                <Image src={google} alt='logo' width={35} height={35}/>
                <p className='whitespace-nowrap fw-500'>Sign up with Google</p>
            </div>
        </div>
    </>
  )
}

export default GoogleSignUp