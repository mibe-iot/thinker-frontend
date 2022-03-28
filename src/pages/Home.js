import { Stack, Text } from "@chakra-ui/react";
import { ActionPanel } from "components/panel/ActionPanel";
import { DeviceWidgetGrid } from "components/widget/DeviceWidgetGrid";
import { DeviceWidgetGridActions } from "components/widget/DeviceWidgetGridActions";
import { useFetchDevicesQuery } from "store/slice/devicesSlice";

const Home = () => {
  const { isLoading, refetch } = useFetchDevicesQuery();
  return (
    <Stack w="100%" spacing="5">
      <ActionPanel
        leftSide={<Text fontSize="2xl">Linked devices</Text>}
        rightSide={<DeviceWidgetGridActions refreshAction={refetch} isLoading={isLoading} />}
      />
      <DeviceWidgetGrid />
    </Stack>
  );
}

export default Home;
