import { WarningIcon } from "@chakra-ui/icons";
import { FormControl, FormLabel, HStack, Stack, Switch, Tooltip, useColorModeValue } from "@chakra-ui/react";
import { useGetDiscoveredDevicesQuery } from "api/services/discoveryApi";
import { DiscoveredDevices } from "components/devices/discovery/DiscoveredDevices";
import { WarningBadge } from "components/info/WarningItem";
import { ActionPanel } from "components/panel/ActionPanel";
import { RefreshAction } from "components/panel/actions/RefreshAction";
import { SpinnerContainer } from "components/spinner/SpinnerContainer";
import { useCooldown } from "hooks/useCooldown";
import { useEffect } from "react";
import { useFetchDevicesQuery } from "store/slice/devicesSlice";
import { useDiscoveryStatus } from "store/slice/discoverySlice";
import { delay } from "utils/utils";

export const ConnectPage = () => {
  const { data: isDiscoveryActive, refetch: refetchStatus, isError: isStatusError } = useDiscoveryStatus();
  const { data: discoveredDevices, isLoading, refetch: refetchDiscoveredDevices, isError: isDevicesError } = useGetDiscoveredDevicesQuery();
  const {refetch: refetchDevices} = useFetchDevicesQuery();
  const isError = isStatusError || isDevicesError;
  const refetchAllDevices = () => {refetchDevices(); refetchDiscoveredDevices()}
  useEffect(refetchAllDevices, [isDiscoveryActive]);
  return (
    <Stack w="100%" spacing="4">
      <ActionPanel
        leftSide={
          <HStack gap={4} alignItems="center">
            <FormControl display='flex' alignItems='center'>
              <FormLabel htmlFor="discoverySwitch" mb={1}>Activate discovery</FormLabel>
              <DiscoverySwitch />
              {isError && <WarningBadge message="Error while trying to request discovery data" />}
            </FormControl>
          </HStack>
        }
        rightSide={
          <HStack gap={4} alignItems="center">
            <RefreshAction refreshAction={() => { refetchStatus(); refetchAllDevices(); }} refreshHotkeys="Alt+R" title="Refresh devices" />
          </HStack>
        }
      />
      {
        isDiscoveryActive &&
        <SpinnerContainer isLoading={isLoading}>
          <DiscoveredDevices />
        </SpinnerContainer>
      }
    </Stack>
  );
};

const DiscoverySwitch = () => {
  const [isCooledDown, startCooldown] = useCooldown(500);
  const { data: discoveryStatus, isLoading, updateDiscoveryStatus, isError: isStatusError } = useDiscoveryStatus();

  return <HStack>
    <Switch
      id="discoverySwitch"
      isChecked={discoveryStatus}
      size="md"
      isDisabled={isLoading || !isCooledDown}
      onChange={(event) => { startCooldown(); updateDiscoveryStatus(!discoveryStatus) }}
    />
  </HStack>
}