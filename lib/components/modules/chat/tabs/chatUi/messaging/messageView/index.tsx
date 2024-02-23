import useAuth from "@/lib/hooks/authUser";
import React, { FC, useEffect, useRef, useState } from "react";
import PrivateView from "./PrivateView";
import GroupView from "./GroupView";
import CubeLoader from "@/lib/components/ui/Loaders/CubeLoader/CubeLoader";
import { joinChatGroup } from "@/lib/service/api/chatApi";
import { toast } from "react-toastify";
import Link from "next/link";
import useChatStore from "@/lib/store/chatStore";
// dayjs time format
const dayjs = require("dayjs");
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

interface Props {
  socket: any;
  roomId: string;
  respond: any;
  item: any;
}
const MessagingView: FC<Props> = ({ socket, roomId, item, respond }) => {
  const [checking, setChecking] = useState(true);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const clearMsg = useChatStore((state) => state.clearChat)
  const { userId: id } = useAuth();
  const selectConnect = () => {
    setLoading(true);
    if (item.access) {
      const data = {
        chatroomId: item.id,
        userId: id,
        reload_messages: true,
      };
      console.log(data);
      socket.emit("chatroom_listen", data);
      setLoading(false);
    } else {
      const data = {
        to: item.id,
        from: id,
        reload_messages: true,
      };
      socket.emit("chatroom_listen", data);
      setLoading(false);
    }
  };
  const openGroup = (item: string) => {
    setLoading(true);
    joinChatGroup(item)
      .then((res) => {
        setLoading(false);
        setChecking(false);
        selectConnect();
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setLoading(false);
        setShowError(true);
      });
  };
  useEffect(() => {
    clearMsg()
    setChecking(true)
    setShowError(false);
    openGroup(item.id);
  }, [item]);
  return (
    <>
      {loading && checking && (
        <div className="place-center h-[400px] lg:h-[425px] 2xl:h-[500px] ">
          <CubeLoader size={1.0} />
        </div>
      )}
      {!item.access
        ? !loading && (
            <PrivateView socket={socket} roomId={roomId} respond={respond} />
          )
        : !loading &&
          !checking && (
            <GroupView socket={socket} roomId={roomId} respond={respond} />
          )}
      {showError && (
        <div className="h-[400px] lg:h-[425px] 2xl:h-[500px] place-center">
          <div>
            <p className="lg:w-9/12 mx-auto text-center !syne">
              You Cannot Access this chat room. Please upgrade your subscription
              to gain access
            </p>
            <div className="mt-6 flex justify-center">
              <Link href={"/subscription"} className="btn-primary px-5 py-2">
                Goto Subscription
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MessagingView;
