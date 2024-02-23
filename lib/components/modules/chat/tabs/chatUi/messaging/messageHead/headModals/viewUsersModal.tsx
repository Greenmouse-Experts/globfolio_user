import CubeLoader from "@/lib/components/ui/Loaders/CubeLoader/CubeLoader";
import { ChatRoomMemberList } from "@/lib/contracts/chat";
import { getChatRoomUsers } from "@/lib/service/api/chatApi";
import { useQuery } from "@tanstack/react-query";
import React, { FC } from "react";
import { MdOutlineMarkUnreadChatAlt } from "react-icons/md";

interface Props {
  id: string;
}
const ViewUsersModal: FC<Props> = ({ id }) => {
  const { isLoading, data } = useQuery({
    queryFn: () => getChatRoomUsers(id),
    queryKey: ["chatroom-users"],
  });
  return (
    <div className="">
      <div className="h-[400px] grid gap-2 p-2 overflow-y-auto">
        {isLoading && (
          <div className="place-center h-full  ">
            <CubeLoader size={1.0} />
          </div>
        )}
        {data?.data.map((item: ChatRoomMemberList) => (
          <div className="shadow p-2 flex justify-between">
            <div>
              <div>
                <p>{item.user.fullname}</p>
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
            {item.ismoderator && (
              <div className="pr-5">
                <MdOutlineMarkUnreadChatAlt className="text-2xl" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewUsersModal;
