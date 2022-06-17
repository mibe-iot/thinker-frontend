import {
  Box, Center, Spinner, Text
} from "@chakra-ui/react";
import { useBackgroundColors } from "styles/theme/foundations/colors";

export const SpinnerContainer = ({ isLoading, error, ...props }) => {
  const bgColor = useBackgroundColors().card;
  return (
    <Box w="100%">
      {isLoading && (
        <Center>
          <Center height="5rem" width="5rem" backgroundColor={bgColor} borderRadius="lg">
            <Spinner size="xl" />
          </Center>
        </Center>
      )}
      {!isLoading && error && (
        <Center>
          <Text>{"Error: " + error.message}</Text>
        </Center>
      )}
      {!isLoading && !error && (
        props.children
      )}
    </Box>
  )
}
