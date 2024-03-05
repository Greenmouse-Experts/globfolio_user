import CubeLoader from "@/lib/components/ui/Loaders/CubeLoader/CubeLoader";
import { ChatRoomMemberList } from "@/lib/contracts/chat";
import { getChatRoomUsers } from "@/lib/service/api/chatApi";
import { useQuery } from "@tanstack/react-query";
import React, { FC } from "react";
import { MdOutlineMarkUnreadChatAlt } from "react-icons/md";

interface Props {
  id: string;
  select: (value: any) => void;
  close: () => void
}
const ViewUsersModal: FC<Props> = ({ id, select, close }) => {
  const { isLoading, data } = useQuery({
    queryFn: () => getChatRoomUsers(id),
    queryKey: ["chatroom-users"],
  });
  const selectUser = (item: ChatRoomMemberList) => {
    const payload = {
      id: item.user.id,
      fullname: item.user.username || 'Anonymous',
      img: item.user.picture && item.user.picture?.secure_url,
      access: null
    };
    select(payload);
    close()
  };
  return (
    <div className="">
      <div className="h-[400px] grid gap-2 p-2 overflow-y-auto">
        {isLoading && (
          <div className="place-center h-full  ">
            <CubeLoader size={1.0} />
          </div>
        )}
        {data?.data.map((item: ChatRoomMemberList) => (
          <div className="shadow p-2 flex justify-between" key={item.id}>
            <div>
              <div>
                <p>{item?.user?.username || 'Anonymous'}</p>
              </div>
              <div>
                <p>
                  {item.ismoderator ? (
                    <span className="text-sm fw-500 text-primary">
                      Moderator
                    </span>
                  ) : (
                    <span className="text-sm fw-500 text-orange-600">
                      Member
                    </span>
                  )}
                </p>
              </div>
            </div>

            <div className="pr-5" onClick={() => selectUser(item)}>
              <MdOutlineMarkUnreadChatAlt className="text-2xl cursor-pointer" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewUsersModal;
