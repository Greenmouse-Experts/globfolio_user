"use client"
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/element/css/effect-fade";
import "swiper/css/bundle";
import 'swiper/css/effect-cards';
import 'swiper/css/navigation';
import { EffectCards, Navigation } from 'swiper/modules';
import { register } from "swiper/element/bundle";
import { useQuery } from "@tanstack/react-query";
import { fetchAllSubs } from "@/lib/service/api/subApi";
import useRoutine from "@/lib/hooks/useRoutine";
import SubItem from "./subItem";
import { SubItemType } from "@/lib/contracts/subs";

register();

const SubPlanList = () => {
    const {activeSub} = useRoutine()
  const { data, isLoading } = useQuery({
    queryFn: fetchAllSubs,
    queryKey: ["fetchAllSubs"],
  });
  const subs = data?.data?.filter((where:any) => where.id !== activeSub.planId)
  return (
    <div className="w-[250px] md:w-[330px] lg:w-[330px]">
      {data && !isLoading && (
        <Swiper
        effect={'cards'}
        grabCursor={true}
        modules={[Navigation, EffectCards]}
        >
          {subs?.map((item: SubItemType, index: any) => (
            <SwiperSlide
              key={index}
              className="shadow-xl"
            >
                <div className="min-h-[300px]">
                    <SubItem item={item}/>
                </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default SubPlanList;
