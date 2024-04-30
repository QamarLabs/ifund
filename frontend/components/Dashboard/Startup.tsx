"use client";
import React, { useEffect, useState } from "react";

import { AreaChart, SimpleBar } from "@/components/Charts";
import ChatCard from "../Chat/ChatCard";
import startupJson from "@/data/startup.json";

// without this the component renders on server and throws an error
import dynamic from "next/dynamic";
import { DataCard, UserDataCard } from "../Cards/DataCard";
const MapOne = React.lazy(() => import("../Maps/MapOne"));

// const MapOne = dynamic(() => import("../Maps/MapOne"), {
//   ssr: false,
// });

const Startup: React.FC = () => {
  const [startupData, setStartupData] = useState<{
    [key: string]: any;
  }>(startupJson);
  const [coords, setCoords] = useState<number[] | undefined>(undefined);

  useEffect(() => {
    // setCommunityLeaderData(communityLeaderJson)
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
        <UserDataCard
          name="Leader"
          textContent={startupData["name"]!}
          avatar={startupData["logo"]!}
        />
        {/* <DataCard name="orders" amount={34600} />
        <DataCard name="customers" amount={400} /> */}
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5 my-2.5">
        <DataCard
          name="Total Numbers of Funders"
          textContent={startupData["totalFunders"]!}
        />
        <DataCard
          name="Number of Employees"
          textContent={startupData["numberOfEmployees"]!}
        />
        <DataCard
          name="Average Raised Per Round"
          textContent={startupData["averageRaisedPerRound"]!}
          isDollarAmount
        />
      </div>
      {/* <div>

      </div> */}
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        {/* <InitiativesTable
          initiatives={communityLeaderData["previousInitiatives"]!}
          title="Previous Initiatives"
        />
        <InitiativesTable
          initiatives={communityLeaderData["currentInitiatives"]!}
          title="Current Initiatives"
        /> */}
        <React.Suspense fallback={<div>Loading Map...</div>}>
          <MapOne
            residence={startupData["residence"]!}
            countryOfResidence={startupData["countryOfResidence"]!}
          />
        </React.Suspense>
        {/* <MapOne /> */}
        {/* <div className=""></div> */}
        {/* <ChatCard /> */}
      </div>
    </>
  );
};

export default Startup;
