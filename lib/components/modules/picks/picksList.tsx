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
import { fetchAllPicks, fetchFreePick} from "@/lib/service/api/picksApi";
import dayjs from "dayjs";
import ReactCountryFlag from "react-country-flag";
import {
  IoCaretBackCircleOutline,
  IoCaretForwardCircleOutline,
} from "react-icons/io5";
import { toast } from "react-toastify";
import CubeLoader from "../../ui/Loaders/CubeLoader/CubeLoader";
import { useRouter } from "next/navigation";
import { FaHeart } from "react-icons/fa6";
import useAuth from "@/lib/hooks/authUser";
import EmptyGif from "../../ui/EmptyState/EmptyGif";
import useModal from "@/lib/hooks/useModal";
import ListDetail from "./ListDetail";
import useRoutine from "@/lib/hooks/useRoutine";
const lookup = require("country-code-lookup");

const PicksList = () => {
  const {isFree} = useRoutine()
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleFetch = async (page: number) => {
    setIsLoading(true);
    setPage(page);
    if(isFree()){
      await fetchFreePick(page)
      .then((data) => {
        setData(data?.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
    }else{
      await fetchAllPicks(page)
      .then((data) => {
        setData(data?.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
    }
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
 
  const {Modal, setShowModal} = useModal()
  const [selected, setSelected] = useState<any>()
  const openSelected = (item:any) => {
    setSelected(item)
    setShowModal(true)
  }
  return (
    <>
      <div>
        {isLoading && (
          <div className="place-center py-12">
            <CubeLoader size={1.1} />
          </div>
        )}
        {
          !isLoading && !data.length && (
           <div className="py-12">
             <EmptyGif msg="There are no available picks at the moment, please check back."/>
           </div>
          )
        }
        {data && !isLoading && (
          <div>
            <Timeline>
              {!!data.length &&
                data.map((item: any, i: number) => (
                  <TimelineItem className="lg:h-28 mb-4 lg:mb-0" key={i}>
                    <TimelineConnector className="!w-[78px]" />
                    <TimelineHeader
                      className="relative rounded-xl border border-blue-gray-50 bg-white py-3 pl-4 pr-8 shadow-lg shadow-blue-gray-900/5 cursor-pointer"
                      onClick={() => openSelected(item)}
                    >
                      <TimelineIcon className="p-3" variant="ghost">
                        <div className="w-6 h-6 place-center">
                         {!isFree()? <ReactCountryFlag
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
                          />:  <ReactCountryFlag
                          countryCode={'NG'}
                          style={{
                            width: "2em",
                            height: "2em",
                          }}
                          svg
                          cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
                          cdnSuffix="svg"
                          title="US"
                        />}
                        </div>
                      </TimelineIcon>
                      <div className="w-full flex relative flex-col gap-1">
                        <Typography
                          placeholder={""}
                          className="fw-600 syne"
                          color="blue-gray"
                        >
                          <p className="fw-600 fs-400 lg:fs-700 lg:w-10/12">{item.intro}</p>
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
      <Modal title="" size="lg" type="">
        <ListDetail id={selected?.id} close={() => setShowModal(false)}/>
      </Modal>
    </>
  );
};

export default PicksList;
