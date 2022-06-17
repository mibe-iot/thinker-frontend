import { Flex } from "@chakra-ui/react";
import { ActionPanel } from "components/panel/ActionPanel";
import { PageTitle } from "components/text/PageTitle";
import { DeviceWidgetGrid } from "components/widget/DeviceWidgetGrid";
import { DeviceWidgetGridActions } from "components/widget/DeviceWidgetGridActions";
import { useFetchDevicesQuery } from "store/slice/devicesSlice";

const Home = () => {
  const { isLoading, refetch } = useFetchDevicesQuery();
  return (
    <Flex direction="column" w="100%" spacing="5">
      <ActionPanel
        leftSide={<PageTitle>Linked devices</PageTitle>}
        rightSide={<DeviceWidgetGridActions refreshAction={refetch} isLoading={isLoading} />}
      />
      <DeviceWidgetGrid />
    </Flex>
  );
}

export default Home;
