import {
  Box,
  Flex,
  Text,
  Divider,
  Stack,
  Switch,
  Spacer
} from "@chakra-ui/react";

const Widget = ({ title, onToggle, ...props }) => {
  return (
    <Box
      border={1}
      borderRadius="3xl"
      borderStyle={"solid"}
      borderColor={"#ffffff"}
      paddingX={3}
      boxSizing="fitContent"
    >
      <WidgetHeader
        title={title}
        onToggle={onToggle}
        hasChildren={props.children && props.children.length > 0}
      />
      {props.children}
    </Box>
  );
};

const WidgetHeader = ({ title, onToggle, hasChildren }) => {
  return (
    <>
      {title ? (
        <>
          <Flex alignItems="center" py={3} px={2}>
            <Text textAlign="center">{title}</Text>
            <Spacer />
            {onToggle ? <Switch display="contents" /> : ""}
          </Flex>
          {hasChildren ? <Divider /> : ""}
        </>
      ) : (
        ""
      )}
    </>
  );
};

export { Widget };
