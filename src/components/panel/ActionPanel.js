import { Flex, Box, Stack, Divider } from "@chakra-ui/react";

export const ActionPanel = ({ leftSide, rightSide, ...props }) => (
  <>
    <Stack
      align={{ base: "end", md: "start" }}
      alignItems="center"
      justifyContent="space-between"
      direction="row"
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
    <Divider mb={4} />
  </>
);
