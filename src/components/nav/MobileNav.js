import { Flex, Stack, Text, IconButton } from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Link } from "components/link/Link";
import {
  useLinkColors,
  useBackgroundColors,
  useBorderColors
} from "styles/theme/foundations/colors";
import { appLinks } from "components/link/TextLink";

const MobileNavBurger = ({ isOpen, onToggle, ...other }) => (
  <IconButton
    onClick={onToggle}
    icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
    borderRadius="full"
    variant={"ghost"}
    aria-label={"Toggle Navigation"}
    {...other}
  />
);

const MobileNav = ({ onItemClicked, ...other }) => {
  return (
    <Stack
      spacing={4}
      py={2}
      bg={useBackgroundColors().subNav}
      borderBottom={1}
      borderStyle={"solid"}
      borderColor={useBorderColors().nav}
      {...other}
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
