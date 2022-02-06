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
import { SpinnerContainer } from "components/spinner/SpinnerContainer";

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
      <SpinnerContainer isLoading={isLoading || isFetching} error={error}>
          <SimpleGrid mt={1} w="100%" minChildWidth="16rem" spacing="2rem">
            {devices && mapDivicesToWidgets(devices)}
          </SimpleGrid>
      </SpinnerContainer>
    </Stack>
  );
};

const createDevicesActions = actions =>
  actions &&
  actions.map(action => ({
    ...action,
    execute: () => {
      console.log(action);
    }
  }));

const mapDivicesToWidgets = devices =>
  devices.map(device => (
    <Widget
      maxWidth={devices.length == 1 ? "32rem" : "none"}
      key={device.id}
      title={device.name}
      actions={createDevicesActions(device.actions)}
    >
      {device.reports && (
        <Stack spacing="3">
          <Text fontSize="lg">{"Last report:"}</Text>
          <Text fontSize="sm">{device.reports[0].content}</Text>
        </Stack>
      )}
    </Widget>
  ));

export { DevicesWidgetGrid };
