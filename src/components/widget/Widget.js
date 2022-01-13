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
      h={["10rem", null, "16rem"]}
      border={1}
      borderRadius="3xl"
      borderStyle={"solid"}
      borderColor={"#ffffff"}
      paddingX={3}
      boxSizing="fitContent"
    >
      <WidgetHeader title={title} onToggle={onToggle} />
      {props.children}
    </Box>
  );
};

const WidgetHeader = ({ title, onToggle }) => {
  return (
    <>
      {title ? (
        <>
          <Flex alignItems="center" pt={3} px={2} pb={2}>
            <Text>{title}</Text>
            <Spacer />
            {onToggle ? <Switch /> : ""}
          </Flex>
          <Divider />
        </>
      ) : (
        ""
      )}
    </>
  );
};

export { Widget };
