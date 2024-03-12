import EmptyGif from "@/lib/components/ui/EmptyState/EmptyGif";
import useAuth from "@/lib/hooks/authUser";
import useChatStore from "@/lib/store/chatStore";
import { isFile, isImage, isLink } from "@/lib/utils/formatHelp";
import Image from "next/image";
import React, { FC, useEffect, useRef, useState } from "react";
import { AiOutlineFileText } from "react-icons/ai";
import { BiTime } from "react-icons/bi";
import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Button,
} from "@/lib/components/ui/TailwindComp";
import { BsCheck2All, BsCheckAll } from "react-icons/bs";
import { RiArrowDropDownLine } from "react-icons/ri";
import useDialog from "@/lib/hooks/useDialog";
import { FcCancel } from "react-icons/fc";
const dayjs = require("dayjs");
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);
interface Props {
  socket: any;
  roomId: string;
  respond: any;
}
const PrivateView: FC<Props> = ({ socket, roomId, respond }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { userId: id } = useAuth();
  const addChat = useChatStore((state) => state.addChat);
  const chatMsgs = useChatStore((state) => state.chat);
  const [reply, setReply] = useState(false);
  const [replyItem, setReplyItem] = useState<any>();
  const [selectedItem, setSelectedItem] = useState<any>();
  const { Dialog: Delete, setShowModal: showDelete } = useDialog();
  // Runs whenever a socket event is recieved from the server
  const getMessages = () => {
    socket.on(id, (data: any) => {
      if (data.msgs) {
        const needed = data?.msgs.map(
          ({ afrom, message, createdAt, id, files, areplyTo }: any) => ({
            sender: afrom.id,
            owner: afrom.fullname,
            username: afrom.username,
            message,
            createdAt,
            id,
            files,
            reply: areplyTo,
          })
        );
        addChat(needed);
      }
    });

    // Remove event listener on component unmount
    return () => socket.off("chatroom_listen");
  };
  useEffect(() => {
    getMessages();
  }, [socket]);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [socket]);

  const showMsg = [...chatMsgs];

  const msg = showMsg.sort((first: any, second: any) =>
    second.createdAt.localeCompare(first.createdAt, undefined, {
      numeric: true,
    })
  );
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatMsgs]);
  const viewRef = useRef<HTMLDivElement | null>(null);
  const goToView = (id: any) => {
    const container = document.getElementById(id);
    container?.scrollIntoView({ behavior: "smooth" });
  };
  const replyMessage = (item: any) => {
    setReplyItem(item);
    respond(item);
    setReply(true);
  };
  const closeReply = () => {
    setReplyItem("");
    respond("");
    setReply(false);
  };
  const openDelete = (item: any) => {
    setSelectedItem(item.id);
    showDelete(true);
  };
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
    closeReply();
  }, [chatMsgs]);
  return (
    <>
      <div className="h-[400px] lg:h-[425px] 2xl:h-[500px] relative bg-gray-100 grid content-end">
        {!!msg.length && (
          <div
            className="bg-gray-100 py-5 px-5 grid-container chat"
            ref={scrollRef}
          >
            {msg &&
              msg.reverse().map((item: any, index: number) => (
                <div
                  key={index}
                  className={`flex h-auto ${
                    item.sender === id && "justify-end"
                  }`}
                >
                  <div
                    className={`mt-2 p-4 pt-3 rounded-lg ${
                      item.sender === id
                        ? "bg-primary text-white"
                        : "bg-blue-100"
                    }`}
                    ref={viewRef}
                    id={item.id}
                  >
                    <div className="flex items-center justify-between">
                      <p className="fw-600 fs-200 mb-1">{item.username || "Anonymous"}</p>
                      <div>
                        <Menu>
                          <MenuHandler>
                            <Button
                              placeholder={""}
                              className="p-0 bg-transparent !shadow-none"
                            >
                              <RiArrowDropDownLine className="cursor-pointer text-gray-600 text-3xl" />
                            </Button>
                          </MenuHandler>
                          <MenuList placeholder={""} className="p-2">
                            <MenuItem placeholder={""} onClick={() => replyMessage(item)}>
                              Reply
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </div>
                    </div>
                    <div>
                      {item?.reply?.id ? (
                        item.sender === id ? (
                          <div
                            className="bg-gray-800 mb-2"
                            onClick={() => goToView(item.reply.id)}
                          >
                            <div className="fs-500 border-l-2 p-2">
                              {!!item?.reply?.files?.length &&
                                isImage(item.reply.files[0]) && (
                                  <div>
                                    <Image
                                      src={item.reply.files[0]}
                                      alt="msg"
                                      width={300}
                                      height={400}
                                      className="w-6 circle"
                                    />
                                  </div>
                                )}
                              {item?.reply.message}
                            </div>
                          </div>
                        ) : (
                          <div
                            className="bg-gray-100 mb-2"
                            onClick={() => goToView(item.reply.id)}
                          >
                            <div className="fs-500 border-l-[3px] border-blue-500 p-2">
                              {!!item?.reply?.files?.length &&
                                isImage(item.reply.files[0]) && (
                                  <div>
                                    <Image
                                      src={item.reply.files[0]}
                                      alt="msg"
                                      width={300}
                                      height={400}
                                      className="w-6 circle"
                                    />
                                  </div>
                                )}
                              {item?.reply.message}
                            </div>
                          </div>
                        )
                      ) : (
                        ""
                      )}
                      <div>
                        {!!item?.files?.length && isImage(item.files[0]) ? (
                          <div>
                            <a
                              href={item.files[0]}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Image
                                src={item.files[0]}
                                alt="msg"
                                width={300}
                                height={400}
                                className="w-48"
                              />
                            </a>
                          </div>
                        ) : isFile(item.files[0]) ? (
                          <a
                            href={item.files[0]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="my-2"
                          >
                            <AiOutlineFileText className="text-7xl mx-auto opacity-70" />
                          </a>
                        ) : (
                          ""
                        )}
                      </div>
                      <p className="fs-500">
                        {isLink(item.message) ? (
                          <a
                            href={item.message}
                            target="_blank"
                            className="fw-500 text-blue-700"
                            rel="noopener noreferrer"
                          >
                            {item.message}
                          </a>
                        ) : (
                          item.message
                        )}
                      </p>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center gap-x-1">
                        <BiTime
                          className={`text-sm ${
                            item.from === "user" ? "" : "text-gray-500"
                          }`}
                        />
                        <p className="italic text-xs">
                          {dayjs(item.createdAt).fromNow()}
                        </p>
                      </div>
                      <div>
                        {item.status === "delivered" ? (
                          <BsCheck2All
                            className={`text-xl ${
                              item.from === "user" ? "" : "text-gray-500"
                            }`}
                          />
                        ) : (
                          <BsCheckAll
                            className={`text-xl ${
                              item.from === "user" ? "" : "text-gray-500"
                            }`}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
        {reply && (
          <div className="absolute bottom-0 left-0 w-full px-3">
            <div className="bg-white p-4 shadow relative rounded-t-[8px]">
              <div>
                {!!replyItem?.files?.length && isImage(replyItem.files[0]) ? (
                  <div>
                    <Image
                      src={replyItem.files[0]}
                      alt="msg"
                      width={300}
                      height={400}
                      className="w-48 h-auto"
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
              <p className="fs-500">
                {isLink(replyItem.message) ? (
                  <a
                    href={replyItem.message}
                    target="_blank"
                    className="fw-500 text-blue-700"
                    rel="noopener noreferrer"
                  >
                    {replyItem.message}
                  </a>
                ) : (
                  replyItem.message
                )}
              </p>
              <FcCancel
                className="absolute top-2 right-5 curpointer text-2xl"
                onClick={closeReply}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PrivateView;
