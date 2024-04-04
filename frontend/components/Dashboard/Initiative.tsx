"use client";
import React, { useEffect, useState } from "react";

import { AreaChart, SimpleBar } from "@/components/Charts";
import ChatCard from "../Chat/ChatCard";
import initiativeJson from "@/data/initiative.json";

// without this the component renders on server and throws an error
import dynamic from "next/dynamic";
import { DataCard, UserDataCard } from "../Cards/DataCard";
import RecentActivityTable from "../Tables/RecentActivityTable";
import InitiativesTable from "../Tables/InitiativesTable";
import { Card } from "@tremor/react";
import MapOne from "../Maps/MapOne";
import { ServiceTextCard, TextCard } from "../Cards";
// const MapOne = dynamic(() => import("../Maps/MapOne"), {
//   ssr: false,
// });

const Initiative: React.FC = () => {
  const [initiativeData, setInitiativeData] = useState<{
    [key: string]: any;
  }>(initiativeJson);
  const [coords, setCoords] = useState<number[] | undefined>(undefined);

  useEffect(() => {
    // setCommunityLeaderData(communityLeaderJson)
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-1 2xl:gap-2.5">
        <TextCard
          name={initiativeData["name"]}
          description={initiativeData["description"]}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-2.5 my-2.5">
        <DataCard
          name="Total Funded so far..."
          textContent={initiativeData["totalFunded"]!}
          isDollarAmount
        />
        <DataCard
          name="Total Numbers of Funders"
          textContent={initiativeData["totalFunders"]!}
        />
        <TextCard
          name="How is initiative distributed"
          description={initiativeData["initiative"]["wayOfDistribution"]!}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-2.5">
      <UserDataCard
          name="Leader of this Initiative"
          textContent={initiativeData["leader"]["name"]!}
          avatar={initiativeData["leader"]["avatar"]!}
        />
      <UserDataCard
          name="Organization Responsible for this Initiative"
          textContent={initiativeData["organization"]["name"]!}
          avatar={initiativeData["organization"]["logo"]!}
        />
        <ServiceTextCard
          services={initiativeData["servicesProvided"]}
        />
      </div>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        {/* <InitiativesTable
          initiatives={communityLeaderData["previousInitiatives"]!}
          title="Previous Initiatives"
        />
        <InitiativesTable
          initiatives={communityLeaderData["currentInitiatives"]!}
          title="Current Initiatives"
        /> */}
        <MapOne
          residence={initiativeData["initiative"]["location"]!}
          countryOfResidence={initiativeData["initiative"]["countryOfOrigin"]!}
        />
        {/* <MapOne /> */}
        {/* <div className=""></div> */}
        {/* <ChatCard /> */}
      </div>
    </>
  );
};

export default Initiative;
