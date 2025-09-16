import { useCallback, useEffect, useState } from "react";

import { ServerSideListFiltersProps } from "@/shared/interfaces/hooks";

import usePagination from "./usePagination";
import useSearchList from "./useSearchList";
import useSortList from "./useSortList";

const useServerSideListFilters = <T>({
  listType,
  queryToCall,
  dataKey,
}: /**
 * dataKey: Specifies the key in the API response that contains the list of items.
 * It supports both direct and nested keys using dot notation.
 *
 * Example Usage:
 * - If API response is { docs: [...], pagination: {...} }, pass dataKey = "docs"
 * - If API response is { trucks: [...], pagination: {...} }, pass dataKey = "trucks"
 * - If API response is { customers: { list: [...] }, pagination: {...} }, pass dataKey = "customers.list"
 *
 * This allows the hook to dynamically extract the correct array from the API response,
 * making it flexible for different API structures.
 */
ServerSideListFiltersProps<T>) => {
  const [serverSideComputedTotalPage, setServerSideComputedTotalPage] =
    useState(1);
  const { updateSearchValue, resetSearchValue, search } = useSearchList();
  const { updateSortOptions, resetSortOptions, sortOptions } = useSortList();

  const {
    updatePageOptions,
    resetPaginationOptions,
    PaginationComponent,
    pageOptions,
  } = usePagination({ listType, serverSideComputedTotalPage });

  const { data, isLoading, error, message, statusCode } = queryToCall({
    params: {
      search,
      ...sortOptions,
      ...pageOptions,
    },
  });

  const getNestedValue = ({ obj, path }: { obj: any; path: string }): T[] => {
    return path.split(".").reduce((acc, key) => acc?.[key], obj) || [];
  };

  const list: T[] = dataKey ? getNestedValue({ obj: data, path: dataKey }) : [];
  const pagination = data?.pagination || {};
  const { totalPages = 1 } = pagination;

  useEffect(() => {
    setServerSideComputedTotalPage(totalPages);
  }, [totalPages]);

  const setFilters = useCallback(
    (updates: { search?: string; sort?: any; page?: any }) => {
      if ("search" in updates) {
        updateSearchValue({ value: updates.search as string });
        resetPaginationOptions();
      }
      if ("sort" in updates) updateSortOptions({ options: updates.sort });
      if ("page" in updates) updatePageOptions({ page: updates.page });
    },
    [
      updateSearchValue,
      updateSortOptions,
      updatePageOptions,
      resetPaginationOptions,
    ],
  );

  const resetFilters = useCallback(() => {
    resetSearchValue();
    resetSortOptions();
    resetPaginationOptions();
  }, [resetSearchValue, resetSortOptions, resetPaginationOptions]);

  return {
    filteredData: list,
    PaginationComponent,
    filters: {
      search,
      sortOptions,
      pageOptions,
    },
    isLoading,
    error,
    message,
    statusCode,
    setFilters,
    resetFilters,
  };
};

export default useServerSideListFilters;
