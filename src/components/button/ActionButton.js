import { IconButton, Flex } from "@chakra-ui/react";

const ActionButton = (props) => {
  return (
    <IconButton
      variant="ghost"
      borderRadius="full"
      {...props}
    >
      {props.children}
    </IconButton>
  );
};

export { ActionButton };
