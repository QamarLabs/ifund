"use client";
import {
  IFilter,
  ISorter,
  SortDirection,
} from "@/components/Tables/CommonTableComponents";
import { useEffect, useState } from "react";

interface TableFiltersAndSorters {
  sorters: ISorter[];
  setSorters: React.Dispatch<ISorter[]>;
  filters: IFilter[];
  setFilters: React.Dispatch<IFilter[]>;
  handleSort: <T>(key: string, data: T[]) => void | T[];
}
function useTableFiltersAndSorters<T>(): TableFiltersAndSorters {
  // State to store our value
  // Pass  initial state function to useState so logic is only executed once
  const [sorters, setSorters] = useState<ISorter[]>([]);
  const [filters, setFilters] = useState<IFilter[]>([]);

  function handleSort<T>(key: string, data: T[]) {
    const copyOfSorters = sorters.slice();
    const curSorterIdx = copyOfSorters.findIndex((s) => s.key === key);
    let currentSorter = null;
    if (curSorterIdx >= 0) {
      if (
        copyOfSorters[curSorterIdx].direction === SortDirection.AscendingOrder
      ) {
        copyOfSorters[curSorterIdx].direction = SortDirection.DescendingOrder;
        currentSorter = copyOfSorters[curSorterIdx];
      } else {
        copyOfSorters.splice(curSorterIdx, 1);
        return setSorters(copyOfSorters);
      }
    } else {
      currentSorter = {
        direction: SortDirection.AscendingOrder,
        key: key,
      } as ISorter;
      copyOfSorters.push(currentSorter);
    }
    setSorters(copyOfSorters);
    return sort<T>(currentSorter, data);
  }

  function sort<T>(currentSorter: ISorter, data: T[]) {
    if (!data.length) return [];
    const keyOfT = currentSorter.key as keyof T;
    const valueType = typeof data[0][keyOfT];
    return data.sort((a: T, b: T) => {
      const aValue = a[keyOfT] as string;
      const bValue = b[keyOfT] as string;
      if (valueType == "object" && currentSorter.key.includes("date")) {
        return currentSorter.direction === SortDirection.AscendingOrder
          ? new Date(aValue).getTime() - new Date(bValue).getTime()
          : new Date(bValue).getTime() - new Date(aValue).getTime();
      } else if (valueType == "number") {
        const aNum = a[keyOfT] as number;
        const bNum = b[keyOfT] as number;
        return currentSorter.direction === SortDirection.AscendingOrder
          ? aNum - bNum
          : bNum - aNum;
      } else {
        return currentSorter.direction === SortDirection.AscendingOrder
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
    });
  }

  return {
    sorters,
    setSorters,
    filters,
    setFilters,
    handleSort,
  };
}

export default useTableFiltersAndSorters;
