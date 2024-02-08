"use client";
import React from "react";
import useAuth from "@/lib/hooks/authUser";
import { FaAward } from "react-icons/fa";
import { formatAsNgnMoney } from "@/lib/utils";

const WelcomeBox = () => {
  const { firstName } = useAuth();
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
            <p className="fw-500 syne lg:text-2xl">Jolly Subscription</p>
            <p className="fw-500 syne text-lg lg:text-2xl">
              {formatAsNgnMoney(4000000)}
            </p>
          </div>
        </div>
      </div>
      <div className="pt-4 grid gap-4">
        <div className="flex border-b pb-2">
          <p className="fw-500 w-3/12">Start Date:</p>
          <p className="fw-500 syne">Tuesday 24, September 2023</p>
        </div>
        <div className="flex border-b pb-2">
          <p className="fw-500 w-3/12">End Date:</p>
          <p className="fw-500 syne">Tuesday 24, October 2024</p>
        </div>
        <div className="flex border-b pb-2">
          <p className="fw-500 w-3/12">Access:</p>
          <div className="flex gap-4">
            <p className="bg-primary fs-500 fw-500 syne px-2 py-1 text-white rounded-lg">
              Nigeria
            </p>
            <p className="bg-primary fs-500 fw-500 syne px-2 py-1 text-white rounded-lg">
              Ghana
            </p>
            <p className="bg-primary fs-500 fw-500 syne px-2 py-1 text-white rounded-lg">
              South Africa
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBox;
