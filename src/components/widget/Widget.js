import {
  Box,
  Flex,
  HStack,
  Text,
  Divider,
  Stack,
  Switch,
  Spacer,
  Button
} from "@chakra-ui/react";
import { useBorderColors } from "styles/theme/foundations/colors";

const Widget = ({ title, onToggle, actions, ...props }) => {
  const hasChildren = props.children;
  return (
    <Box
      border={1}
      borderRadius="2xl"
      borderStyle={"solid"}
      borderColor={useBorderColors().widget}
      paddingX={3}
      pb={hasChildren ? 3 : 0}
      boxSizing="fitContent"
      {...props}
    >
      <WidgetHeader
        title={title}
        onToggle={onToggle}
        hasActions={actions && true}
        hasChildren={hasChildren}
      />
      <WidgetActionPanel actions={actions} hasChildren={hasChildren} />
      <Box px={2}>{props.children}</Box>
    </Box>
  );
};

const WidgetHeader = ({ title, onToggle, hasActions, hasChildren }) => {
  return (
    <>
      {title ? (
        <>
          <Flex alignItems="center" py={3} px={2}>
            <Text fontSize="lg" fontWeight="bold" textAlign="center">{title}</Text>
            <Spacer />
            {onToggle ? <Switch display="contents" /> : ""}
          </Flex>
          {(hasActions || hasChildren) && <Divider mb={2} />}
        </>
      ) : (
        ""
      )}
    </>
  );
};

const WidgetActionPanel = ({ actions, hasChildren }) => (
  <>
    {actions && (
      <>
        <HStack px={2} spacing={2} mb={2}>
        <Text fontSize="lg">{"Actions:"}</Text>
          {actions.map((action, index) => (
            <Button textAlign="center" size="xs" key={index} onClick={action.execute}>{action.name}</Button>
          ))}
        </HStack>
        {hasChildren && <Divider mb={2} />}
      </>
    )}
  </>
);

export { Widget };
