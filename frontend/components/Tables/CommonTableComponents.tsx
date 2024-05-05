import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { ChangeEvent } from "react";

export interface AccordionProps {
  isOpen: boolean;
  title: string;
  onClick: () => void;
}

export const Accordion = ({
  isOpen,
  onClick,
  title,
  children,
}: React.PropsWithChildren<AccordionProps>) => {
  return (
    <div className="border-gray-200 border-top-transparent border-bottom-transparent">
      {isOpen && <div>{children}</div>}
    </div>
  );
};

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export enum SortDirection {
  AscendingOrder = "asc",
  DescendingOrder = "desc",
}

export interface ISorter {
  key: string;
  direction: SortDirection;
}

export interface IFilter {
  key: string;
  value: string;
}

interface SortIndProps {
  sorters: ISorter[];
  sKey: string;
}
export function SortInd({ sorters, sKey }: SortIndProps) {
  const sorter = sorters.find((s) => s.key == sKey);
  if (sorter)
    return (
      <span className="ml-1">
        {sorter.direction === SortDirection.AscendingOrder ? "▲" : "▼"}
      </span>
    );

  return null;
}

interface FilterProps {
  label: string;
  distinctFilters: string[];
  handleFilterChange: () => void;
}

export const Filter = ({
  label,
  distinctFilters,
  handleFilterChange,
}: FilterProps) => {
  const handleInputChange = (e: ChangeEvent<HTMLSelectElement>) => {
    // handleFilterChange(key, e.target.value);
  };

  if (distinctFilters) {
    return (
      <div className="absolute inset-x-0 bottom-full bg-white shadow-lg rounded-lg p-4 z-10">
        <div>
          <label className="text-gray-700 text-sm font-medium">{label}</label>
          <select
            onChange={(e) => handleInputChange(e)}
            className="border-gray-300 mt-1 block w-full rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">All</option>
            {distinctFilters.map((option: any, index: number) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }
  return null;
};
