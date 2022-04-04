import { Button, HStack, SimpleGrid, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { DeviceFullViewModal } from "components/devices/linked/DeviceFullViewModal";
import { Link } from "components/link/Link";
import { useFetchDevicesQuery } from "store/slice/devicesSlice";
import { DeviceWidget } from "./DeviceWidget";

const DeviceWidgetGrid = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: devices } = useFetchDevicesQuery();
  if (devices) {
    return (
      <>
        <SimpleGrid mt={1} w="100%" columns={{ base: 1, md: 2, lg: 3, xl: 4 }} spacing="1.5rem">
          {mapDevicesToWidgets(devices, onOpen)}
        </SimpleGrid>
        <DeviceFullViewModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      </>
    );
  } else {
    return (
      <HStack>
        <Text>No devices were found. Try connect new one: </Text>
        <Link to="/connect"><Button>Connect device</Button></Link>
      </HStack>
    );
  }
};


const mapDevicesToWidgets = (devices, onOpen) => {
  return devices && Object.values(devices).map(device => (
    <DeviceWidget
      key={device.address}
      device={device}
      onOpen={onOpen}
    >
      {device.latestReport && (
        <Stack spacing="1">
          <Text fontSize="md">latest report:</Text>
          {Object.entries(device.latestReport.reportData).map(([key, value]) => (
            <Text key={key} fontSize="xs">{key + " : " + value}</Text>
          ))}
        </Stack>
      )}
    </DeviceWidget>
  )
  )
};

export { DeviceWidgetGrid };

