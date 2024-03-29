import React from 'react'

const ChatWrapper = () => {
  return (
    <div className='w-full relative h-[450px] lg:h-full bg-primary z-0'>
        <div className='absolute top-0 left-0 w-full h-full bg-login z-10 place-center'>
            <div className='px-4 lg:px-0'>
                <p className='syne text-2xl text-gray-400 text-center'>Welcome To Globfolio Community</p>
                <div className='flex justify-center'>
                <p className='fw-500 px-4 py-1 bg-gray-400 rounded-lg mt-5 cursor-disabled'>Exolore</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ChatWrapper