"use client";
import React, { useEffect, useState } from "react";

import { AreaChart, SimpleBar } from "@/components/Charts";
import ChatCard from "../Chat/ChatCard";
import communityLeaderJson from "@/data/communityLeader.json";

// without this the component renders on server and throws an error
import dynamic from "next/dynamic";
import { DataCard, UserDataCard } from "../Cards/DataCard";
import RecentActivityTable from "../Tables/RecentActivityTable";
import InitiativesTable from "../Tables/InitiativesTable";
import { Card } from "@tremor/react";
import MapOne from "../Maps/MapOne";
// const MapOne = dynamic(() => import("../Maps/MapOne"), {
//   ssr: false,
// });

const CommunityLeaders: React.FC = () => {
  const [communityLeaderData, setCommunityLeaderData] = useState<{
    [key: string]: any;
  }>(communityLeaderJson);
  const [coords, setCoords] = useState<number[] | undefined>(undefined);

  useEffect(() => {
    // setCommunityLeaderData(communityLeaderJson)
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
        <UserDataCard
          name="Leader"
          textContent={communityLeaderData["accountInfo"]["name"]!}
          avatar={communityLeaderData["accountInfo"]["avatar"]!}
        />
        {/* <DataCard name="orders" amount={34600} />
        <DataCard name="customers" amount={400} /> */}
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5 my-2.5">
        <DataCard
          name="Total Numbers of Funders"
          textContent={communityLeaderData["numberOfFunders"]!}
        />
        <DataCard
          name="Total Amount Funded"
          textContent={communityLeaderData["totalAmountFunded"]!}
          isDollarAmount
        />
        <DataCard
          name="Average Funded Per Initiative"
          textContent={communityLeaderData["averageFundedPerIntitiative"]!}
          isDollarAmount
        />
      </div>
      {/* <div>

      </div> */}
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <InitiativesTable
          initiatives={communityLeaderData["previousInitiatives"]!}
          title="Previous Initiatives"
        />
        <InitiativesTable
          initiatives={communityLeaderData["currentInitiatives"]!}
          title="Current Initiatives"
        />
        <MapOne
          residence={communityLeaderJson.accountInfo["residence"]!}
          countryOfResidence={
            communityLeaderJson.accountInfo["countryOfResidence"]!
          }
        />
        {/* <MapOne /> */}
        {/* <div className=""></div> */}
        {/* <ChatCard /> */}
      </div>
    </>
  );
};

export default CommunityLeaders;
