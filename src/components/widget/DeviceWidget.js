import {
  Box, Divider, Flex, IconButton, Spacer, Text, VStack
} from "@chakra-ui/react";
import { DeviceActionChips } from "components/devices/linked/DeviceActionChips";
import { ChakraIcon } from "components/icon/ChakraIcon";
import { IoResize } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { setActiveDeviceAddress } from "store/slice/devicesSlice";
import { useBorderColors } from "styles/theme/foundations/colors";

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
    <WidgetHeader title={device.deviceClass ? device.deviceClass : device.id} itemAddress={device.address} onOpen={onOpen} />
    <DeviceActionChips device={device} />
    <Box px={2}>{props.children}</Box>
  </VStack>
)

const WidgetHeader = ({ title, itemAddress, onOpen }) => {
  const dispatch = useDispatch();
  const icon = <ChakraIcon icon={IoResize} fontSize="1.2rem" />;
  return (
    <Flex alignItems="center" px={2} width="100%">
      <Text fontSize="lg" fontWeight="bold" textAlign="center">{title}</Text>
      <Spacer />
      <IconButton variant="ghost" borderRadius="full" aria-label="Full view" icon={icon} onClick={() => {
        dispatch(setActiveDeviceAddress(itemAddress))
        onOpen();
      }} />
    </Flex>
  );
};

export { DeviceWidget };

