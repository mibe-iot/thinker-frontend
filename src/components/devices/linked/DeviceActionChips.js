import { Button, Flex, Text } from "@chakra-ui/react";
import { useExecuteActionMutation } from "api/services/devicesApi";


export const DeviceActionChips = ({ device }) => {
  if(!device.actions || device.actions.length < 1) {
    return <></>
  }
  return (
    <Flex flexWrap="wrap" alignItems="baseline" spacing={2}>
      {device.actions.map((action, index) => <DeviceActionChip key={action.name} deviceId={device.id} actionName={action.name} />)}
    </Flex>
  )
}

const DeviceActionChip = ({ deviceId, actionName }) => {
  const [executeAction, { isLoading }] = useExecuteActionMutation();
  return (
    <Button
      p={3}
      opacity={0.8}
      m={0.5}
      size="xs"
      variant="outline"
      textAlign="center"
      borderRadius="full"
      isDisabled={isLoading}
      onClick={() => executeAction(deviceId, actionName)}
    >
      {actionName}
    </Button>
  );
}

