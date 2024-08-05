import express from "express";
import bodyParser from "body-parser";
import * as service from "./service";
import cors from "cors";

export interface Release {
  id: string;
  dependency_name: string;
  version: string;
  url: string;
}

export interface PaginationOptions {
  page: number;
  limit: number;
  offset: number;
}

export interface PaginationResult<A> {
  rows: A[];
  pagination: {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
  };
}

function craftPaginationOptions(
  page: number,
  limit: number,
): PaginationOptions {
  return {
    page,
    limit,
    offset: (page - 1) * limit,
  };
}

const app = express();
const port = process.env.PORT ?? 4000;

app.use(bodyParser.json());
app.use(cors());

app.get("/releases", async (req, res) => {
  const page = Number(req.query.page ?? 1);
  const limit = Number(req.query.limit ?? 10);

  const options = craftPaginationOptions(page, limit);
  console.log({ paginationParams: options });
  const releases = await service.getReleases(options);

  return res.status(200).json(releases);
});

app.listen(port, async () => {
  console.log(`Listening on port ${port}...`);
});
