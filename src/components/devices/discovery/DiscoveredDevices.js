import { SimpleGrid } from "@chakra-ui/react";
import { useGetDiscoveredDevicesQuery } from "api/services/discoveryApi";
import { useEffect } from "react";
import { useFetchDevicesQuery } from "store/slice/devicesSlice";
import { delay } from "utils/utils";
import { DiscoveredDeviceCard } from "./DiscoveredDeviceCard";

export const DiscoveredDevices = () => {
  const { ids } = useFetchDevicesQuery();
  const { sorted: discoveredDevices, isFetching, isError, refetch, isSuccess } = useGetDiscoveredDevicesQuery(undefined, {

    selectFromResult: result => ({
      ...result,
      sorted: [...result.data]
        .filter(device => !ids.includes(device.address))
        .sort((a, b) => {
          return b.knownDevice - a.knownDevice + b.name.localeCompare(a)
        })
    })
  });
  useEffect(() => {
    if (discoveredDevices.length === 0 && isSuccess) {
      delay(1, () => {
        refetch();
      })
      
    }
  }, [discoveredDevices, isSuccess, refetch])
  return (
    !isFetching && !isError ?
      <SimpleGrid w="100%" columns={{ base: 1, md: 2, lg: 3 }} pb={6} spacing="1.5rem">
        {discoveredDevices
          .map(device => <DiscoveredDeviceCard key={device.address} {...device} />)}
      </SimpleGrid> : <></>
  );
}

