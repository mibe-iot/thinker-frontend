import { Box } from "@chakra-ui/react";

export const ChakraIcon = ({ icon, ...props }) => (
  <Box as={icon} {...props}></Box>
);
