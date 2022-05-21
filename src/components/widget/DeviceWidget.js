import {
  Badge,
  Box, Center, Divider, Flex, IconButton, Spacer, Text, VStack
} from "@chakra-ui/react";
import { DEVICE_STATUS_WAITING_CONFIGURATION } from "api/contants";
import { DeviceActionChips } from "components/devices/linked/DeviceActionChips";
import { ChakraIcon } from "components/icon/ChakraIcon";
import { IoResize } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { setActiveDeviceAddress } from "store/slice/devicesSlice";
import { useBorderColors } from "styles/theme/foundations/colors";
import { coalesce } from "utils/utils";

const DeviceWidget = ({ device, onOpen, ...props }) => (
  <VStack
    align="start"
    border={1}
    borderRadius="2xl"
    borderStyle={"solid"}
    borderColor={useBorderColors().widget}
    p={3}
    boxSizing="fitContent"
    divider={<Divider />}
    {...props}
  >
    <WidgetHeader
      title={coalesce(device.name, device.deviceClass, "[unknown]")}
      description={device.description}
      itemAddress={device.address}
      onOpen={onOpen}
    />
    {device.status === DEVICE_STATUS_WAITING_CONFIGURATION
      ? <Center width="100%"><Badge colorScheme="yellow">Device is waiting configuration</Badge></Center>
      : <>
        <DeviceActionChips device={device} />
        <Divider />
        <Box>{props.children}</Box>
      </>
    } 
  </VStack>
)

const WidgetHeader = ({ title, description, itemAddress, onOpen }) => {
  const dispatch = useDispatch();
  const icon = <ChakraIcon icon={IoResize} fontSize="1.2rem" />;
  return (
    <Flex flexDir="column" width="100% ">
      <Flex alignItems="center" width="100%">
        <Text fontSize="lg" fontWeight="bold" textAlign="center">{title}</Text>
        <Spacer />
        <IconButton variant="ghost" borderRadius="full" aria-label="Full view" icon={icon} onClick={() => {
          dispatch(setActiveDeviceAddress(itemAddress))
          onOpen();
        }} />
      </Flex>
      {description && description.length > 0 && <Text opacity={0.6}>{
        description.length < 90 ? description : `${description.substring(0, 90)}...`
      }</Text>}
    </Flex>
  );
};

export { DeviceWidget };

