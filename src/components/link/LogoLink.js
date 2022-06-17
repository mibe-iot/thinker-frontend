import { Flex, useColorModeValue } from "@chakra-ui/react";
import { Logo } from "components/logo/Logo";
import { theme } from "styles/theme/index";
import { Link } from "./Link";

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
          decorationHoverColor={useColorModeValue(
            theme.colors.green[500],
            theme.colors.green[600]
          )}
          {...props}
        />
      </Link>
    </Flex>
  );
};
