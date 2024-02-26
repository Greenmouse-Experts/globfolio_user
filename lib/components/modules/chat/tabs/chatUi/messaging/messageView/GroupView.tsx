import useAuth from "@/lib/hooks/authUser";
import useDialog from "@/lib/hooks/useDialog";
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
import { RiArrowDropDownLine } from "react-icons/ri";
import { BsCheck2All, BsCheckAll } from "react-icons/bs";
import { FcCancel } from "react-icons/fc";
import { isFile, isImage, isLink } from "@/lib/utils/formatHelp";
import useChatStore from "@/lib/store/chatStore";
const dayjs = require("dayjs");
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

interface Props {
  socket: any;
  roomId: string;
  respond: any;
}
const GroupView: FC<Props> = ({ socket, roomId, respond }) => {
  const { userId: id } = useAuth();
  const addChat = useChatStore((state) => state.addChat);
  const chatMsgs = useChatStore((state) => state.chat);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [newMsg, setNewMsg] = useState<any>();
  const [reply, setReply] = useState(false);
  const [replyItem, setReplyItem] = useState<any>();
  const [selectedItem, setSelectedItem] = useState<any>();
  const { Dialog: Delete, setShowModal: showDelete } = useDialog();
  // Runs whenever a socket event is recieved from the server
  const getMessages = () => {
    socket.on("chatroom_messages", (data: any) => {
      if (data.msgs) {
        console.log(data);
        const needed = data?.msgs.map(
          ({
            sender,
            owner,
            message,
            createdAt,
            id,
            files,
            areplyTo,
          }: any) => ({
            sender,
            owner: owner.fullname,
            message,
            createdAt,
            id,
            files,
            reply: areplyTo,
          })
        );
        addChat(needed);
      } else {
        const add = {
          sender: data.msg.sender,
          owner: data.msg.owner.fullname,
          message: data.msg.message,
          createdAt: data.msg.createdAt,
          id: data.msg.id,
          files: data.msg.files,
          reply: data.msg.areplyTo,
        };
        setNewMsg(add);
      }
    });
    // Remove event listener on component unmount
    return () => socket.off("chatroom_listen");
  };
  useEffect(() => {
    if (newMsg) {
      const newChat = [...chatMsgs, newMsg];
      addChat(newChat);
    }
  }, [newMsg]);
  useEffect(() => {
    getMessages();
  }, [socket]);
  const myMsg = chatMsgs;
  const showMsg = [...myMsg];

  const msg = showMsg.sort((first: any, second: any) =>
    second.createdAt.localeCompare(first.createdAt, undefined, {
      numeric: true,
    })
  );

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
    closeReply();
  }, [myMsg]);

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
  // const deleteMsg = async (item: any) => {
  //   console.log(item);
  //   const payload = {
  //     message_id: item,
  //     chatroom_id: roomId,
  //   };
  //   await delChat(payload)
  //     .then((res: any) => {
  //       if (res.isSuccess) {
  //         toast.success(res.data.message);
  //         filterDeleted(item);
  //         showDelete(false);
  //       } else {
  //         toast.error(res.data.message);
  //       }
  //     })
  //     .catch((err) => {});
  // };
  const filterDeleted = (item: any) => {
    const mgs = [...myMsg];
    const filtered = mgs.filter((where) => where.id !== item);
    addChat(filtered);
    //   dispatch(saveInitailMsg(filtered));
  };

  const viewRef = useRef<HTMLDivElement | null>(null);
  const goToView = (id: any) => {
    const container = document.getElementById(id);
    container?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <div className="h-[400px] lg:h-[425px] 2xl:h-[500px] relative bg-gray-100 grid content-end">
        <div className="p-2 lg:px-5 grid-container chat" ref={scrollRef}>
          {msg &&
            msg.reverse().map((item: any, index: number) => (
              <div
                key={index}
                className={`flex h-auto ${item.sender === id && "justify-end"}`}
              >
                <div
                  className={`mt-1 lg:mt-2 p-2 lg:p-4 pt-3  lg:max-w-[425px] 2xl:max-w-[500px] ${
                    item.sender === id
                      ? "bg-primary text-white rounded-l-[15px] rounded-b-[15px]"
                      : "bg-blue-100 rounded-b-[15px] rounded-r-[15px]"
                  }`}
                  ref={viewRef}
                  id={item.id}
                >
                  <div className="flex items-center justify-between">
                    <p className="fw-600 fs-200 mb-1">{item.owner}</p>
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
                          <MenuItem
                            placeholder={""}
                            onClick={() => replyMessage(item)}
                          >
                            Reply
                          </MenuItem>
                          {item.sender === id && (
                            <MenuItem
                              placeholder={""}
                              onClick={() => openDelete(item)}
                            >
                              Delete
                            </MenuItem>
                          )}
                        </MenuList>
                      </Menu>
                    </div>
                  </div>
                  {item?.reply?.id ? (
                    item.sender === id ? (
                      <div
                        className="bg-gray-800 mb-2"
                        onClick={() => goToView(item.reply.id)}
                      >
                        <p className="fs-500 border-l-2 p-2">
                          {item?.reply.message}
                        </p>
                      </div>
                    ) : (
                      <div
                        className="bg-gray-100 mb-2"
                        onClick={() => goToView(item.reply.id)}
                      >
                        <p className="fs-500 border-l-[3px] border-blue-500 p-2">
                          {item?.reply.message}
                        </p>
                      </div>
                    )
                  ) : (
                    ""
                  )}
                  <div>
                    {!!item?.files?.length && isImage(item.files[0]) ? (
                      <div className="">
                        <Image
                          src={item.files[0]}
                          alt="msg"
                          width={300}
                          height={400}
                          className="w-48 h-auto object-cover"
                        />
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
                  <p className="fs-400 lg:fs-500">
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
                  <div className="flex justify-between items-center mt-1 lg:mt-2">
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
      <Delete title="" size="md">
        <></>
        {/* <ReusableModal
        title="Are you sure you want to delete this chat"
        cancelTitle="No, Back"
        actionTitle="Yes, Delete"
        action={() => deleteMsg(selectedItem)}
        closeModal={() => showDelete(false)}
      /> */}
      </Delete>
    </>
  );
};

export default GroupView;
