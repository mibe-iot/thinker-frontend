import {
  extendTheme,
  withDefaultColorScheme,
  theme as baseTheme,
  useColorModeValue
} from "@chakra-ui/react";

const colors = extendTheme(
  withDefaultColorScheme({ colorScheme: "green" })
);

const useLinkColors = () => {
  const linkColor = useColorModeValue("green.400", "green.400");
  const linkHoverColor = useColorModeValue("green.600", "green.600");

  return {
    default: linkColor,
    hover: linkHoverColor
  };
};

export { colors, useLinkColors };
