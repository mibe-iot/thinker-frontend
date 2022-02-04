import { Flex, Kbd, Stack, List } from "@chakra-ui/react";
import { useHotkeys, isHotkeyPressed } from "react-hotkeys-hook";
import { RefreshButton } from "components/button/RefreshButton";

export const WidgetGridActions = ({ refreshAction, ...props }) => {
  const refreshHotkey = "alt+r";
  useHotkeys(refreshHotkey, () => refreshAction());
  return (
    <Flex {...props}>
      <Stack spacing="0.2rem">
        <Flex justify="center" display={{ sm: "none", md: "flex" }}>
          <Kbd fontSize="0.5em" me="4px">
            Alt
          </Kbd>
          <Kbd fontSize="0.5em">R</Kbd>
        </Flex>
        <RefreshButton
          focusable={isHotkeyPressed(refreshHotkey)}
          border="1px"
          title="Refresh widgets"
          onClick={() => refreshAction()}
        />
      </Stack>
    </Flex>
  );
};
