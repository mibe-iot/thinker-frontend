import { IconButton, Flex, useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useButtonThemeConfig } from "styles/theme/components/Button";

const ThemeToggleButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      onClick={toggleColorMode}
      variant="ghost"
      borderRadius="full"
    />
  );
};

export { ThemeToggleButton };
