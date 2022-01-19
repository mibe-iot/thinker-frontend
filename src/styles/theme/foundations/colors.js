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

const colorsExtension = extendTheme(
  {
    colors: {
      green: {
        "50": "#ECF9F2",
        "100": "#C9EEDA",
        "200": "#A5E3C3",
        "300": "#82D8AB",
        "400": "#5FCD93",
        "500": "#3CC37C",
        "600": "#309C63",
        "700": "#24754A",
        "800": "#184E32",
        "900": "#0C2719"
      }
    }
  },
  { config },
  withDefaultColorScheme({ colorScheme: "green" })
);

const useLinkColors = () => {
  const linkColor = useColorModeValue("green.600", "green.200");
  const linkHoverColor = useColorModeValue("green.500", "green.600");
  const hoverBackgroundColor = useColorModeValue("green.100", "green.100");

  return {
    default: linkColor,
    hover: linkHoverColor,
    hoverBackground: hoverBackgroundColor
  };
};

const useTextColors = () => {
  const defaultColor = useColorModeValue("gray.800", "gray.200");

  return {
    default: defaultColor
  };
};

const useBackgroundColors = () => {
  const navBg = useColorModeValue("white", "gray.800");
  const subNavBg = useColorModeValue("gray.50", "gray.900");
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
  const navBorder = useColorModeValue("gray.200", "gray.900");
  const mainBorder = useColorModeValue("gray.200", "gray.900");
  const footerBorder = useColorModeValue("gray.200", "gray.900");
  const widgetBorder = useColorModeValue("gray.300", "gray.600");

  return {
    default: mainBorder,
    nav: navBorder,
    footer: footerBorder,
    widget: widgetBorder
  };
};

export {
  colorsExtension,
  useLinkColors,
  useBackgroundColors,
  useBorderColors,
  useTextColors
};
