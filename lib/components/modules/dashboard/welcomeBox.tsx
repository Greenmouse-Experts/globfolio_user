"use client";
import React, { useEffect, useState } from "react";
import useAuth from "@/lib/hooks/authUser";
import { FaAward } from "react-icons/fa";
import { formatAsNgnMoney } from "@/lib/utils";
import useRoutine from "@/lib/hooks/useRoutine";
import { fetchSingleSubs } from "@/lib/service/api/subApi";
import { SubItemType } from "@/lib/contracts/subs";
import dayjs from "dayjs";

const WelcomeBox = () => {
  const { firstName } = useAuth();
  const { activeSub } = useRoutine();
  const [subData, setSubData] = useState<SubItemType>();

  useEffect(() => {
    if (activeSub?.planId) {
      fetchSingleSubs(activeSub?.planId)
        .then((res) => {
          setSubData(res.data);
        })
        .catch(() => {});
    }
  }, [activeSub]);
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
        <div className="flex gap-x-2 border-b pb-2">
          <p className="fw-500 lg:w-3/12 whitespace-nowrap">Start Date:</p>
          <p className="fw-500 syne">
            {activeSub?.createdAt &&
              dayjs(activeSub.createdAt).format("dddd DD, MMMM YYYY")}
          </p>
        </div>
        <div className="flex border-b pb-2">
          <p className="fw-500 lg:w-3/12">Duration:</p>
          <p className="fw-500 syne">
            {subData
              ? subData.name === "Free Plan"
                ? "Unlimited"
                : `${subData?.duration} Months`
              : ""}
          </p>
        </div>
        <div className="flex border-b pb-2">
          <p className="fw-500 lg:w-3/12">Access:</p>
          <div className="flex gap-4">
            {subData?.analystPickAccess.map((item: string, i: number) => (
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
