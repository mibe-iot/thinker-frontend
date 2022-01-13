import {
  Box,
  Collapse,
  Flex,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure
} from "@chakra-ui/react";
import { LogoLink } from "components/link/LogoLink";
import { Link } from "components/link/Link";
import { MobileNav, MobileNavBurger } from "./MobileNav";
import { DesktopNav } from "./DesktopNav";
import {
  useLinkColors,
  useBackgroundColors,
  useBorderColors,
  useTextColors
} from "styles/theme/foundations/colors";
import { appLinks } from "components/link/TextLink";

export const NavBar = () => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <>
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
          <MobileNavBurger
            display={{ base: "flex", md: "none" }}
            isOpen={isOpen}
            onClick={onToggle}
          />
        </Flex>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <MobileNav display={{ md: "none" }} onItemClicked={onToggle} />
      </Collapse>
    </>
  );
};
