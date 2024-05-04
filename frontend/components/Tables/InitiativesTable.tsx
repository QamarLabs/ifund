import { useState } from "react"; // Import useState hook
import { BRAND } from "@/types/brand";
import Image from "next/image";
import { IRecentActivityItem } from "../Cards/DataCard";
import RecentActivityTable from "./RecentActivityTable";
import { Accordion, SortInd } from "./CommonTableComponents";
import React from "react";
import { Card } from "@tremor/react";
import useTableFiltersAndSorters from "@/hooks/useTableFiltersAndSorters";

export interface ICostBreakdown {
  description: string;
  amount: string | number;
}

export interface IInitiativeItem {
  name: string;
  description: string;
  fundedDate: string;
  createdDate: string;
  totalFunded: number;
  category: string;
  distributionType: string;
  breakdown: {
    items: ICostBreakdown[];
  };
  organization: string;
  reputation: string;
  recentActivity: IRecentActivityItem[];
}

type InitiativesTableProps = {
  initiatives: IInitiativeItem[];
  setInitiatives: React.Dispatch<React.SetStateAction<IInitiativeItem[]>>;
  title: string;
};

const InitiativesTable: React.FC<InitiativesTableProps> = ({
  initiatives,
  setInitiatives,
  title,
}) => {
  const [openAccordionIndex, setOpenAccordionIndex] = useState<number | null>(
    null,
  );
  const { handleSort, sorters } = useTableFiltersAndSorters(setInitiatives);

  return (
    <Card className="col-span-12">
      <h2 className="mb-4 text-lg font-semibold">{title}</h2>
      <div className="overflow-x-auto">
        <table className="divide-gray-200 min-w-full divide-y">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="text-gray-500 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" onClick={() => handleSort("name", initiatives)}>
                <div className="flex">
                  <span>Name</span>
                  <SortInd sorters={sorters} sKey="name" />
                </div>
              </th>
              <th className="text-gray-500 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Description
              </th>
              <th className="text-gray-500 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" onClick={() => handleSort("fundedDate", initiatives)}>
                <div className="flex">
                  <span>Funded Date</span>
                  <SortInd sorters={sorters} sKey="fundedDate" />
                </div>
              </th>
              <th className="text-gray-500 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" onClick={() => handleSort("totalFunded", initiatives)}>
                <div className="flex">
                  <span>Total Funded</span>
                  <SortInd sorters={sorters} sKey="totalFunded" />
                </div>
              </th>
              <th className="text-gray-500 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Category
              </th>
              <th className="text-gray-500 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" onClick={() => handleSort("organization", initiatives)}>
                <div className="flex">
                  <span>Organization</span>
                  <SortInd sorters={sorters} sKey="organization" />
                </div>
              </th>
              <th className="text-gray-500 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Recent Activity
              </th>
            </tr>
          </thead>
          <tbody className="divide-gray-200 divide-y bg-white">
            {initiatives.map((initiative, index) => (
              <React.Fragment key={index}>
                <tr
                  className={
                    index % 2 === 0 ? "bg-gray-50 dark:bg-gray-900" : "bg-white"
                  }
                >
                  <td className="whitespace-nowrap px-6 py-4">
                    {initiative.name}
                  </td>
                  <td className="w-200 px-6 py-4">{initiative.description}</td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {initiative.fundedDate}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    ${initiative.totalFunded}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {initiative.category}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {initiative.organization}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => setOpenAccordionIndex(index)}
                    >
                      {openAccordionIndex === index ? "Close" : "View"}
                    </button>
                  </td>
                </tr>
                <tr
                  key={index}
                  className={
                    "bg-gray-50 dark:bg-gray-900 mx-auto border-transparent"
                  }
                >
                  <td colSpan={12}>
                    <Accordion
                      title=""
                      isOpen={openAccordionIndex === index}
                      onClick={() => setOpenAccordionIndex(index)}
                    >
                      <RecentActivityTable
                        recentActivity={initiative.recentActivity}
                      />
                    </Accordion>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default InitiativesTable;
