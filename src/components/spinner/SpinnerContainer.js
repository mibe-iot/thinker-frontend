import {
  Box,
  Spinner,
  Center,
  Text
} from "@chakra-ui/react";

export const SpinnerContainer = ({isLoading, error, ...props}) => (
  <Box w="100%">
    {isLoading && (
      <Center>
        <Spinner size="xl" />
      </Center>
    )}
    {!isLoading && error && (
      <Center>
        <Text>{"Error: " + error.message}</Text>
      </Center>
    )}
    {!isLoading && (
      props.children
    )}
  </Box>
)
