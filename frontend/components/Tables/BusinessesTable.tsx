import React, { useEffect, useLayoutEffect, useState } from "react";
import { Card } from "@tremor/react";
import RecentActivityTable from "./RecentActivityTable";
import {
  Accordion,
  Filter,
  IFilter,
  ISorter,
  SortDirection,
  SortInd,
  formatCurrency,
} from "./CommonTableComponents";
import { IRecentActivityItem } from "../Cards/DataCard";
import { Check, X, FilterIcon } from "lucide-react";
import useTableFiltersAndSorters, {
  DistinctTableFilters,
} from "@/hooks/useTableFiltersAndSorters";

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
  setBusinesses: React.Dispatch<React.SetStateAction<IBusinessItem[]>>;
  title: string;
};

const BusinessesTable: React.FC<BusinessTableProps> = ({
  businesses,
  setBusinesses,
  title,
}) => {
  const [openAccordionIndex, setOpenAccordionIndex] = useState<number | null>(
    null,
  );
  const [distinctFilters, setDistinctFilters] = useState<{
    [key: string]: any[];
  }>();

  const { handleSort, sorters, clickedColumn, setClickedColumn } =
    useTableFiltersAndSorters<IBusinessItem>(setBusinesses);

  useLayoutEffect(() => {
    if (businesses) {
      const obj = {};
      const distinctFiltersObj: { [key: string]: any[] } = {};
      Object.keys(businesses[0]).forEach((bk) => {
        distinctFiltersObj[bk] = [];
      });
      businesses.forEach((b: IBusinessItem) => {
        Object.keys(b).forEach(
          (bk) =>
            (distinctFiltersObj[bk] = Array.from(
              new Set([
                ...distinctFiltersObj[bk],
                !isNaN(parseFloat(b[bk as keyof IBusinessItem].toString()))
                  ? new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(parseInt(b[bk as keyof IBusinessItem].toString()))
                  : b[bk as keyof IBusinessItem],
              ]),
            )),
        );
      });
      setDistinctFilters(distinctFiltersObj);
    }
  }, [businesses]);

  const openFilter = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    fKey: string,
  ) => {
    e.stopPropagation();
    clickedColumn !== fKey ? setClickedColumn(fKey) : setClickedColumn("");
  };

  return (
    <Card className="col-span-12">
      <h2 className="mb-4 text-lg font-semibold">{title}</h2>
      <div className="overflow-x-auto">
        <table className="divide-gray-200 min-w-full divide-y">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th
                className="text-gray-500 relative px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                onClick={() => handleSort("name", businesses)}
              >
                <div className="relative flex">
                  <span>Name</span>
                  <SortInd sorters={sorters} sKey="name" />
                  <FilterIcon
                    className="text-gray-400 hover:text-gray-600 cursor-pointer"
                    onClick={(e) => openFilter(e, "name")}
                  />
                  {clickedColumn === "name" && (
                    <Filter
                      label="Name"
                      distinctFilters={
                        distinctFilters ? distinctFilters["name"] : []
                      }
                      handleFilterChange={() => {}}
                    />
                  )}
                </div>
              </th>
              <th className="text-gray-500 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Description
              </th>
              <th
                className="text-gray-500 relative px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                onClick={() => handleSort("formationDate", businesses)}
              >
                <div className="relative flex">
                  <span>Formation Date</span>
                  <SortInd sorters={sorters} sKey="formationDate" />
                  <FilterIcon
                    className="text-gray-400 hover:text-gray-600 cursor-pointer"
                    onClick={(e) => openFilter(e, "formationDate")}
                  />
                  {clickedColumn === "formationDate" && (
                    <Filter
                      label="Formation Date"
                      distinctFilters={
                        distinctFilters ? distinctFilters["formationDate"] : []
                      }
                      handleFilterChange={() => {}}
                    />
                  )}
                </div>
              </th>
              <th
                className="text-gray-500 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                onClick={() => handleSort("totalAmountRaised", businesses)}
              >
                <div className="relative flex">
                  <span>Total Raised</span>
                  <SortInd sorters={sorters} sKey="totalAmountRaised" />
                  <FilterIcon
                    className="text-gray-400 hover:text-gray-600 cursor-pointer"
                    onClick={(e) => openFilter(e, "totalAmountRaised")}
                  />
                  {clickedColumn === "totalAmountRaised" && (
                    <Filter
                      label="Total Amount Raised"
                      distinctFilters={
                        distinctFilters
                          ? distinctFilters["totalAmountRaised"]
                          : []
                      }
                      handleFilterChange={() => {}}
                    />
                  )}
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
