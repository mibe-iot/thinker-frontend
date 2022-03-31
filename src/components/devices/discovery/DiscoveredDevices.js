import { SimpleGrid } from "@chakra-ui/react";
import { DiscoveredDeviceCard } from "./DiscoveredDeviceCard";

export const DiscoveredDevices = () => {

  return (
    <SimpleGrid w="100%" columns={{ base: 1, md: 2, lg: 3 }} spacing="1.5rem">
      {discoveredDevices.map(device => <DiscoveredDeviceCard {...device} />)}
    </SimpleGrid>
  );
}

const discoveredDevices = [
  {
    name: "a1",
    address: "AA:BB:CC:DD:EE:FF",
    discoveredAt: "2022-10-10T14:48:00",
    rssi: -30,
    knownDevice: true
  },
  {
    name: "b2",
    address: "AA:BB:CC:DD:EE:FA",
    discoveredAt: "2022-11-10T14:48:00",
    rssi: 8,
    knownDevice: false
  },
]