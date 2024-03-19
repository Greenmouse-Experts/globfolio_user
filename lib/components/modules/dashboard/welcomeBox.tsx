"use client";
import React, { FC, useEffect, useState } from "react";
import useAuth from "@/lib/hooks/authUser";
import { FaAward } from "react-icons/fa";
import { formatAsNgnMoney } from "@/lib/utils";
import useRoutine from "@/lib/hooks/useRoutine";
import { fetchSingleSubs } from "@/lib/service/api/subApi";
import { SubItemType } from "@/lib/contracts/subs";
const dayjs = require("dayjs");
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

interface Props{
  loading: boolean;
  id: string
}
const WelcomeBox:FC<Props> = ({loading, id}) => {
  const { firstName } = useAuth();
  const { activeSub, saveSubName } = useRoutine();
  const [subData, setSubData] = useState<SubItemType>();

  useEffect(() => {
    if (id) {
      fetchSingleSubs(id)
        .then((res) => {
          setSubData(res.data);
          saveSubName(res.data.name)
        })
        .catch(() => {});
    }
  }, [id]);
  return (
    <div className="p-3">
      <div className="bg-primary rounded-lg">
        <div className="w-full p-5 lg:py-8 bg-login text-white">
          <p className="syne text-2xl fw-600">
            <span className="text-gray-300 text-2xl">Welcome</span> {firstName}
          </p>
        </div>
      </div>
      <div className="pt-6">
        <div className="flex gap-x-3 items-center">
          <div className="w-16 h-16 lg:h-24 lg:w-24 circle bg-primary place-center text-orange-500">
            <FaAward className="text-3xl lg:text-5xl" />
          </div>
          <div>
            <p className="fw-500 syne lg:text-2xl">
              {subData?.name} Subscription
            </p>
            <p className="fw-500 syne text-lg lg:text-2xl">
              {subData?.amount
                ? subData?.amount === 0
                  ? "₦0.00"
                  : formatAsNgnMoney(subData?.amount)
                : "₦0.00"}
            </p>
          </div>
        </div>
      </div>
      <div className="pt-4 grid gap-4">
        {/* <div className="flex gap-x-2 border-b pb-2">
          <p className="fw-500 lg:w-3/12 whitespace-nowrap">Start Date:</p>
          <p className="fw-500 syne">
            {activeSub?.createdAt &&
              dayjs(activeSub.createdAt).format("dddd DD, MMMM YYYY")}
          </p>
        </div> */}
        <div className="flex border-b pb-2">
          <p className="fw-500 lg:w-3/12">Expiry Date:</p>
          <p className="fw-500 syne">
            {subData
              ? subData.name === "Free Plan"
                ? "Unlimited"
                : `${dayjs(activeSub.expiredAt).format("dddd, MMMM DD, YYYY")}`
              : ""}
          </p>
        </div>
        <div className="flex overflow-x-auto scroll-pro gap-x-2 border-b pb-2">
          <p className="fw-500 whitespace-nowrap w-[34%] lg:w-3/12">Picks Access:</p>
          <div className="flex lg:w-7/12 overflow-x-auto scroll-pro gap-4">
            {subData?.analystPickAccess?.map((item: string, i: number) => (
              <p
                className="bg-primary fs-500 fw-500 syne px-2 py-1 text-white rounded-lg"
                key={i}
              >
                {item}
              </p>
            ))}
          </div>
        </div>
        <div className="flex gap-x-2 overflow-x-auto scroll-pro border-b pb-2">
          <p className="fw-500 whitespace-nowrap w-[34%] lg:w-3/12">Chat Access:</p>
          <div className="flex lg:w-7/12 overflow-x-auto scroll-pro gap-4">
            {subData?.chatAccess?.map((item: string, i: number) => (
              <p
                className="bg-primary fs-500 fw-500 syne px-2 py-1 text-white rounded-lg"
                key={i}
              >
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBox;
