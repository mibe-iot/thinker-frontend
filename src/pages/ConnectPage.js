import { WarningIcon } from "@chakra-ui/icons";
import { FormControl, FormLabel, HStack, Stack, Switch, Tooltip, useColorModeValue } from "@chakra-ui/react";
import { selectDiscoveryStatus, useGetDiscoveryStatusQuery, useSetDiscoveryActiveMutation } from "api/services/discoveryApi";
import { DiscoveredDevices } from "components/devices/discovery/DiscoveredDevices";
import { ActionPanel } from "components/panel/ActionPanel";
import { RefreshAction } from "components/panel/actions/RefreshAction";
import { useCooldown } from "hooks/useCooldown";
import { useState } from "react";
import { useSelector } from "react-redux";
import { setDiscoveryStatus, useDiscoveryStatus } from "store/slice/discoverySlice";

export const ConnectPage = () => {
  const {data: isDiscoveryActive, isLoading, updateDiscoveryStatus} = useDiscoveryStatus();
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
            <RefreshAction refreshAction={""} refreshHotkeys="Alt+R" title="Refresh devices" />
          </HStack>
        }
      />
      { isDiscoveryActive && <DiscoveredDevices />}
    </Stack>
  );
};

const DiscoverySwitch = () => {
  const [isCooledDown, startCooldown] = useCooldown(500);
  const {data: discoveryStatus, isLoading, updateDiscoveryStatus} = useDiscoveryStatus();
  // const warningColor = useColorModeValue("yellow.400", "yellow.400");

  return <HStack>
    <Switch
      id="discoverySwitch"
      isChecked={discoveryStatus}
      size="lg"
      isDisabled={isLoading || !isCooledDown}
      onChange={(event) => { startCooldown(); updateDiscoveryStatus(!discoveryStatus)}}
    />
    {/* {isError && <Tooltip borderRadius="lg" label={error.data} placement={{base:"left", md:"right"}}><WarningIcon color={warningColor} /></Tooltip>} */}
    {/* {isSettingError && <Tooltip borderRadius="lg" label={settingError.data} placement={{base:"left", md:"right"}}><WarningIcon color={warningColor} /></Tooltip>} */}
  </HStack>
}