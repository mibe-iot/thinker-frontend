import {
  Container,
  Flex,
  Box,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
import { useBackgroundColors } from "styles/theme/foundations/colors";

const Footer = () => {
  let backgroundColor = useBackgroundColors().footer;
  let textColor = useColorModeValue("gray.200", "gray.100");
  return (
    <Flex
      minH="70px"
      width="100%"
      backgroundColor={backgroundColor}
      color={textColor}
      alignItems="center"
      flexDirection="row"
    >
      <Flex justifyContent="center" flexGrow={1} flexDirection="row">
        <Box maxW={"7xl"} flexGrow={1}>
          <Text p={4}>{"@2021 Mibe"}</Text>
        </Box>
      </Flex>
    </Flex>
  );
};

export { Footer };
