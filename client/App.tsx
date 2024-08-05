import React from "react";
import { usePaginatedReleases } from "./hooks/usePaginatedReleases";
import {
  Button,
  Divider,
  Flex,
  HStack,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Releases } from "./Releases";

export function App() {
  const { isLoading, data, pagination } = usePaginatedReleases();

  if (isLoading || !data) {
    return (
      <Flex h="full" w="full" justifyContent="center" p={8}>
        <Spinner />
      </Flex>
    );
  }

  return (
    <Flex h="full" w="full" justifyContent="center" p={8}>
      <VStack spacing={4}>
        <Text fontSize="2xl" fontWeight="bold">
          Pagination test
        </Text>
        <HStack spacing={2}>
          <Text>
            Page: {pagination.currentPage} of {pagination.totalPages}
          </Text>
          <Divider orientation="vertical" />
          <Text>Total releases: {data.pagination.totalItems}</Text>
          <Button
            size="sm"
            colorScheme="green"
            isDisabled={pagination.isPreviousDisbaled}
            onClick={pagination.getPreviousPage}
          >
            Previous
          </Button>
          <Button
            size="sm"
            colorScheme="green"
            onClick={pagination.getNextPage}
            isDisabled={pagination.isNextPageDisabled}
          >
            Next
          </Button>
        </HStack>
        <VStack spacing={4}>
          <Releases releases={data.rows} />
        </VStack>
      </VStack>
    </Flex>
  );
}
