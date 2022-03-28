import { useEffect, useState } from "react"
import {
  SimpleGrid, Stack, Text
} from "@chakra-ui/react";
import { useNdjsonQuery } from "api/ThinkerApi";
import { ActionPanel } from "components/panel/ActionPanel";
import { SpinnerContainer } from "components/spinner/SpinnerContainer";
import { WidgetGridActions } from "components/widget/WidgetGridActions";
import { useDispatch } from "react-redux";
import { Widget } from "./Widget";

const DevicesWidgetGrid = () => {
  const dispatch = useDispatch();

  const [devices, isLoading, refetch] = useNdjsonQuery("/devices")
  // useEffect(() => refetch(), []);
  return (
    <Stack w="100%" spacing="5">
      <ActionPanel
        leftSide={<Text fontSize="2xl">Linked devices</Text>}
        rightSide={<WidgetGridActions refreshAction={refetch} />}
      />
      <SpinnerContainer isLoading={isLoading} >
        <SimpleGrid mt={1} w="100%" minChildWidth="16rem" spacing="2rem">
          {/* {devices && console.log(devices)} */}
          {mapDevicesToWidgets(devices)}
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

const mapDevicesToWidgets = devices => {
  // console.log(devices);
  return devices && devices.map(device => (
    <Widget
      maxWidth={devices.length == 1 ? "32rem" : "none"}
      key={device.id}
      title={device.id + " " + device.status}
      actions={createDevicesActions(device.actions)}
    >
      {device.latestReport && (
        <Stack spacing="3">
          <Text fontSize="lg">{"Last report:"}</Text>
          <Text fontSize="sm">{JSON.stringify(device.latestReport.reportData)}</Text>
        </Stack>
      )}
    </Widget>
  )
  )
};

export { DevicesWidgetGrid };

