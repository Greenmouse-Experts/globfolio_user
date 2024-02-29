"use client";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@/lib/components/ui/TailwindComp";
import { ChatRoomItemType } from "@/lib/contracts/chat";
import { SubItemType } from "@/lib/contracts/subs";
import useRoutine from "@/lib/hooks/useRoutine";
import { getGroups } from "@/lib/service/api/chatApi";
import { getChart } from "@/lib/service/api/routineApi";
import { fetchAllSubs } from "@/lib/service/api/subApi";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BsStack } from "react-icons/bs";

export default function TopGroupsChart() {
  const { activeSub } = useRoutine();
  const { data: groups, isLoading } = useQuery({
    queryFn: getGroups,
    queryKey: ["groups"],
  });
  const { data:subs, isLoading:Loaading } = useQuery({
    queryFn: fetchAllSubs,
    queryKey: ["fetchAllSubs"],
  });
  const currSub = subs?.data?.filter((where:SubItemType) => where.id === activeSub.planId)
  const globalSub = subs?.data?.filter((where:SubItemType) => where.name === 'Global Plan')
  // console.log('curr sub', groups && JSON.parse(groups?.data[0].access));
  const checkAccess = (item:ChatRoomItemType) => {
    const accss = JSON.parse(item.access)
    if(!currSub){
      return '';
    }
    if(currSub[0].name === 'Global Plan'){
      return <p className="px-4 rounded-lg text-green-600 border border-green-6 fs-400 fw-60000">Accessible</p>
    }
   if(!!accss?.length){
    if(currSub[0].chatAccess.every((item:any) => accss.includes(item))){
      return <p className="px-4 rounded-lg text-green-600 border border-green-6 fs-400 fw-60000">Accessible</p>
    }else {
      return <p className="px-4 rounded-lg text-red-600 border border-red-600 fs-400 fw-600">Blocked</p>
    }
   }
  }
  const checkSub = (item:ChatRoomItemType) => {
    const accss = JSON.parse(item.access)
    if(!subs){
      return '';
    }
    const filtered = subs.data.filter((array:SubItemType) => accss.some((element:any) => array.analystPickAccess.includes(element)))
    return filtered
  }
  return (
    <Card placeholder={""}>
      <CardHeader
        placeholder={""}
        floated={false}
        shadow={false}
        color="transparent"
        className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
      >
        <div className="w-max rounded-lg bg-gray-900 p-5 text-white">
          <BsStack className="h-6 w-6" />
        </div>
        <div>
          <Typography placeholder={""} variant="h6" color="blue-gray">
            Chart Room Access
          </Typography>
          <Typography
            variant="small"
            placeholder={""}
            color="gray"
            className="max-w-sm font-normal"
          >
            Amazing group for you to access on the platform, to gain valueable
            information.
          </Typography>
        </div>
      </CardHeader>
      <CardBody placeholder={""} className="px-2 pb-0">
        {/* {data && <Chart {...chartConfig} type="bar" width={'100%'} height={'300px'} />} */}
        <div className="overflow-x-auto">
        <div className="py-2 align-middle inline-block min-w-full ">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr className="shadow">
                <th className="text-left p-2">Groups</th>
                <th className="text-left p-2">Access</th>
                <th className="text-left p-2">Subscription Required</th>
              </tr>
            </thead>
            <tbody>
              {groups && groups?.data.map((item: ChatRoomItemType) => (
                <tr>
                  <td className="p-2">
                    <div className="flex items-center gap-4">
                      <div className="border-[5px] border-gray-300 ">
                        <Image
                          src={item.banner}
                          alt="banner"
                          width={40}
                          height={40}
                          className="w-9 shrink-0 aspect-square"
                        />
                      </div>
                      <div>
                        <p className="fs-200 lg:fs-400 fw-600 ">{item.title}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex">
                    {
                      checkAccess(item)
                    }
                    </div>
                  </td>
                  <td>
                    <div className="flex gap-2">
                    {checkSub(item).map((item:SubItemType) => (
                      <div className="bg-primary px-3 text-white rounded-lg shadow">
                        {item.name}
                      </div>
                    ))}
                    <div className="bg-primary px-3 text-white rounded-lg shadow">
                      {globalSub && globalSub[0].name}
                    </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
      </CardBody>
    </Card>
  );
}
