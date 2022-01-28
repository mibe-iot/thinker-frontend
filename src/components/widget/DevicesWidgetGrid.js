import { SimpleGrid, Box, IconButton, Stack, List } from "@chakra-ui/react";
import { fetchDevices } from "store/slice/devicesSlice";
import { useDispatch, useSelector } from "react-redux";
import { Widget } from "./Widget";
import { RefreshButton } from "components/button/RefreshButton";
import { devicesApi } from "services/DeviceService";

const DevicesWidgetGrid = () => {
  const dispatch = useDispatch();
  // const devices = useSelector((state) => state.devices)
  const { data: devices } = devicesApi.useFetchAllLinkedDevicesQuery("");
  return (
    <Stack w="100%">
      <List alignSelf={{ base: "center", md: "end" }}>
        <RefreshButton
          border="1px"
          title="Refresh widgets"
          onClick={() => dispatch(fetchDevices())}
        />
      </List>
      <Box w="100%">
        <SimpleGrid w="100%" minChildWidth="16rem" spacing="2rem">
          {devices && devices.map(device => {
            console.log("1");
            return <Widget key={device.id} title={device.name} />;
          })}
        </SimpleGrid>
      </Box>
    </Stack>
  );
};

export { DevicesWidgetGrid };
