import { Button, HStack, SimpleGrid, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { DeviceFullViewModal } from "components/devices/linked/DeviceFullViewModal";
import { Link } from "components/link/Link";
import { useErrorToast } from "hooks/useErrorToast";
import { useFetchDevicesQuery } from "store/slice/devicesSlice";
import { DeviceWidget } from "./DeviceWidget";

const DeviceWidgetGrid = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: devices, isLoading, refetch, error } = useFetchDevicesQuery();
  useErrorToast(error)
  if (devices && Object.keys(devices).length > 0) {
    return (
      <>
        <SimpleGrid mt={1} w="100%" columns={{ base: 1, md: 2, lg: 3, xl: 4 }} spacing="1.5rem">
          {mapDevicesToWidgets(devices, onOpen)}
        </SimpleGrid>
        <DeviceFullViewModal isOpen={isOpen} onOpen={onOpen} onClose={() => {onClose(); refetch()}} />
      </>
    );
  } else if(!isLoading) {
    return (
      <HStack>
        <Text>No devices were found. Try connect a new one: </Text>
        <Link to="/connect"><Button>Connect device</Button></Link>
      </HStack>
    );
  } else {
    return <></>
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
            <Text key={key} fontSize="xs">{`${key} : ${parseFloat(value).toFixed(2)}`}</Text>
          ))}
        </Stack>
      )}
    </DeviceWidget>
  )
  )
};

export { DeviceWidgetGrid };

