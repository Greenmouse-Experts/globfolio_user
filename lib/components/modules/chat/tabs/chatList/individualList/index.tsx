import React, { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { getChatHistory } from "@/lib/service/api/chatApi";

interface Props {
  item: any;
  select: (value: any) => void;
}
const IndividualList: FC<Props> = ({ select, item }) => {
  const { data, isLoading } = useQuery({
    queryFn: getChatHistory,
    queryKey: ["chatHistory"],
  });
  const recent = data?.data?.filter((where: any) => !where?.chatroomid);
  return (
    <>
      <div>
        {!isLoading &&
          recent.length &&
          recent?.map((items: any, i:number) => (
            <li
              key={i}
              className={`flex w-[120px] border lg:border-0  shrink-0 lg:w-auto gap-x-1 cursor-pointer hover:bg-gray-200 rounded-md p-2 ${item?.name === items?.scontact?.fullname && 'bg-gray-200'}`}
              onClick={() =>
                select({
                  fullname: items.scontact.fullname,
                  id: items.scontact.id,
                  access: null
                })
              }
            >
              <Image
                src={
                  items?.scontact?.picture
                    ? items.scontact.picture.secure_url
                    : "https://res.cloudinary.com/greenmouse-tech/image/upload/v1693229127/globfolio/Group_48368_1_y0m8ah.png"
                }
                alt="profile"
                width={40}
                height={40}
                className="w-9 shrink-0 circle aspect-square"
              />
              <div>
                <p className="fs-200 lg:fs-400 fw-500 ">
                  {items?.scontact?.fullname}
                </p>
                <p className="whitespace-nowrap fs-200 text-gray-400">
                  {items?.lastMessage}
                </p>
              </div>
            </li>
          ))}
      </div>
    </>
  );
};

export default IndividualList;
