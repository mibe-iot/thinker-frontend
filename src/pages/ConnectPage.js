import { FormControl, FormLabel, HStack, Link, Stack, Switch, Text, Tooltip, useToast } from "@chakra-ui/react";
import { APP_SETTINGS_TYPE, useGetSettingsStatusQuery } from "api/services/appSettingsApi";
import { useGetDiscoveredDevicesQuery } from "api/services/discoveryApi";
import { DiscoveredDevices } from "components/devices/discovery/DiscoveredDevices";
import { ActionPanel } from "components/panel/ActionPanel";
import { RefreshAction } from "components/panel/actions/RefreshAction";
import { SpinnerContainer } from "components/spinner/SpinnerContainer";
import { useCooldown } from "hooks/useCooldown";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchDevicesQuery } from "store/slice/devicesSlice";
import { useDiscoveryStatus } from "store/slice/discoverySlice";

export const ConnectPage = () => {
  const { data: settingsStatuses, isLoading: isGetStatusLoading, isSuccess: isGetStatusSuccess } = useGetSettingsStatusQuery();
  const wifiSettingsConfigured = settingsStatuses && !!settingsStatuses[APP_SETTINGS_TYPE];
  const configureWifiTip = !isGetStatusLoading && wifiSettingsConfigured ? "" : "Please, configure Wi-Fi settings";
  const toast = useToast();
  let navigate = useNavigate();
  useEffect(() => {
    if (!toast.isActive("wifi-config-toast") && isGetStatusSuccess && !isGetStatusLoading && !wifiSettingsConfigured)
      toast({
        position: "top",
        id: "wifi-config-toast",
        title: "Wi-FI configuration missing",
        description: <Link onClick={() => { toast.close("wifi-config-toast"); navigate("/settings") }}><Text textDecoration="underline">{configureWifiTip}</Text></Link>,
        duration: 25000,
        isClosable: true,
        status: "warning",
      })
  },
    [wifiSettingsConfigured, isGetStatusLoading, configureWifiTip, navigate, toast, isGetStatusSuccess]
  )

  const { data: isDiscoveryActive, refetch: refetchStatus } = useDiscoveryStatus();
  const { isLoading, refetch: refetchDiscoveredDevices } = useGetDiscoveredDevicesQuery();
  const { refetch: refetchDevices } = useFetchDevicesQuery();
  const refetchAllDevices = () => { refetchDevices(); refetchDiscoveredDevices() }
  useEffect(refetchAllDevices, [isDiscoveryActive, refetchDiscoveredDevices, refetchDevices]);
  return (
    <Stack w="100%" spacing="4">
      <ActionPanel
        leftSide={
          <HStack gap={4} alignItems="center">
            <FormControl display='flex' alignItems='center'>
              <FormLabel htmlFor="discoverySwitch" mb={1}>Activate discovery</FormLabel>
              <DiscoverySwitch tooltip={configureWifiTip} isDisabled={!wifiSettingsConfigured} />
            </FormControl>
          </HStack>
        }
        rightSide={
          <HStack gap={4} alignItems="center">
            <RefreshAction
              tooltip={configureWifiTip}
              isDisabled={!wifiSettingsConfigured}
              refreshAction={() => { refetchStatus(); refetchAllDevices(); }}
              refreshHotkeys="Alt+R" title="Refresh devices"
            />
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

const DiscoverySwitch = ({ isDisabled, tooltip }) => {

  const toast = useToast();
  const [isCooledDown, startCooldown] = useCooldown(500);
  const {
    data: discoveryStatus,
    isLoading,
    updateDiscoveryStatus
  } = useDiscoveryStatus(() => showErrorToast(toast));

  return (
    <Tooltip label={tooltip} placement="top">
      <span> { /* To prevent tooltip bug */}
        <Switch
          id="discoverySwitch"
          isChecked={discoveryStatus}
          size="lg"
          isDisabled={isDisabled || isLoading || !isCooledDown}
          onChange={(event) => { startCooldown(); updateDiscoveryStatus(!discoveryStatus) }}
        />
      </span>
    </Tooltip>
  )
}

const showErrorToast = (toast) => {
  const toastId = "showDiscoveryUpdateErrorToast"
  if (!toast.isActive(toastId)) {
    toast({
      id: toastId,
      title: "An error occurred",
      description: "Error while trying to change discovery status",
      status: "error",
      duration: 4000,
      isClosable: true
    })
  }
}