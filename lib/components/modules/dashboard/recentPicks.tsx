"use client"
import React, { useEffect, useState } from "react";
import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineIcon,
  Typography,
  TimelineHeader,
} from "@/lib/components/ui/TailwindComp";
import Link from "next/link";
import { fetchSavePick } from "@/lib/service/api/picksApi";
import useAuth from "@/lib/hooks/authUser";
import { useRouter } from "next/navigation";
import ReactCountryFlag from "react-country-flag";
import dayjs from "dayjs";
import CubeLoader from "../../ui/Loaders/CubeLoader/CubeLoader";
import EmptyGif from "../../ui/EmptyState/EmptyGif";
const lookup = require("country-code-lookup");

const RecentPicks = () => {
  const { userId } = useAuth();
  const [data, setData] = useState([]);
  const route = useRouter()
  const [isLoading, setIsLoading] = useState(false);
  const handleFetch = async () => {
    setIsLoading(true);
    await fetchSavePick(userId)
      .then((data) => {
        setData(data?.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    handleFetch();
  }, [userId]);
  return (
    <>
      <div className="w-full p-4">
        <div className="mb-6 flex items-center justify-between">
        <p className="syne flex fw-500 items-center gap-x-2 text-2xl">
          <span className="w-3 h-3 lg:h-4 mt-[2px] lg:w-4 bg-primary circle block"></span>
          Favorite Picks
        </p>
        <Link href={'/picks/favorite'} className="fw-500 syne underline">View All</Link>
        </div>
        {isLoading && (
          <div className="place-center py-12">
            <CubeLoader size={0.9} />
          </div>
        )}
        {
          !isLoading && !data.length && (
           <div className="py-12">
             <EmptyGif msg="You do not have a favorite pick at the moment."/>
           </div>
          )
        }
        {data && !isLoading && (
          <div>
            <Timeline>
              {!!data.length &&
                data.slice(0,3).map((item: any, i: number) => (
                  <TimelineItem className="lg:h-28 mb-4 lg:mb-0" key={i}>
                    <TimelineConnector className="!w-[78px]" />
                    <TimelineHeader
                      className="relative rounded-xl border border-blue-gray-50 bg-white py-3 pl-4 pr-8 shadow-lg shadow-blue-gray-900/5"
                      onClick={() => route.push(`/picks/details/${item.id}`)}
                    >
                      <TimelineIcon className="p-3" variant="ghost">
                        <div className="w-6 h-6 place-center">
                          <ReactCountryFlag
                            countryCode={
                              lookup.byCountry(item.country).internet
                            }
                            style={{
                              width: "2em",
                              height: "2em",
                            }}
                            svg
                            cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
                            cdnSuffix="svg"
                            title="US"
                          />
                        </div>
                      </TimelineIcon>
                      <div className="w-full flex relative flex-col gap-1">
                        <Typography
                          placeholder={""}
                          variant="h6"
                          color="blue-gray"
                        >
                          {item.intro}
                        </Typography>
                        <Typography
                          placeholder={""}
                          variant="small"
                          color="gray"
                          className="font-normal"
                        >
                          {dayjs(item.createdAt).format("dddd DD, MM YYYY")}
                        </Typography>
                      </div>
                    </TimelineHeader>
                  </TimelineItem>
                ))}
            </Timeline>
          </div>
        )}
      </div>
    </>
  );
};

export default RecentPicks;
