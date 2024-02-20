import { ChatRoomItemType } from '@/lib/contracts/chat'
import { getGroups } from '@/lib/service/api/chatApi'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import React from 'react'

const GroupList = () => {
  const {data, isLoading} = useQuery({
    queryFn: getGroups,
    queryKey: ["groups"]
  })
  return (
    <div className='grid gap-1'>
      {isLoading && <p className='fs-400 fw-500 py-4 text-center'>Loading...</p>}
      {
        data?.data?.map((item:ChatRoomItemType, i:number) => (
          <div key={i} className='flex gap-x-1 cursor-pointer hover:bg-gray-200 rounded-md p-2'>
            <div>
                <Image src={item.banner} alt='banner' width={40} height={40} className='w-9 circle aspect-square'/>
            </div>
            <div>
              <p className='fs-400 fw-500'>{item.title}</p>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default GroupList