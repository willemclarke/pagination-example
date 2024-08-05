import { HStack, Divider, Button, Text } from "@chakra-ui/react";
import { usePaginatedReleases } from "./hooks/usePaginatedReleases";

interface Props {
  pagination: ReturnType<typeof usePaginatedReleases>["pagination"];
}

export function PaginationPanel(props: Props) {
  const { pagination } = props;

  return (
    <HStack spacing={2}>
      <Text>
        Page: <strong>{pagination.currentPage}</strong> of{" "}
        <strong>{pagination.totalPages}</strong>
      </Text>
      <Divider orientation="vertical" />
      <Text>Total releases: {pagination.totalItems}</Text>
      <Divider orientation="vertical" />
      <Button
        size="sm"
        colorScheme="green"
        isDisabled={pagination.isPreviousDisbaled}
        onClick={pagination.getFirstPage}
      >
        First
      </Button>
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
      <Button
        size="sm"
        colorScheme="green"
        onClick={pagination.getLastPage}
        isDisabled={pagination.isLastPageDisbaled}
      >
        Last
      </Button>
    </HStack>
  );
}
