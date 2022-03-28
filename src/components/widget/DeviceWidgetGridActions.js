import { Flex } from "@chakra-ui/react";
import { RefreshAction } from "components/panel/actions/RefreshAction";

export const DeviceWidgetGridActions = ({ refreshAction, isLoading, ...props }) => {
  return (
    <Flex {...props}>
      <RefreshAction refreshAction={refreshAction} refreshHotkeys="Alt+R" title="Refresh devices" isLoading={isLoading} />
    </Flex>
  );
};
