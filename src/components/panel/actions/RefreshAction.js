import { Flex, Kbd, Stack } from "@chakra-ui/react";
import { useHotkeys, isHotkeyPressed } from "react-hotkeys-hook";
import { RefreshButton } from "components/button/RefreshButton";

export const RefreshAction = ({ refreshAction, refreshHotkeys, title, ...props }) => {
  useHotkeys(refreshHotkeys.toLowerCase(), () => refreshAction());
  return (
      <Stack spacing="0.2rem">
        <RefreshHotkeysKbd refreshHotkeys={refreshHotkeys}/>
        <RefreshButton
          focusable={isHotkeyPressed(refreshHotkeys)}
          border="1px"
          title={`${title} (${refreshHotkeys})`}
          onClick={() => refreshAction()}
        />
      </Stack>
  );
};

const RefreshHotkeysKbd = ({refreshHotkeys}) => (
  <Flex justify="center" display={{ sm: "none", md: "flex" }}>
    {refreshHotkeys.split("+").map((key, index) => <Kbd key={index} fontSize="0.5em" me="4px" _last={{me: "0"}}>{key}</Kbd>)}
  </Flex>
);
