import ChatMemberList from '@/lib/components/modules/chat/tabs/chatList'
import React from 'react'

const GroupChat = () => {
  return (
    <>
      <div className='border-2 bg-white rounded-[20px] h-[550px]'>
        <div className='w-[300px]'>
          <ChatMemberList/>
        </div>
        <div className='lg:w-[calc(100%_-_300px)] bg-gray-50'>

        </div>
      </div>
    </>
  )
}

export default GroupChat