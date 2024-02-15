"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchSinglePick } from "@/lib/service/api/picksApi";
import Image from "next/image";
import dayjs from "dayjs";
import CubeLoader from "@/lib/components/ui/Loaders/CubeLoader/CubeLoader";
import { TbArrowBackUpDouble } from "react-icons/tb";
import Link from "next/link";

const PicksDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryFn: () => fetchSinglePick(`${id}`),
    queryKey: ["singlePick"],
  });
  return (
    <>
      <div className="bg-white shadow p-6 rounded min-h-[75vh]">
        <div className="mb-4">
          <Link href={"/picks"}>
            <TbArrowBackUpDouble className="text-2xl" />
          </Link>
        </div>
        {isLoading && (
          <div className="place-center py-12">
            <CubeLoader size={1.1} />
          </div>
        )}
        {data && !isLoading && (
          <div className="py-2">
            <Image
              className="w-full lg:w-48 lg:h-48 lg:float-left mr-6 mb-6"
              src={
                data?.data?.image
                  ? data?.data?.image
                  : "https://res.cloudinary.com/greenmouse-tech/image/upload/v1708002768/globfolio/images_1_k8nwgw.jpg"
              }
              alt="pick-img"
              width={400}
              height={400}
            />
            <div className="item-body px-2 text-wrap">
              <p className="fs-300 mb-2 fw-500">
                {dayjs(data?.data?.createdAt).format("dddd DD, MMMM YYYY")}
              </p>
              <p className="fw-600 syne">{data?.data?.industry}</p>
              <p className="fw-600 lg:text-lg">{data?.data?.intro}</p>
              <div
                dangerouslySetInnerHTML={{ __html: data?.data?.description }}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PicksDetails;
