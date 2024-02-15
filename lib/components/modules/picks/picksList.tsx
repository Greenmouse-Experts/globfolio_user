"use client";
import React, { useEffect, useState } from "react";
import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineIcon,
  Typography,
  TimelineHeader,
} from "@/lib/components/ui/TailwindComp";
import { fetchAllPicks } from "@/lib/service/api/picksApi";
import dayjs from "dayjs";
import ReactCountryFlag from "react-country-flag";
import {
  IoCaretBackCircleOutline,
  IoCaretForwardCircleOutline,
} from "react-icons/io5";
import { toast } from "react-toastify";

const PicksList = () => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleFetch = async (page: number) => {
    setIsLoading(true);
    setPage(page);
    await fetchAllPicks(page)
      .then((data) => {
        setData(data?.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    handleFetch(1);
  }, []);
  const gotoNext = () => {
    handleFetch(page + 1);
  };
  const gotoPrev = () => {
    if (page === 1) {
      toast.info("This is the first page");
    }
    handleFetch(page - 1);
  };
  return (
    <>
      <div>
        {data && !isLoading && (
          <div>
            <Timeline>
              {!!data.length &&
                data.map((item: any) => (
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
        {data && !isLoading && (
          <div className="flex justify-end items-center gap-x-3">
            <div className="bg-primary rounded-lg p-3 text-white">
              <p className="fw-500">Page {page}</p>
            </div>
            <div className="flex gap-x-2 items-center">
              <div
                className={`w-12 h-10 rounded-lg text-white place-center ${
                  page > 1 ? "bg-primary" : "bg-gray-400"
                }`}
                onClick={gotoPrev}
              >
                <IoCaretBackCircleOutline className="text-xl" />
              </div>
              <div
                className={`w-12 h-10 rounded-lg text-white place-center ${
                  page > 0 ? "bg-primary" : "bg-gray-400"
                }`}
                onClick={gotoNext}
              >
                <IoCaretForwardCircleOutline className="text-xl" />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PicksList;
