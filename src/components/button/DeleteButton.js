import { CloseIcon } from "@chakra-ui/icons";
import { ActionButton } from "components/button/ActionButton";
import { ChakraIcon } from "components/icon/ChakraIcon";

export const DeleteButton = props => {
  return <ActionButton variant="outline" mt={0} icon={<CloseIcon />} {...props} />;
};
