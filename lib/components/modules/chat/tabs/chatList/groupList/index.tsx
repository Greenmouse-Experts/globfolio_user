import { ChatRoomItemType } from "@/lib/contracts/chat";
import { getGroups } from "@/lib/service/api/chatApi";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { FC } from "react";

interface Props {
  item: any;
  select: (value: any) => void;
}
const GroupList: FC<Props> = ({ item, select }) => {
  const { data, isLoading } = useQuery({
    queryFn: getGroups,
    queryKey: ["groups"],
  });
  return (
    <div className="flex gap-x-3 w-auto overflow-x-auto scroll-chat lg:grid gap-1 lg:max-h-[400px] overflow-y-auto">
      {isLoading && (
        <p className="fs-400 fw-500 py-4 text-center">Loading...</p>
      )}
      {data?.data?.map((items: ChatRoomItemType, i: number) => (
        <div
          key={i}
          className={`flex w-[120px] border lg:border-0  shrink-0 lg:w-auto gap-x-1 cursor-pointer hover:bg-gray-200 rounded-md p-2 ${items.id === item?.id && 'bg-gray-200'}`}
          onClick={() => select(items)}
        >
          <div>
            <Image
              src={items.banner}
              alt="banner"
              width={40}
              height={40}
              className="w-9 shrink-0 circle aspect-square"
            />
          </div>
          <div>
            <p className="fs-200 lg:fs-400 fw-500 ">{items.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GroupList;
