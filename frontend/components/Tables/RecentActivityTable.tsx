import { BRAND } from "@/types/brand";
import Image from "next/image";
import {
  Table,
  TableHead,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  Title,
  Card,
} from "@tremor/react";
import { IRecentActivityItem } from "../Cards/DataCard";
import { useState } from "react";
import useTableFiltersAndSorters from "@/hooks/useTableFiltersAndSorters";
import { SortInd } from "./CommonTableComponents";

type RecentActivityTableProps = {
  recentActivity: IRecentActivityItem[];
};

const RecentActivityTable = ({ recentActivity }: RecentActivityTableProps) => {
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const { sorters, handleSort } = useTableFiltersAndSorters();

  return (
    <Card className="col-span-12 w-full  divide-y">
      <table className="divide-gray-200 min-w-full divide-y">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th
              className="text-gray-500 dark:text-gray-400 cursor-pointer px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
              onClick={() => handleSort<IRecentActivityItem>("type", recentActivity)}
            >
              <div className="flex">
                <span>Type</span>
                <SortInd sorters={sorters} sKey="type" />
              </div>{" "}
            </th>
            <th className="text-gray-500 dark:text-gray-400 cursor-pointer px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Activity
            </th>
            <th
              className="text-gray-500 dark:text-gray-400 cursor-pointer px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
              onClick={() => handleSort<IRecentActivityItem>("date", recentActivity)}
            >
              <div className="flex">
                <span>Date</span>
                <SortInd sorters={sorters} sKey="date" />
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="divide-gray-200 dark:bg-gray-900 dark:divide-gray-800 divide-y bg-white">
          {recentActivity.map((rcItem, key) => (
            <tr key={key} className="hover:bg-gray-50 dark:hover:bg-gray-800">
              <td className="whitespace-nowrap px-6 py-4">
                <p className="text-gray-900 dark:text-gray-100 text-sm font-medium">
                  {rcItem.type}
                </p>
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {rcItem.description}
                </p>
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {rcItem.date}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};
export default RecentActivityTable;
