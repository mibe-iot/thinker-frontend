import { SimpleGrid } from "@chakra-ui/react";
import { useGetDiscoveredDevicesQuery } from "api/services/discoveryApi";
import { useFetchDevicesQuery } from "store/slice/devicesSlice";
import { DiscoveredDeviceCard } from "./DiscoveredDeviceCard";

export const DiscoveredDevices = () => {
  const { ids } = useFetchDevicesQuery();
  const { sorted: discoveredDevices, isFetching, isError} = useGetDiscoveredDevicesQuery(undefined, {
    selectFromResult: result => ({
      ...result,
      sorted: [...result.data]
      .filter(device => !ids.includes(device.address))
      .sort((a, b) => {
        console.log(a)
        return b.name.localeCompare(a)
      })
    })
  });
  return (
    !isFetching && !isError ?
    <SimpleGrid w="100%" columns={{ base: 1, md: 2, lg: 3 }} spacing="1.5rem">
      {discoveredDevices
      // .filter(device => !connectedDevicesIds.includes(device.address))
      .map((device, i) => <DiscoveredDeviceCard key={device.address} {...device} />)}
    </SimpleGrid> : <></>
  );
}