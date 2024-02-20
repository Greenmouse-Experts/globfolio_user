import ChatMemberList from '@/lib/components/modules/chat/tabs/chatList'
import ChatUiContainer from '@/lib/components/modules/chat/tabs/chatUi'
import React from 'react'

const GroupChat = () => {
  return (
    <>
      <div className='border-2 bg-white flex rounded-[20px] h-[550px]'>
        <div className='w-[230px]'>
          <ChatMemberList/>
        </div>
        <div className='lg:w-[calc(100%_-_230px)] bg-gray-50 h-full'>
          <ChatUiContainer/>
        </div>
      </div>
    </>
  )
}

export default GroupChat