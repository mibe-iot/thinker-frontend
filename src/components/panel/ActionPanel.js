import { Flex, Box, Stack } from "@chakra-ui/react";

export const ActionPanel = ({ leftSide, rightSide, ...props }) => (
  <Stack
    align={{ base: "end", md: "start" }}
    justifyContent="space-between"
    direction={{ base: "column", "md": "row" }}
    {...props}
  >
    {leftSide && (
      <Flex justifyContent="center" justify="start" alignItems="center">
        <Box maxW={"7xl"} flexGrow={1}>
          {leftSide}
        </Box>
      </Flex>
    )}
    {rightSide && rightSide}
  </Stack>
);
