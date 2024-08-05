import React from "react";
import { useQuery } from "react-query";
import type { PaginationResult, Release } from "../../server/index";

async function getReleases(
  page: number,
  limit: number,
): Promise<PaginationResult<Release>> {
  const response = await fetch(
    `http://localhost:4000/releases?page=${page}&limit=${limit}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const data = await response.json();
  return data;
}

export function usePaginatedReleases() {
  const LIMIT = 5;
  const [page, setPage] = React.useState(1);

  const query = useQuery<PaginationResult<Release>, Error>({
    queryKey: ["releases", { page }],
    queryFn: () => getReleases(page, LIMIT),
    keepPreviousData: true,
  });

  const getNextPage = React.useCallback(() => {
    if (!query.isPreviousData && query.data?.pagination.hasNextPage) {
      setPage((prev) => prev + 1);
    }
  }, [setPage, query.isPreviousData, query.data?.pagination.hasNextPage]);

  const getPreviousPage = React.useCallback(() => {
    setPage((prevPage) => Math.max(prevPage - 1, 0));
  }, [setPage]);

  return {
    ...query,
    pagination: {
      ...query.data?.pagination,
      getNextPage,
      getPreviousPage,
      isPreviousDisbaled: page === 1,
      isNextPageDisabled:
        query.isPreviousData || !query.data?.pagination.hasNextPage,
    },
  };
}
