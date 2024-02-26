import React, { FC, useEffect, useState } from "react";
import MessagingInput from "./messageInput";
import MessagingView from "./messageView";
import MessageHead from "./messageHead";
import useAuth from "@/lib/hooks/authUser";
import useChatStore from "@/lib/store/chatStore";

interface Props {
  socket: any;
  item: any;
  select: (value: any) => void;
}
const MessagingUi: FC<Props> = ({ socket, item, select }) => {
  const addChat = useChatStore((state) => state.addChat);
  const chatMsgs = useChatStore((state) => state.chat);
  const [newMsg, setNewMsg] = useState<any>();
  const followUp = () => {
    socket.on("private_messages", (data: any) => {
      const add =
        {
          sender: data.msg.afrom.id,
          owner: data.msg.afrom.fullname,
          message: data.msg.message,
          createdAt: data.msg.createdAt,
          id: data.msg.id,
          files: data.msg.files,
        }
        setNewMsg(add)
    });
  };
  useEffect(() => {
    if (newMsg) {
      const newChat = [...chatMsgs, newMsg];
      addChat(newChat);
    }
  }, [newMsg]);
  const [reply, setReply] = useState<any>(); 
  return (
    <div>
      <div>
        <MessageHead item={item} select={select}/>
      </div>
      <div>
        <MessagingView
          socket={socket}
          roomId={item?.id}
          item={item}
          respond={setReply}
        />
      </div>
      <div className="px-3">
        <MessagingInput
          socket={socket}
          item={item}
          followPrivate={followUp}
          response={reply}
        />
      </div>
    </div>
  );
};

export default MessagingUi;
