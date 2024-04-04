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

type RecentActivityTableProps = {
  recentActivity: IRecentActivityItem[],
}

const RecentActivityTable = ({ recentActivity }: RecentActivityTableProps) => {
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const sortedData = [...recentActivity].sort((a, b) => {
    if (sortBy === 'type') {
      return sortOrder === 'asc' ? a.type.localeCompare(b.type) : b.type.localeCompare(a.type);
    } else if (sortBy === 'activity') {
      return sortOrder === 'asc' ? a.description.localeCompare(b.description) : b.description.localeCompare(a.description);
    } else if (sortBy === 'date') {
      return sortOrder === 'asc' ? new Date(a.date).getTime() - new Date(b.date).getTime() : new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return 0;
  });

  return (
    <Card className="w-full divide-y  col-span-12">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('type')}>
              Type {sortBy === 'type' && <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('activity')}>
              Activity {sortBy === 'activity' && <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('date')}>
              Date {sortBy === 'date' && <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>}
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-800">
          {sortedData.map((rcItem, key) => (
            <tr key={key} className="hover:bg-gray-50 dark:hover:bg-gray-800">
              <td className="px-6 py-4 whitespace-nowrap">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{rcItem.type}</p>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <p className="text-sm text-gray-500 dark:text-gray-400">{rcItem.description}</p>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <p className="text-sm text-gray-500 dark:text-gray-400">{rcItem.date}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};
export default RecentActivityTable;
