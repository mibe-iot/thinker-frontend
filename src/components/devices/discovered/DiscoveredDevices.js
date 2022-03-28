import { useEffect, useState } from "react";
import { Button, Flex, Kbd, Stack, Text } from "@chakra-ui/react";
import { useHotkeys, isHotkeyPressed } from "react-hotkeys-hook";
import { RefreshAction } from "components/panel/actions/RefreshAction";
import { ActionPanel } from "components/panel/ActionPanel";
import { SpinnerContainer } from "components/spinner/SpinnerContainer";
import { devicesApi, ffetchDevices } from "services/DeviceService";

export const DiscoveredDevices = () => {
  // const {
  //   data: discoveredDevices,
  //   isLoading,
  //   isFetching,
  //   error,
  //   refetch: refetchDiscoveredDevices
  // } = devicesApi.useFetchAllDiscoveredDevicesQuery();
  let [devices, setDevices] = useState([]);
  let [isLoading, setLoading] = useState(true);

  useEffect(() => {
    ffetchDevices(
      (device) => setDevices(old => [...old, device]),
      setLoading
    );
  }, [])

  return (
    <Stack w="100%" spacing="5">
      <ActionPanel
        leftSide={<Text fontSize="2xl">Discovered devices</Text>}
      // rightSide={
      //   <DiscoveredDevicesActions refreshAction={refetchDiscoveredDevices} />
      // }
      />
      <SpinnerContainer isLoading={isLoading}>
        <DiscoveredDevicesStack discoveredDevices={devices} />
      </SpinnerContainer>
    </Stack>
  );
};

const DiscoveredDevicesActions = ({ refreshAction, ...props }) => (
  <Flex {...props}>
    <RefreshAction
      refreshAction={refreshAction}
      refreshHotkeys="Alt+R"
      title="Refresh discovered devices"
    />
  </Flex>
);

const DiscoveredDevicesStack = ({ discoveredDevices }) => (
  <>
    {discoveredDevices &&
      JSON.stringify(discoveredDevices)}
  </>
);
