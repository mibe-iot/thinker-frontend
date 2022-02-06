import { Flex, Kbd, Stack, List } from "@chakra-ui/react";
import { useHotkeys, isHotkeyPressed } from "react-hotkeys-hook";
import { RefreshAction } from "components/panel/actions/RefreshAction";

export const WidgetGridActions = ({ refreshAction, ...props }) => {
  return (
    <Flex {...props}>
      <RefreshAction refreshAction={refreshAction} refreshHotkeys="Alt+R" title="Refresh devices" />
    </Flex>
  );
};
