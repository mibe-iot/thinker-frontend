import {
  SimpleGrid,
  Box,
  Flex,
  IconButton,
  Stack,
  List,
  Spinner,
  Center,
  Text
} from "@chakra-ui/react";
import { fetchDevices } from "store/slice/devicesSlice";
import { useDispatch, useSelector } from "react-redux";
import { Widget } from "./Widget";
import { ActionPanel } from "components/panel/ActionPanel";
import { devicesApi } from "services/DeviceService";
import { WidgetGridActions } from "components/widget/WidgetGridActions";

const DevicesWidgetGrid = () => {
  const dispatch = useDispatch();
  const {
    data: devices,
    isLoading,
    isFetching,
    error,
    refetch: refetchDevices
  } = devicesApi.useFetchAllLinkedDevicesQuery();
  return (
    <Stack w="100%" spacing="5">
      <ActionPanel
        leftSide={<Text fontSize="2xl">Linked devices</Text>}
        rightSide={<WidgetGridActions refreshAction={refetchDevices} />}
      />
      <Box w="100%">
        {(isLoading || isFetching) && (
          <Center>
            <Spinner size="xl" />
          </Center>
        )}
        {error && (
          <Center>
            <Text>{"Error: " + error.message}</Text>
          </Center>
        )}
        {!isFetching && (
          <SimpleGrid mt={1} w="100%" minChildWidth="16rem" spacing="2rem">
            {devices && mapDivicesToWidgets(devices)}
          </SimpleGrid>
        )}
      </Box>
    </Stack>
  );
};

const mapDivicesToWidgets = devices =>
  devices.map(device => (
    <Widget
      maxWidth={devices.length == 1 ? "32rem" : "none"}
      key={device.id}
      title={device.name}
    />
  ));

export { DevicesWidgetGrid };
