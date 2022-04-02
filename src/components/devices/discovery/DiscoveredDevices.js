import { SimpleGrid } from "@chakra-ui/react";
import { useGetDiscoveredDevicesQuery } from "api/services/discoveryApi";
import { useSelector } from "react-redux";
import { DiscoveredDeviceCard } from "./DiscoveredDeviceCard";

export const DiscoveredDevices = () => {
  const { data: discoveredDevices, isFetching, isError} = useGetDiscoveredDevicesQuery();
  const connectedDevicesIds = useSelector(state => state.devices.ids); 
  return (
    !isFetching && !isError ?
    <SimpleGrid w="100%" columns={{ base: 1, md: 2, lg: 3 }} spacing="1.5rem">
      {discoveredDevices
      .filter(device => !connectedDevicesIds.includes(device.address))
      .map((device, i) => <DiscoveredDeviceCard key={device.address} {...device} />)}
    </SimpleGrid> : <></>
  );
}