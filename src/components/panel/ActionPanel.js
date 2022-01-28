import { Flex, Box } from "@chakra-ui/react";

export const ActionPanel = ({ leftSide, rightSide, ...props }) => (
  <Flex justifyContent="space-between" {...props}>
    {leftSide && (
      <Flex justifyContent="center" justify="start" alignItems="center">
        <Box maxW={"7xl"} flexGrow={1}>
          {leftSide}
        </Box>
      </Flex>
    )}
    {rightSide && rightSide}
  </Flex>
);
 
