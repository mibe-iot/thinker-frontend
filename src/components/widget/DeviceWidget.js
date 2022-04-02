import {
  Box, Button, Divider, Flex,
  HStack, Spacer, Switch, Text
} from "@chakra-ui/react";
import { useBorderColors } from "styles/theme/foundations/colors";

const DeviceWidget = ({ title, onToggle, actions, ...props }) => {
  const hasChildren = props.children;
  const hasActions = actions && actions.length !== 0;
  return (
    <Flex
      flexDir="column"
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
        hasActions={hasActions}
        hasChildren={hasChildren}
      />
      <WidgetActionPanel actions={actions} hasChildren={hasChildren} />
      <Box px={2}>{props.children}</Box>
    </Flex>
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
    {actions && actions.length !== 0 && (
      <>
        <Flex flexWrap="wrap" alignItems="baseline" px={2} spacing={2} mb={2}>
          <Text fontSize="md" me={0.5}>{"actions:"}</Text>
          {actions.map((action, index) => (
            <>
              <Button variant="outline" py={3} px={3} opacity={0.8} m={0.5} borderRadius="full" textAlign="center" size="xs" key={index} onClick={action.execute}>{action.name}</Button>
              <Button variant="outline" py={3} px={3} opacity={0.8} m={0.5} borderRadius="full" textAlign="center" size="xs" key={index} onClick={action.execute}>{action.name}</Button>
              <Button variant="outline" py={3} px={3} opacity={0.8} m={0.5} borderRadius="full" textAlign="center" size="xs" key={index} onClick={action.execute}>{action.name}</Button>
              <Button variant="outline" py={3} px={3} opacity={0.8} m={0.5} borderRadius="full" textAlign="center" size="xs" key={index} onClick={action.execute}>{action.name}</Button>
            </>
          ))}
        </Flex>
        {hasChildren && <Divider mb={2} />}
      </>
    )}
  </>
);

export { DeviceWidget };

