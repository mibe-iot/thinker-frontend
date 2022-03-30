import { Flex, FormControl, FormLabel, HStack, Kbd, Stack, VStack } from "@chakra-ui/react";
import { useHotkeys, isHotkeyPressed } from "react-hotkeys-hook";
import { RefreshButton } from "components/button/RefreshButton";

export const RefreshAction = ({ refreshAction, refreshHotkeys, title, isLoading, ...props }) => {
  useHotkeys(refreshHotkeys.toLowerCase(), () => { if (!isLoading) { refreshAction() } });
  return (
    <HStack spacing="0.2rem">
      <FormControl>
        <FormLabel display={{ base: "display", md: "none" }} mb={{ base: 1, md: 0 }}>Refresh</FormLabel>
        <RefreshButton
          focusable={!isLoading && isHotkeyPressed(refreshHotkeys)}
          border="1px"
          title={`${title} (${refreshHotkeys})`}
          onClick={() => refreshAction()}
          isLoading={isLoading}
        />
      </FormControl>
      <RefreshHotkeysKbd refreshHotkeys={refreshHotkeys} />
    </HStack>
  );
};

const RefreshHotkeysKbd = ({ refreshHotkeys }) => (
  <Flex justify="center" display={{ base: "none", md: "flex" }}>
    {refreshHotkeys.split("+").map((key, index) => <Kbd key={index} fontSize="0.5em" me="4px" _last={{ me: "0" }}>{key}</Kbd>)}
  </Flex>
);
