import { Box } from "@chakra-ui/react";
import { IoReloadOutline } from "react-icons/io5";
import { ActionButton } from "components/button/ActionButton";
import { ChakraIcon } from "components/icon/ChakraIcon";

export const RefreshButton = (props) => {
  const icon = <ChakraIcon icon={IoReloadOutline} fontSize="1.2rem" />
  return (
    <ActionButton title="Refresh" icon={icon} {...props} />
  );
}
