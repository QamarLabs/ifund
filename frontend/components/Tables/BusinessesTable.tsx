import React, { useState } from "react";
import { Card } from "@tremor/react";
import RecentActivityTable from "./RecentActivityTable";
import {
  Accordion,
  IFilter,
  ISorter,
  SortDirection,
  SortInd,
  formatCurrency,
} from "./CommonTableComponents";
import { IRecentActivityItem } from "../Cards/DataCard";
import { Check, X } from "lucide-react";

export interface ICostBreakdown {
  description: string;
  amount: string | number;
}

export interface IBusinessItem {
  name: string;
  description: string;
  formationDate: string;
  totalAmountRaised: number;
  isActive: boolean;
  isPublic: boolean;
  distributionType: string;
  breakdown: {
    items: ICostBreakdown[];
  };
  recentActivity: IRecentActivityItem[];
}

type BusinessTableProps = {
  businesses: IBusinessItem[];
  title: string;
};

const BusinessesTable: React.FC<BusinessTableProps> = ({
  businesses,
  title,
}) => {
  const [openAccordionIndex, setOpenAccordionIndex] = useState<number | null>(
    null,
  );
  const [sorters, setSorters] = useState<ISorter[]>([]);
  const [filters, setFilters] = useState<IFilter[]>([]);

  const setSorter = (key: string) => {
    const copyOfSorters = sorters.slice();
    const curSorterIdx = copyOfSorters.findIndex((s) => s.key === key);
    if (curSorterIdx >= 0) {
      if (
        copyOfSorters[curSorterIdx].direction === SortDirection.AscendingOrder
      )
        copyOfSorters[curSorterIdx].direction = SortDirection.DescendingOrder;
      else copyOfSorters.splice(curSorterIdx, 1);
    } else {
      copyOfSorters.push({ direction: SortDirection.AscendingOrder, key: key });
    }
    setSorters(copyOfSorters);
  };

  return (
    <Card className="col-span-12">
      <h2 className="mb-4 text-lg font-semibold">{title}</h2>
      <div className="overflow-x-auto">
        <table className="divide-gray-200 min-w-full divide-y">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th
                className="text-gray-500 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                onClick={() => setSorter("name")}
              >
                <div className="flex">
                  <span>Name</span>
                  <SortInd sorters={sorters} sKey="name" />
                </div>
              </th>
              <th className="text-gray-500 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Description
              </th>
              <th
                className="text-gray-500 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                onClick={() => setSorter("formationDate")}
              >
                <div className="flex">
                  <span>Formation Date</span>
                  <SortInd sorters={sorters} sKey="formationDate" />
                </div>
              </th>
              <th
                className="text-gray-500 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                onClick={() => setSorter("totalAmountRaised")}
              >
                <div className="flex">
                  <span>Total Raised</span>
                  <SortInd sorters={sorters} sKey="totalAmountRaised" />
                </div>
              </th>
              <th className="text-gray-500 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Is Active
              </th>
              <th className="text-gray-500 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Is Public
              </th>
              <th className="text-gray-500 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Recent Activity
              </th>
            </tr>
          </thead>
          <tbody className="divide-gray-200 divide-y bg-white">
            {businesses &&
              businesses.map((business, index) => (
                <React.Fragment key={index}>
                  <tr
                    className={
                      index % 2 === 0
                        ? "bg-gray-50 dark:bg-gray-900"
                        : "bg-white"
                    }
                  >
                    <td className="whitespace-nowrap px-6 py-4">
                      {business.name}
                    </td>
                    <td className="w-200 px-6 py-4">{business.description}</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {business.formationDate}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {formatCurrency(business.totalAmountRaised)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {business.isPublic ? "Yes" : "No"}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {business.isPublic ? "Yes" : "No"}
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
                          recentActivity={business.recentActivity}
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

export default BusinessesTable;
