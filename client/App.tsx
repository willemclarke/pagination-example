import { usePaginatedReleases } from "./hooks/usePaginatedReleases";
import { Flex, Spinner, Text, VStack } from "@chakra-ui/react";
import { Releases } from "./Releases";
import { PaginationPanel } from "./PaginationPanel";

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
          Pagination example
        </Text>
        <PaginationPanel pagination={pagination} />
        <Releases releases={data.rows} />
      </VStack>
    </Flex>
  );
}
