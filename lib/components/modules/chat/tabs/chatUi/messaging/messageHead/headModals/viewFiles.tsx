import EmptyGif from "@/lib/components/ui/EmptyState/EmptyGif";
import CubeLoader from "@/lib/components/ui/Loaders/CubeLoader/CubeLoader";
import { ChatRoomMemberList } from "@/lib/contracts/chat";
import { getChatRoomFiles, getChatRoomUsers } from "@/lib/service/api/chatApi";
import { isImage } from "@/lib/utils/formatHelp";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { FC } from "react";
import { MdOutlineMarkUnreadChatAlt } from "react-icons/md";

interface Props {
  id: string;
}
const ViewFilesModal: FC<Props> = ({ id }) => {
  const { isLoading, data } = useQuery({
    queryFn: () => getChatRoomFiles(id),
    queryKey: ["chatroom-users"],
  });
  return (
    <div className="">
      <div className="h-[400px]">
        {isLoading && (
          <div className="place-center h-full  ">
            <CubeLoader size={1.0} />
          </div>
        )}
        {
            !isLoading && !data.data.length && <div><EmptyGif msg="No files has been added yet."/></div>
        }
        <div className="grid grid-cols-4 gap-3 max-h-[500px] overflow-y-auto scroll-pro">
          {data &&
            !!data.data.length &&
            data.data.map((item: any, i: number) => (
              <div className="rounded-xl h-28 overflow-hidden shadow" key={i}>
                {isImage(item) ? (
                  <a href={item} target="_blank" rel="noopener noreferrer">
                    <Image
                      src={item}
                      alt="file"
                      width={200}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </a>
                ) : (
                  <a href={item} target="_blank" rel="noopener noreferrer">
                  <Image
                    src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1693837622/globfolio/file-removebg-preview_stj9w1.png"
                    alt="file"
                    width={200}
                    height={200}
                    className="w-6/12 mx-auto"
                  />
                  </a>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ViewFilesModal;
