import { IconButton } from "@chakra-ui/react";

const ActionButton = props => {
  return (
    <IconButton variant="ghost" borderRadius="full" disabled={props.isLoading || props.isDisabled} {...props}>
      {props.children}
    </IconButton>
  );
};

export { ActionButton };

