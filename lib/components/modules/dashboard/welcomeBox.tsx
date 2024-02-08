"use client";
import React from "react";
import useAuth from "@/lib/hooks/authUser";
import { FaAward } from "react-icons/fa";

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
        <div>
            <div>
                <div>
                    <FaAward/>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBox;
