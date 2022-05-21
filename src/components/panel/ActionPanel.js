import { Box, Divider, Flex } from "@chakra-ui/react";

export const ActionPanel = ({ leftSide, rightSide, ...props }) => (
  <>
    <Flex direction="column">
      <Flex
        direction="row"
        align={{ base: "end", md: "start" }}
        alignItems="center"
        justifyContent="space-between"
        my="1.5rem"
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
      </Flex>
      <Divider mb={4} />
    </Flex>
  </>
);
