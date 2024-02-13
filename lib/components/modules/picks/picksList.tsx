"use client";
import React from "react";
import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineIcon,
  Typography,
  TimelineHeader,
} from "@/lib/components/ui/TailwindComp";
import { useQuery } from "@tanstack/react-query";
import { fetchAllPicks } from "@/lib/service/api/picksApi";
import dayjs from "dayjs";
import ReactCountryFlag from "react-country-flag";

const PicksList = () => {
  const { data, isLoading } = useQuery({
    queryFn: () => fetchAllPicks(1),
    queryKey: ["allPicks"],
  });
  return (
    <>
      <div>
        {data && !isLoading && (
          <div>
            <Timeline>
              {data.data.length &&
                data.data.map((item: any) => (
                  <TimelineItem className="h-28">
                    <TimelineConnector className="!w-[78px]" />
                    <TimelineHeader className="relative rounded-xl border border-blue-gray-50 bg-white py-3 pl-4 pr-8 shadow-lg shadow-blue-gray-900/5">
                      <TimelineIcon className="p-3" variant="ghost">
                        {/* <BellIcon className="h-5 w-5" /> */}
                        <div className="w-6 h-6 place-center">
                          <ReactCountryFlag
                            countryCode="NG"
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
                      <div className="flex flex-col gap-1">
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

export default PicksList;
