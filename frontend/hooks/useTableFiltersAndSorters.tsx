"use client";
import {
  IFilter,
  ISorter,
  SortDirection,
} from "@/components/Tables/CommonTableComponents";
import { useEffect, useState } from "react";

interface TableFiltersAndSorters<TableDataType> {
  sorters: ISorter[];
  setSorters: React.Dispatch<ISorter[]>;
  filters: IFilter[];
  setFilters: React.Dispatch<IFilter[]>;
  handleSort: (key: string, data: TableDataType[]) => void | TableDataType[];
  clickedColumn: string | undefined;
  setClickedColumn: React.Dispatch<string>;
}
export interface DistinctTableFilters {
  distinctFilters: {key: string, distinctValues: string[]}[];
}

function useTableFiltersAndSorters<TableDataType>(
  setData: React.Dispatch<React.SetStateAction<TableDataType[]>>
): TableFiltersAndSorters<TableDataType> {
  // State to store our value
  // Pass  initial state function to useState so logic is only executed once
  const [sorters, setSorters] = useState<ISorter[]>([]);
  const [filters, setFilters] = useState<IFilter[]>([]);
  const [clickedColumn, setClickedColumn] = useState<string>();


  function handleSort(key: string, data: TableDataType[]) {
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
    return sort(currentSorter, data);
  }

  function sort(currentSorter: ISorter, data: TableDataType[]) {
    if (!data.length) return [];
    const keyOfT = currentSorter.key as keyof TableDataType;
    const valueType = typeof data[0][keyOfT];
    const sortedData = data.sort((a: TableDataType, b: TableDataType) => {
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
    setData(sortedData);
  }

  return {
    sorters,
    setSorters,
    filters,
    setFilters,
    handleSort,
    clickedColumn,
    setClickedColumn
  };
}

export default useTableFiltersAndSorters;
