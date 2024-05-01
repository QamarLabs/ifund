import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

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
        {sorter.direction === SortDirection.AscendingOrder ? (
          <ArrowUpIcon />
        ) : (
          <ArrowDownIcon  />
        )}
      </span>
    );

  return null;
}
