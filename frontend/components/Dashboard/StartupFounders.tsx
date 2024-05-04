"use client";
import React, { useEffect, useState } from "react";

import { AreaChart, SimpleBar } from "@/components/Charts";
import ChatCard from "../Chat/ChatCard";
import startupLeaderJson from "@/data/startupFounder.json";

// without this the component renders on server and throws an error
import dynamic from "next/dynamic";
import { DataCard, UserDataCard } from "../Cards/DataCard";
import RecentActivityTable from "../Tables/RecentActivityTable";
import InitiativesTable from "../Tables/InitiativesTable";
import { Card } from "@tremor/react";
import MapOne from "../Maps/MapOne";
import BusinessesTable, { IBusinessItem } from "../Tables/BusinessesTable";
const StartupFounders: React.FC = () => {
  const [startupFounderData, setStartupLeaderData] = useState<{
    [key: string]: any;
  }>(startupLeaderJson);
  const [coords, setCoords] = useState<number[] | undefined>(undefined);
  const [businesses, setBusinesses] = useState<IBusinessItem[]>(startupFounderData["businesses"]!);

  useEffect(() => {
    // setCommunityLeaderData(communityLeaderJson)
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
        <UserDataCard
          name="Leader"
          textContent={startupFounderData["accountInfo"]["name"]!}
          avatar={startupFounderData["accountInfo"]["avatar"]!}
        />
        {/* <DataCard name="orders" amount={34600} />
        <DataCard name="customers" amount={400} /> */}
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5 my-2.5">
        <DataCard
          name="Total Numbers of Funders"
          textContent={startupFounderData["numberOfFunders"]!}
        />
        <DataCard
          name="Total Amount Raised"
          textContent={startupFounderData["totalAmountRaised"]!}
          isDollarAmount
        />
        <DataCard
          name="Average Funded Per Round"
          textContent={startupFounderData["averageRaisedPerRound"]!}
          isDollarAmount
        />
      </div>
      {/* <div>

      </div> */}
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <BusinessesTable
          businesses={businesses}
          setBusinesses={setBusinesses}
          title="Current Businesses"
        />
        <MapOne
          residence={startupFounderData.accountInfo["residence"]!}
          countryOfResidence={
            startupFounderData.accountInfo["countryOfResidence"]!
          }
        />
        {/* <MapOne /> */}
        {/* <div className=""></div> */}
        {/* <ChatCard /> */}
      </div>
    </>
  );
};

export default StartupFounders;
