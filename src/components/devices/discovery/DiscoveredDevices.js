import { Box, SimpleGrid } from "@chakra-ui/react";

export const DiscoveredDevices = () => {

  return (
    <SimpleGrid mt={1} w="100%" columns={{base:1, md:2, lg:3}} spacing="1.5rem">
      <Box h="12rem" bg="green.300"></Box>
      <Box bg="red.300"></Box>
      {/* <Box bg="red.300"></Box> */}
    </SimpleGrid>
  );
}