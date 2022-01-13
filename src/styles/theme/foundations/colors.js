import {
  extendTheme,
  withDefaultColorScheme,
  theme as baseTheme,
  useColorModeValue
} from "@chakra-ui/react";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false
};

const colors = extendTheme(
  { config },
  withDefaultColorScheme({ colorScheme: "green" })
);

const useLinkColors = () => {
  const linkColor = useColorModeValue("green.200", "green.200");
  const linkHoverColor = useColorModeValue("green.600", "green.600");

  return {
    default: linkColor,
    hover: linkHoverColor
  };
};

const useTextColors = () => {
  const defaultColor = useColorModeValue("gray.800", "gray.200");

  return {
    default: defaultColor,
  };
};

const useBackgroundColors = () => {
  const navBg = useColorModeValue("gray.100", "gray.800");
  const subNavBg = useColorModeValue("gray.100", "gray.900");
  const mainBg = useColorModeValue("gray.100", "gray.800");
  const footerBg = useColorModeValue("gray.600", "gray.900");

  return {
    default: mainBg,
    nav: navBg,
    subNav: subNavBg,
    footer: footerBg
  };
};

const useBorderColors = () => {
  const navBorder = useColorModeValue("gray.900", "gray.900");
  const mainBorder = useColorModeValue("gray.200", "gray.900");
  const footerBorder = useColorModeValue("gray.200", "gray.900");

  return {
    default: mainBorder,
    nav: navBorder,
    footer: footerBorder
  };
};

export { colors, useLinkColors, useBackgroundColors, useBorderColors, useTextColors };
