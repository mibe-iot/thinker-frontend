import {
  Collapse,
  Flex, useDisclosure
} from "@chakra-ui/react";
import { SettingsButton } from "components/button/SettingsButton";
import { ThemeToggleButton } from "components/button/ThemeToggleButton";
import { LogoLink } from "components/link/LogoLink";
import {
  useBackgroundColors,
  useBorderColors
} from "styles/theme/foundations/colors";
import { DesktopNav } from "./DesktopNav";
import { MobileNav, MobileNavBurger } from "./MobileNav";

export const NavBar = () => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <nav>
      <Flex
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useBorderColors().nav}
        bg={useBackgroundColors().nav}
        justifyContent={"center"}
      >
        <Flex
          flex={{ base: 1 }}
          alignItems={"center"}
          minH={"60px"}
          py={{ base: 2 }}
          px={{ base: 4 }}
          maxW={"7xl"}
        >
          <LogoLink />
          <Flex display={{ base: "none", md: "flex" }} ml={"5"}>
            <DesktopNav />
          </Flex>
          <Flex flex={{ base: "auto" }} justify={{ base: "end" }}>
            <SettingsButton />
            <ThemeToggleButton />
            <MobileNavBurger
              display={{ base: "flex", md: "none" }}
              isOpen={isOpen}
              onToggle={onToggle}
            />
          </Flex>
        </Flex>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <MobileNav display={{ md: "none" }} onItemClicked={onToggle} />
      </Collapse>
    </nav>
  );
};
