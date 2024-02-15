"use client";
import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  Menu,
  Button,
  MenuItem,
  MenuList,
  MenuHandler,
} from "@/lib/components/ui/TailwindComp";
import { toast } from "react-toastify";
import CubeLoader from "../../ui/Loaders/CubeLoader/CubeLoader";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAuth from "@/lib/hooks/authUser";
import { getMyNotify, markNotify } from "@/lib/service/api/routineApi";
import ProfileAvatar from "../../ui/ProfileAvatar";
// dayjs time format
const dayjs = require("dayjs");
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

interface Props {
  status: string;
}
const NotifyList:FC<Props> = ({status}) => {
    const {userId, user} = useAuth()
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState([])
    const getNotify = async() => {
        setIsLoading(true)
        await getMyNotify(userId)
        .then((data) => {
            setData(data?.data)
            setIsLoading(false)
        })
        .catch(() => {})
    }
    useEffect(() => {
        getNotify()
    }, [userId])
    useEffect(() => {
        if(status === 'unread'){
            const filtered = data.filter((where:any) => !where.isRead)
            setData(filtered)
        }
    }, [status])
    const mutateRead = useMutation({
        mutationFn: markNotify,
        mutationKey: ['markRead']
    })
    
    const MarkAsRead = (item:string) => {
       mutateRead.mutate(item, {
        onSuccess: () => {
            toast.success('Marked as read')
            getNotify()
        },
        onError: (error:any) => {
            toast.error(error.response.data.message)
        }
      })
    }
    return (
      <>
        <div>
        {isLoading && (
          <div className="place-center py-12">
            <CubeLoader size={1.1} />
          </div>
        )}
          <div className="grid gap-4">
            {data &&
              !!data.length &&
              data.map((item: any, i: number) => (
                <div
                  key={i}
                  className={`bg-[#131313] p-5 rounded-[15px] text-white flex items-center justify-between hover:scale-105 duration-100 ${!item.isRead && `border-2 border-orange-400`}`}
                >
                  <div className="flex items-center gap-x-2 lg:gap-x-4">
                    <ProfileAvatar name={user.name} />
                    <div>
                      <p className="">{item.message}</p>
                      <p className="text-[14px] text-[#808080]">
                        {dayjs(item.createdAt).fromNow()}
                      </p>
                    </div>
                  </div>
                  <div>
                    <Menu placement="bottom-end">
                      <MenuHandler>
                        <Button placeholder={''} className="bg-transparent px-0 mx-0 hover:shadow-none text-md flex items-center font-normal shadow-none text-white capitalize">
                          <BsThreeDotsVertical className="text-xl" />
                        </Button>
                      </MenuHandler>
                      <MenuList placeholder={''} className="bg-[#0D0D0D]">
                        <MenuItem placeholder={''} className="my-1 fw-500 text-white bg-[#131313] pt-1" onClick={() => MarkAsRead(item.id)}>Mark as read</MenuItem>
                      </MenuList>
                    </Menu>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </>
    );
}

export default NotifyList