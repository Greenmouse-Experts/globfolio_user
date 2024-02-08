import React from "react";
import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineIcon,
  Typography,
  TimelineHeader,
} from "@/lib/components/ui/TailwindComp";
import Link from "next/link";

const RecentPicks = () => {
  return (
    <>
      <div className="w-full p-4">
        <div className="mb-6 flex items-center justify-between">
        <p className="syne flex fw-500 items-center gap-x-2 text-2xl">
          <span className="w-3 h-3 lg:h-4 mt-[2px] lg:w-4 bg-primary circle block"></span>
          Recent Picks
        </p>
        <Link href={'/picks'} className="fw-500 syne underline">View All</Link>
        </div>
        <Timeline>
          <TimelineItem className="h-28">
            <TimelineConnector className="!w-[78px]" />
            <TimelineHeader className="relative rounded-xl border border-blue-gray-50 bg-white py-3 pl-4 pr-8 shadow-lg shadow-blue-gray-900/5">
              <TimelineIcon className="p-3" variant="ghost">
                {/* <BellIcon className="h-5 w-5" /> */}
              </TimelineIcon>
              <div className="flex flex-col gap-1">
                <Typography placeholder={""} variant="h6" color="blue-gray">
                  $2400, Design changes
                </Typography>
                <Typography
                  placeholder={""}
                  variant="small"
                  color="gray"
                  className="font-normal"
                >
                  22 DEC 7:20 PM
                </Typography>
              </div>
            </TimelineHeader>
          </TimelineItem>
          <TimelineItem className="h-28">
            <TimelineConnector className="!w-[78px]" />
            <TimelineHeader className="relative rounded-xl border border-blue-gray-50 bg-white py-3 pl-4 pr-8 shadow-lg shadow-blue-gray-900/5">
              <TimelineIcon className="p-3" variant="ghost" color="red">
                {/* <ArchiveBoxIcon className="h-5 w-5" /> */}
              </TimelineIcon>
              <div className="flex flex-col gap-1">
                <Typography placeholder={""} variant="h6" color="blue-gray">
                  New order #1832412
                </Typography>
                <Typography
                  placeholder={""}
                  variant="small"
                  color="gray"
                  className="font-normal"
                >
                  21 DEC 11 PM
                </Typography>
              </div>
            </TimelineHeader>
          </TimelineItem>
          <TimelineItem className="h-28">
            <TimelineHeader className="relative rounded-xl border border-blue-gray-50 bg-white py-3 pl-4 pr-8 shadow-lg shadow-blue-gray-900/5">
              <TimelineIcon className="p-3" variant="ghost" color="green">
                {/* <CurrencyDollarIcon className="h-5 w-5" /> */}
              </TimelineIcon>
              <div className="flex flex-col gap-1">
                <Typography placeholder={""} variant="h6" color="blue-gray">
                  Payment completed for order #4395133
                </Typography>
                <Typography
                  placeholder={""}
                  variant="small"
                  color="gray"
                  className="font-normal"
                >
                  20 DEC 2:20 AM
                </Typography>
              </div>
            </TimelineHeader>
          </TimelineItem>
        </Timeline>
      </div>
    </>
  );
};

export default RecentPicks;
