import { useCallback } from "react";

import {
  FilterUpdates,
  ListType,
  UseClientSideFilteredListsProps,
} from "@/shared/interfaces/hooks";

import usePagination from "./usePagination";
import useSearchList from "./useSearchList";
import useSortList from "./useSortList";

const useClientSideFilteredLists = <T>({
  list,
  listType,
}: UseClientSideFilteredListsProps<T>) => {
  const { filteredList, updateSearchValue, resetSearchValue, search } =
    useSearchList<T>({
      data: list,
      listType: listType as ListType,
    });

  const { sortedList, updateSortOptions, resetSortOptions, sortOptions } =
    useSortList<T>({
      data: filteredList,
    });

  const {
    paginatedList,
    updatePageOptions,
    resetPaginationOptions,
    PaginationComponent,
    pageOptions,
  } = usePagination({ data: sortedList, listType: listType as ListType });

  const resetFilters = useCallback(() => {
    resetSearchValue();
    resetSortOptions();
    resetPaginationOptions();
  }, [resetSearchValue, resetSortOptions, resetPaginationOptions]);

  const setFilters = useCallback(
    (updates: FilterUpdates) => {
      if ("search" in updates && updates.search !== undefined) {
        updateSearchValue({ value: updates.search });
      }
      if ("sort" in updates && updates.sort !== undefined) {
        updateSortOptions({ options: updates.sort });
      }
      if ("page" in updates && updates.page !== undefined) {
        updatePageOptions({ page: updates.page });
      }
    },
    [updateSearchValue, updateSortOptions, updatePageOptions],
  );

  return {
    filteredData: paginatedList,
    PaginationComponent,
    filters: {
      search,
      sortOptions,
      pageOptions,
    },
    setFilters,
    resetFilters,
  };
};

export default useClientSideFilteredLists;
