import { Flex } from "@chakra-ui/react";
import { RefreshButton } from "components/button/RefreshButton";

export const WidgetGridActions = ({refreshAction, ...props}) => (
  <Flex {...props}>
    <RefreshButton
      border="1px"
      title="Refresh widgets"
      onClick={() => refreshAction()}
    />
  </Flex>
)
