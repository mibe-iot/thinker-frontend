import { Flex, FormControl, FormLabel, HStack, Kbd, Tooltip } from "@chakra-ui/react";
import { RefreshButton } from "components/button/RefreshButton";
import { isHotkeyPressed, useHotkeys } from "react-hotkeys-hook";

export const RefreshAction = ({ refreshAction, refreshHotkeys, title, isLoading, isDisabled, tooltip, ...props }) => {
  useHotkeys(refreshHotkeys.toLowerCase(), () => { if (!isLoading) { refreshAction() } });
  return (
    <Tooltip label={tooltip} placement="top">
      <HStack spacing="0.2rem">
        <FormControl>
          <RefreshButton
            focusable={!isLoading && isHotkeyPressed(refreshHotkeys)}
            border="1px"
            title={`${title} (${refreshHotkeys})`}
            onClick={() => refreshAction()}
            isLoading={isLoading}
            isDisabled={isDisabled}
          />
        </FormControl>
        <RefreshHotkeysKbd refreshHotkeys={refreshHotkeys} />
      </HStack>
    </Tooltip>
  );
};

const RefreshHotkeysKbd = ({ refreshHotkeys }) => (
  <Flex justify="center" display={{ base: "none", md: "flex" }}>
    {refreshHotkeys.split("+").map((key, index) => <Kbd key={index} fontSize="0.5em" me="4px" _last={{ me: "0" }}>{key}</Kbd>)}
  </Flex>
);
