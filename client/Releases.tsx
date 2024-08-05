import React from "react";
import { VStack, HStack, Text } from "@chakra-ui/react";
import { Release } from "../server";

interface Props {
  releases: Release[];
}

export function Releases(props: Props) {
  return (
    <>
      {props.releases.map((release) => {
        return (
          <VStack
            key={release.id}
            p={4}
            align="start"
            bg="gray.200"
            borderRadius={10}
          >
            <HStack spacing={2}>
              <Text fontWeight="bold">name: </Text>
              <Text>{release.dependency_name}</Text>
            </HStack>
            <HStack spacing={2}>
              <Text fontWeight="bold">version: </Text>
              <Text>{release.version}</Text>
            </HStack>
            <HStack spacing={2}>
              <Text fontWeight="bold">url: </Text>
              <Text>{release.url}</Text>
            </HStack>
          </VStack>
        );
      })}
    </>
  );
}
