import { Box, Button, Flex, Spacer, Text, VStack } from "@chakra-ui/react";
import { useConnectDeviceMutation } from "api/services/discoveryApi";
import { useBackgroundColors, useBorderColors, useTextColors } from "styles/theme/foundations/colors";


export const DiscoveredDeviceCard = ({ id, name, address, discoveredAt, rssi, knownDevice }) => {
    const [connectDevice, { isLoading }] = useConnectDeviceMutation(address);
    return (
        <Flex
            border={1}
            p={0}
            borderRadius="2xl"
            borderStyle={"solid"}
            borderColor={useBorderColors().widget}
            boxSizing="fitContent"
            overflow="hidden"
            flexDirection="column"
        >
            <VStack flex={1} px={3} pt={3} mb={2} alignItems="start">
                <Flex flex={1} w="100%" mb={3} alignItems="top">
                    <Text fontSize="2xl" align="start">{name ? name : "[unknown]"}</Text>
                    <Spacer />
                    <Button variant="outline" size="sm" px={5} borderRadius="full"
                        onClick={() => connectDevice(address)}>
                        Connect
                    </Button>
                </Flex>

                <VStack alignItems="start" spacing={0.5}>
                    <Text fontSize="sm">{address}</Text>
                    <Text fontSize="sm">{discoveredAt}</Text>
                    <Text fontSize="sm">Rssi: {rssi}</Text>
                </VStack>
            </VStack>
            {
                knownDevice ? <KnownDeviceFooter /> : <UnknownDeviceFooter />
            }
        </Flex>
    )
}

const KnownDeviceFooter = () => (
    <Box px={3} w="100%" bg={useBackgroundColors().good}>
        <Text fontSize="sm" textColor={useTextColors().dark}>Known device type</Text>
    </Box>
);

const UnknownDeviceFooter = () => (
    <Box px={3} w="100%" bg={useBackgroundColors().cardFooter}>
        <Text fontSize="sm">Unknown device type</Text>
    </Box>
);