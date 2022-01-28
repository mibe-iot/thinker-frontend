import {
  Box,
  Flex,
  Text,
  Divider,
  Stack,
  Switch,
  Spacer
} from "@chakra-ui/react";
import { useBorderColors } from "styles/theme/foundations/colors";

const Widget = ({ title, onToggle, ...props }) => {
  const hasChildren = props.children && props.children.length > 0
  return (
    <Box
      border={1}
      borderRadius="2xl"
      borderStyle={"solid"}
      borderColor={useBorderColors().widget}
      paddingX={3}
      pb={hasChildren? 3 : 0}
      boxSizing="fitContent"
      {...props}
    >
      <WidgetHeader
        title={title}
        onToggle={onToggle}
        hasChildren={hasChildren}
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
