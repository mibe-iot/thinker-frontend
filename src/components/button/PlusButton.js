import { ActionButton } from "components/button/ActionButton";
import { ChakraIcon } from "components/icon/ChakraIcon";
import { IoAdd } from "react-icons/io5";

export const PlusButton = props => {
  const icon = <ChakraIcon icon={IoAdd} fontSize="1.2rem" />;
  return <ActionButton variant="outline" mt={0} icon={icon} {...props} />;
};
