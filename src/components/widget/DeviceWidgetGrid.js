import { SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { useFetchDevicesQuery } from "store/slice/devicesSlice";
import { DeviceWidget } from "./DeviceWidget";

const DeviceWidgetGrid = () => {
  const { data: devices } = useFetchDevicesQuery();
  return <SimpleGrid mt={1} w="100%" columns={{base:1, md:2, lg:3, xl:4}} spacing="1.5rem">
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
      key={device.id}
      title={device.deviceClass ? device.deviceClass : device.id}
      actions={createDevicesActions(device.actions)}
    >
      {device.latestReport && (
        <Stack spacing="1">
          <Text fontSize="md">latest report:</Text>
          {Object.entries(device.latestReport.reportData).map(([key, value]) => (
            <Text fontSize="xs">{key + " : " + value}</Text>
          ))}
        </Stack>
      )}
    </DeviceWidget>
  )
  )
};

export { DeviceWidgetGrid };

