import { Image, Flex } from "@chakra-ui/react";
import { Link } from "./Link";
import { Logo } from "components/logo/Logo";
import { useColorModeValue } from "@chakra-ui/react"
import { theme } from "styles/theme/index";

export const LogoLink = props => {
  return (
    <Flex>
      <Link to="/">
        <Logo
          height="25"
          lettersColor={useColorModeValue(
            theme.colors.gray[800],
            theme.colors.gray[200]
          )}
          decorationColor={useColorModeValue(
            theme.colors.green[600],
            theme.colors.green[200]
          )}
          {...props}
        />
      </Link>
    </Flex>
  );
};
