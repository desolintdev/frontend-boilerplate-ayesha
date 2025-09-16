import { useMemo, useCallback, useEffect } from "react";

import { parseAsInteger, useQueryStates } from "nuqs";

import Pagination from "@/shared/components/common/pagination";
import { FILTERS_CONFIG } from "@/shared/constants/reactQueryConstants";
import { PageOptions, UsePaginationProps } from "@/shared/interfaces/hooks";

const usePagination = ({
  data = [],
  listType,
  serverSideComputedTotalPage,
}: Omit<UsePaginationProps, "data"> & { data?: any[] }) => {
  /**
   * serverSideComputedTotalPage: The total number of pages when data is not directly provided.
   * - If `data` is available, total pages are calculated dynamically using `data.length / pageOptions.limit`.
   * - If `data` is not provided (e.g., when using server-side pagination), this value is used instead.
   * - This ensures pagination works correctly regardless of whether data is coming from the frontend or backend.
   */

  const initialPageNo = listType.page.number || FILTERS_CONFIG.number;
  const initialPagelimit = listType.page.limit || FILTERS_CONFIG.limit;

  const [pageOptions, setPageOptions] = useQueryStates(
    {
      number: parseAsInteger.withDefault(initialPageNo),
      limit: parseAsInteger.withDefault(initialPagelimit),
    },
    {
      clearOnDefault: false,
    },
  );

  // Calculate total pages
  const totalItems = data.length ? data.length : 0;

  const totalPages = data.length
    ? Math.ceil(totalItems / pageOptions.limit)
    : serverSideComputedTotalPage || 0;

  useEffect(() => {
    if (!serverSideComputedTotalPage && totalPages < pageOptions.number) {
      setPageOptions({
        limit: initialPagelimit,
        number: initialPageNo,
      });
    }
  }, [
    totalPages,
    pageOptions.number,
    serverSideComputedTotalPage,
    setPageOptions,
    initialPageNo,
    initialPagelimit,
  ]);

  const paginatedList = useMemo(() => {
    if (!data.length) return [];

    return data.slice(
      (pageOptions.number - 1) * pageOptions.limit,
      pageOptions.number * pageOptions.limit,
    );
  }, [data, pageOptions]);

  const goToNextPage = useCallback(() => {
    setPageOptions((prev) => ({
      ...prev,
      number: prev.number < totalPages ? prev.number + 1 : prev.number,
    }));
  }, [setPageOptions, totalPages]);

  const goToPreviousPage = useCallback(() => {
    setPageOptions((prev) => ({
      ...prev,
      number: Math.max(prev.number - 1, 1),
    }));
  }, [setPageOptions]);

  const resetPaginationOptions = useCallback(() => {
    setPageOptions({
      number: initialPageNo,
      limit: initialPagelimit,
    });
  }, [setPageOptions, initialPageNo, initialPagelimit]);

  return {
    paginatedList,
    pageOptions,
    updatePageOptions: ({ page }: { page: Partial<PageOptions> }) =>
      setPageOptions(page),
    resetPaginationOptions,
    PaginationComponent: (
      <Pagination
        handleNextPage={goToNextPage}
        handlePreviousPage={goToPreviousPage}
        currentPage={pageOptions.number}
        totalPages={totalPages}
      />
    ),
  };
};

export default usePagination;
