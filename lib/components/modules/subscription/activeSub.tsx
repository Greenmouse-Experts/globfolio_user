"use client";
import React, { useEffect } from "react";
import useRoutine from "@/lib/hooks/useRoutine";
import { useQuery } from "@tanstack/react-query";
import { fetchSingleSubs } from "@/lib/service/api/subApi";
import { FaAward, FaCircleCheck } from "react-icons/fa6";
import { formatAsNgnMoney } from "@/lib/utils";
import { BenefitSubItem } from "@/lib/contracts/subs";

const ActiveSub = () => {
  const { activeSub } = useRoutine();
  const { data, isLoading, refetch } = useQuery({
    queryFn: () => fetchSingleSubs(activeSub?.planId),
    queryKey: ["sinfetchsub"],
  });
  useEffect(() => {
      setTimeout(() => {
        refetch();
      }, 4000);
  }, []);

  return (
    <div className="bg-white shadow p-3">
      <p className="syne flex fw-500 items-center gap-x-2 text-lg">
        <span className="w-3 h-3 lg:h-4 mt-[2px] lg:w-4 bg-primary circle block"></span>
        Activie Subscription
      </p>
      <div className="mt-6">
        {data && !isLoading && (
          <div>
            <div className="flex gap-x-3 lg:gap-x-6 items-center">
              <div className="w-10 h-10 lg:h-16 lg:w-16 circle bg-primary place-center text-orange-500">
                <FaAward className="text-xl lg:text-2xl" />
              </div>
              <div>
                <p className="fw-500 syne lg:text-xl">{data?.data?.name}</p>
                <p className="fw-500 syne text-lg lg:text-xl">
                  {data?.data?.amount === 0
                    ? "₦0.00"
                    : formatAsNgnMoney(data?.data?.amount)}
                </p>
              </div>
            </div>
            <div className="mt-1 flex gap-x-3 items-center">
              <p className="fw-500 fs-400">Expires At: </p>
              <p>{activeSub?.expiredAt === null ? "Unlimited" : "30 Sep 2024"}</p>
            </div>
            <div className="grid gap-3 mt-2">
            {
               data?.data?.benefits?.map((item:BenefitSubItem, i:number) => (
                <div className="flex gap-x-3" key={i}>
                    <p className="mt-2"><FaCircleCheck className="text-sm text-green-600 shrink-0"/></p>
                    <p className="fs-400">{item.benefit}</p>
                </div>
               )) 
            }
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActiveSub;
