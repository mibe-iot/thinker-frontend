import { WarningIcon } from "@chakra-ui/icons";
import { FormControl, FormLabel, HStack, Spinner, Stack, Switch, Tooltip, useColorModeValue } from "@chakra-ui/react";
import { selectDiscoveryStatus, useGetDiscoveredDevicesQuery, useGetDiscoveryStatusQuery, useSetDiscoveryActiveMutation } from "api/services/discoveryApi";
import { DiscoveredDevices } from "components/devices/discovery/DiscoveredDevices";
import { ActionPanel } from "components/panel/ActionPanel";
import { RefreshAction } from "components/panel/actions/RefreshAction";
import { SpinnerContainer } from "components/spinner/SpinnerContainer";
import { useCooldown } from "hooks/useCooldown";
import { useState } from "react";
import { useSelector } from "react-redux";
import { setDiscoveryStatus, useDiscoveryStatus } from "store/slice/discoverySlice";

export const ConnectPage = () => {
  const { data: isDiscoveryActive, refetch: refetchStatus, isError: isStatusError } = useDiscoveryStatus();
  const { isLoading, refetch: refetchDevices, isError: isDevicesError } = useGetDiscoveredDevicesQuery();
  return (
    <Stack w="100%" spacing="4">
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
            <RefreshAction refreshAction={() => {refetchStatus(); refetchDevices();}} refreshHotkeys="Alt+R" title="Refresh devices" />
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
  const warningColor = useColorModeValue("yellow.400", "yellow.400");

  return <HStack>
    <Switch
      id="discoverySwitch"
      isChecked={discoveryStatus}
      size="md"
      isDisabled={isLoading || !isCooledDown}
      onChange={(event) => { startCooldown(); updateDiscoveryStatus(!discoveryStatus) }}
    />
    {isStatusError && <Tooltip borderRadius="lg" label={"Error getting discovery status"} placement="right"><WarningIcon color={warningColor} /></Tooltip>}
  </HStack>
}