import React from "react";
import TopGroupsChart from "./GroupsChart";

const TopGroups = () => {
  return (
    <>
      <div className="p-5">
        <div>
          <p className="syne flex fw-500 items-center gap-x-2 text-lg lg:text-2xl">
            <span className="w-3 h-3 lg:h-4 mt-[2px] lg:w-4 bg-primary circle block"></span>
            Top Groups
          </p>
        </div>
        <div className="mt-8">
          <TopGroupsChart />
        </div>
      </div>
    </>
  );
};

export default TopGroups;
