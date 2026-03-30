"use client";

import { useCallback, useRef, useState } from "react";

interface PaginatedParams {
  page?: number;
  limit?: number;
  [key: string]: unknown;
}

interface PaginatedResponse<T> {
  items: T[];
  meta: {
    totalPages: number;
    currentPage: number;
    totalItems: number;
    [key: string]: unknown;
  };
}

type LazyQueryTrigger<T> = (
  params: PaginatedParams,
) => Promise<{ data?: PaginatedResponse<T> }>;

export function useExportAll<T>() {
  const [isExporting, setIsExporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const abortRef = useRef(false);

  const exportAll = useCallback(
    async (
      fetchFn: LazyQueryTrigger<T>,
      params: Omit<PaginatedParams, "page"> & { limit?: number },
    ): Promise<T[]> => {
      setIsExporting(true);
      setProgress(0);
      abortRef.current = false;

      const allItems: T[] = [];
      const limit = params.limit ?? 100;
      let page = 1;
      let totalPages = 1;

      try {
        while (page <= totalPages && !abortRef.current) {
          const result = await fetchFn({ ...params, page, limit });

          if (!result.data) break;

          allItems.push(...result.data.items);
          totalPages = result.data.meta.totalPages;
          setProgress(Math.round((page / totalPages) * 100));
          page++;
        }

        return allItems;
      } finally {
        setIsExporting(false);
        setProgress(100);
      }
    },
    [],
  );

  const cancel = useCallback(() => {
    abortRef.current = true;
  }, []);

  return { exportAll, isExporting, progress, cancel };
}
