import { Flex, Stack, Text, IconButton } from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Link } from "components/link/Link";
import {
  useLinkColors,
  useBackgroundColors,
  useBorderColors
} from "styles/theme/foundations/colors";
import { appLinks } from "components/link/TextLink";

const MobileNavBurger = ({ isOpen, onClick }) => (
  <Flex
    flex={{ base: 1, md: "auto" }}
    justify={{ base: "end" }}
    display={{ base: "flex", md: "none" }}
  >
    <IconButton
      onClick={onClick}
      icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
      variant={"ghost"}
      aria-label={"Toggle Navigation"}
    />
  </Flex>
);

const MobileNav = ({ onItemClicked }) => {
  return (
    <Stack
      spacing={4}
      py={2}
      display={{ md: "none" }}
      bg={useBackgroundColors().subNav}
      borderBottom={1}
      borderStyle={"solid"}
      borderColor={useBorderColors().nav}
    >
      {appLinks.map((appLink, index) => (
        <MobileNavItem
          key={index}
          onItemClicked={onItemClicked}
          {...appLink.props}
        />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ title, to, onItemClicked }) => {
  const linkColor = useLinkColors();
  return (
    <Link
      to={to}
      _hover={{
        textDecoration: "none"
      }}
      onClick={onItemClicked}
    >
      <Flex p={4} align={"center"} justify={{ base: "right" }}>
        <Text fontWeight={600} color={linkColor.default}>
          {title}
        </Text>
      </Flex>
    </Link>
  );
};

export { MobileNav, MobileNavBurger };
