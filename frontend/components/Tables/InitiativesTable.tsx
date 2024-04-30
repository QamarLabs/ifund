import { useState } from "react"; // Import useState hook
import { BRAND } from "@/types/brand";
import Image from "next/image";
import { IRecentActivityItem } from "../Cards/DataCard";
import RecentActivityTable from "./RecentActivityTable";
import { Accordion } from './CommonTableComponents';
import React from "react";
import { Card } from "@tremor/react";

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
  title: string;
};

const InitiativesTable: React.FC<InitiativesTableProps> = ({ initiatives, title }) => {
  const [openAccordionIndex, setOpenAccordionIndex] = useState<number | null>(null);

  return (
    <Card className="col-span-12">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Funded Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Funded</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organization</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recent Activity</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {initiatives.map((initiative, index) => (
              <React.Fragment key={index}>
                <tr className={index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900' : 'bg-white'}>
                  <td className="px-6 py-4 whitespace-nowrap">{initiative.name}</td>
                  <td className="px-6 py-4 w-200">{initiative.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{initiative.fundedDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">${initiative.totalFunded}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{initiative.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{initiative.organization}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => setOpenAccordionIndex(index)}
                    >
                      {openAccordionIndex === index ? 'Close' : 'View'}
                    </button>
                  </td>
                </tr>
                <tr key={index} className={'bg-gray-50 dark:bg-gray-900 mx-auto border-transparent'}>
                  <td colSpan={12}>
                    <Accordion title="" isOpen={openAccordionIndex === index} onClick={() => setOpenAccordionIndex(index)}>
                    <RecentActivityTable recentActivity={initiative.recentActivity} />
                    </Accordion>
                  </td>
                </tr>
              </React.Fragment >
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default InitiativesTable;
