import React, { FC, useState } from "react";
import MessagingUi from "./messaging";
import ChatWrapper from "./coverImage";

interface Props {
  socket: any;
  item: any;
  select: (value: any) => void;
}
const ChatUiContainer: FC<Props> = ({ socket, item, select }) => {
  return (
    <div className="h-full w-full">
      {!item?.id && <ChatWrapper/>}
      {item?.id && <MessagingUi socket={socket} item={item} select={select}/>}
    </div>
  );
};

export default ChatUiContainer;
