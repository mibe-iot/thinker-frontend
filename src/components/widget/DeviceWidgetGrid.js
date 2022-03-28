import { SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { useFetchDevicesQuery } from "store/slice/devicesSlice";
import { DeviceWidget } from "./DeviceWidget";

const DeviceWidgetGrid = () => {
  const { data: devices } = useFetchDevicesQuery();
  return <SimpleGrid mt={1} w="100%" minChildWidth="16rem" spacing="2rem">
    {mapDevicesToWidgets(devices)}
  </SimpleGrid>
};

const createDevicesActions = actions =>
  actions &&
  actions.map(action => ({
    ...action,
    execute: () => {
      console.log(action);
    }
  }));

const mapDevicesToWidgets = devices => {
  return devices && Object.values(devices).map(device => (
    <DeviceWidget
      maxWidth={devices.length == 1 ? "32rem" : "none"}
      key={device.id}
      title={device.id + " " + device.status}
      actions={createDevicesActions(device.actions)}
    >
      {device.latestReport && (
        <Stack spacing="3">
          <Text fontSize="lg">{"Last report:"}</Text>
          <Text fontSize="sm">{JSON.stringify(device.latestReport.reportData)}</Text>
        </Stack>
      )}
    </DeviceWidget>
  )
  )
};

export { DeviceWidgetGrid };

