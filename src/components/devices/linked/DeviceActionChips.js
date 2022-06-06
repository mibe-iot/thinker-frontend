import { Button, Flex } from "@chakra-ui/react";
import { useExecuteActionMutation } from "api/services/devicesApi";
import { useState } from "react";


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
      py={1.5}
      px={3}
      opacity={0.8}
      size="x s"
      variant="outline"
      textAlign="center"
      borderRadius="full"
      isDisabled={isLoading}
      onClick={() => executeAction({deviceId, actionName})}
    >
      {actionName}
    </Button>
  );
}

export const DeviceSelectableActionChip = ({ actionName , onClick, initialSelected}) => {
  const [isSelected, setSelected] = useState(!!initialSelected());
  return (
    <DeviceActionChipButton
      colorScheme={isSelected ? "green" : "gray" }
      variant="solid"
      name={actionName}
      onClick={() => {onClick(); setSelected(!isSelected)}}
    />
  );
}

const DeviceActionChipButton = ({name, onClick, ...props}) => {
  return (
    <Button
      py={1.5}
      px={3}
      opacity={0.8}
      m={0.5}
      size="xs"
      variant="outline"
      textAlign="center"
      borderRadius="full"
      onClick={onClick}
      {...props}
    >
      {name}
    </Button>
  );
}
