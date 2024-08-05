import { Release, PaginationResult, PaginationOptions } from "./index";
import { Database, SQLQueryBindings } from "bun:sqlite";

const PATH = `${__dirname}/database.sqlite`;

export function getDb() {
  return new Database(PATH);
}

export async function getReleases(
  options: PaginationOptions,
): Promise<PaginationResult<Release>> {
  const db = getDb();

  const releasesQuery = db.query<Release, SQLQueryBindings>(
    `SELECT id, dependency_name, version, url
     FROM releases
     ORDER BY dependency_name, version asc
     LIMIT $limit OFFSET $offset
     `,
  );
  const releases = releasesQuery.all({
    $limit: options.limit,
    $offset: options.offset,
  });

  const countQuery = db.query<{ count: number }, SQLQueryBindings>(
    "SELECT count(*) as count FROM releases",
  );
  const count = countQuery.get({})?.count;

  if (!count) {
    throw new Error("Cannot return as count was undefined");
  }

  const totalPages = Math.ceil(count / options.limit);
  const paginationResult = {
    rows: releases,
    pagination: {
      currentPage: options.page,
      itemsPerPage: options.limit,
      totalItems: count,
      totalPages,
      hasNextPage: options.page < totalPages,
    },
  };

  return paginationResult;
}
