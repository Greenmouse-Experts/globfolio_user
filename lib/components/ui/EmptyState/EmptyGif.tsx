import Image from 'next/image'
import React, { FC } from 'react'

interface Props{
    msg: string
}
const EmptyGif:FC<Props> = ({msg}) => {
  return (
    <div className='place-center'>
        <div className=''>
            <Image src={'https://res.cloudinary.com/greenmouse-tech/image/upload/v1708443026/GuardMaster/no_data_found_1_ey1tal.gif'} alt='emptyGif' width={300} height={250} className='w-60 mx-auto'/>
            <p className='text-center w-8/12 mt-6 mx-auto'>{msg}</p>
        </div>
    </div>
  )
}

export default EmptyGif