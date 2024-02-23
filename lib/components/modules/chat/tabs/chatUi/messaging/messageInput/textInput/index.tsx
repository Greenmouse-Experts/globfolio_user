import React, { FC, useState } from "react";
import { RiSendPlane2Fill } from "react-icons/ri";

interface Props {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  sendMessage: (e: any) => void;
  replyMessage: (e: any) => void;
  response: any;
}
const TextAreaInput: FC<Props> = ({
  replyMessage,
  sendMessage,
  response,
  message,
  setMessage,
}) => {
  return (
    <div className="w-full">
      <form
        className="flex w-full"
        onSubmit={response?.id ? replyMessage : sendMessage}
      >
        <input
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          placeholder="Enter Your Message..."
          className="w-full outline-none"
        />
        <RiSendPlane2Fill
          className="text-2xl text-primary"
          onClick={
            response?.message
              ? (e: any) => replyMessage(e)
              : (e: any) => sendMessage(e)
          }
        />
      </form>
    </div>
  );
};

export default TextAreaInput;
