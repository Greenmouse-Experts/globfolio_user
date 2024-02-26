"use client"
import ChatMemberList from '@/lib/components/modules/chat/tabs/chatList'
import ChatUiContainer from '@/lib/components/modules/chat/tabs/chatUi'
import useChatStore from '@/lib/store/chatStore';
import React, { useState } from 'react'
import io from 'socket.io-client';


const socket = io('https://server.globfolio.com/');
const GroupChat = () => {
  const [activeChat, setActiveChat] = useState<any>()
  const clearChat = useChatStore((state) => state.clearChat)
  const selectActive = (item:any) => {
    setActiveChat(item)
    clearChat()
  }

  return (
    <>
      <div className='border-2 bg-white lg:flex rounded-[20px] pb-3 lg:pb-0 h-auto lg:h-[550px] 2xl:h-[620px]  overflow-hidden'>
        <div className='lg:w-[230px]'>
          <ChatMemberList select={selectActive} item={activeChat}/>
        </div>
        <div className='lg:w-[calc(100%_-_230px)] bg-gray-50 h-full'>
          <ChatUiContainer socket={socket} select={selectActive} item={activeChat}/>
        </div>
      </div>
    </>
  )
}

export default GroupChat