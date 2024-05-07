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
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    // handleFilterChange(key, e.target.value);
  };

  if (distinctFilters) {
    return (
      <div className="absolute left-0 bg-white p-4 shadow-lg">
        <div>
          <label className="text-sm font-bold text-islamic-green underline whitespace-nowrap">
            {label}
          </label>
          {distinctFilters.map((option: any, index: number) => (
            <div key={index} className="mt-1 flex items-center">
              <input
                type="checkbox"
                id={`${label.toLocaleLowerCase()}-filter-${index}`}
                value={option}
                onChange={(e) => handleInputChange(e)}
                className="mr-2"
              />
              <label
                htmlFor={`${label.toLocaleLowerCase()}-filter-${index}`}
                className="whitespace-nowrap p-1"
              >
                {option}
              </label>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};
