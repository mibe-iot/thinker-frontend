import { WarningIcon } from "@chakra-ui/icons";
import { FormControl, FormLabel, HStack, Stack, Switch, Tooltip, useColorModeValue } from "@chakra-ui/react";
import { useGetDiscoveryStatusQuery } from "api/services/discoveryApi";
import { DiscoveredDevices } from "components/devices/discovery/DiscoveredDevices";
import { ActionPanel } from "components/panel/ActionPanel";
import { RefreshAction } from "components/panel/actions/RefreshAction";
import { useCooldown } from "hooks/useCooldown";

export const ConnectPage = () => {
  const { data: isDiscoveryActive, isError } = useGetDiscoveryStatusQuery();
  return (
    <Stack w="100%" spacing="5">
      <ActionPanel
        leftSide={
          <HStack gap={4} alignItems="center">
            <FormControl display='flex' alignItems='center'>
              <FormLabel htmlFor="discoverySwitch" mb={1}>Activate discovery</FormLabel>
              <DiscoverySwitch />
            </FormControl>
          </HStack>
        }
        rightSide={
          <HStack gap={4} alignItems="center">
            <RefreshAction refreshAction={""} refreshHotkeys="Alt+R" title="Refresh devices" />
          </HStack>
        }
      />
      {/* { isDiscoveryActive && !isError && */ <DiscoveredDevices /> }
    </Stack>
  );
};

const DiscoverySwitch = () => {
  const [isCooledDown, startCooldown] = useCooldown(1000);
  const { data: isDiscoveryActive, isFetching, isError, error } = useGetDiscoveryStatusQuery();
  const warningColor = useColorModeValue("yellow.400", "yellow.400");
  return <HStack>
    <Switch
      id="discoverySwitch"
      defaultChecked={isDiscoveryActive}
      size="lg"
      isDisabled={isFetching || !isCooledDown}
      onChange={() => { startCooldown(); }}
    />
    { isError && <Tooltip label={JSON.stringify(error)} placement="right"><WarningIcon color={warningColor}/></Tooltip>}
  </HStack>
}