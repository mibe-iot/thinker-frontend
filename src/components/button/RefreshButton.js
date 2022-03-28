import { ActionButton } from "components/button/ActionButton";
import { ChakraIcon } from "components/icon/ChakraIcon";
import { IoReloadOutline } from "react-icons/io5";

export const RefreshButton = props => {
  const icon = <ChakraIcon icon={IoReloadOutline} fontSize="1.2rem" />;
  return <ActionButton mt={0} icon={icon} {...props} />;
};
