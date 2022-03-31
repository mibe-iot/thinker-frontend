import { Box, Button, Flex, Spacer, Text, VStack } from "@chakra-ui/react";
import { useBackgroundColors, useBorderColors, useTextColors } from "styles/theme/foundations/colors";


export const DiscoveredDeviceCard = ({ name, address, discoveredAt, rssi, knownDevice }) => {
    return (
        <Box
            border={1}
            p={0}
            borderRadius="2xl"
            borderStyle={"solid"}
            borderColor={useBorderColors().widget}
            boxSizing="fitContent"
            overflow="hidden"
        >
            <VStack flex={1} px={3} pt={2} mb={2} alignItems="start">
                <Flex w="100%" mb={3} alignItems="center">
                    <Text fontSize="3xl" align="center">{name}</Text>
                    <Spacer />
                    <Button variant="outline" size="sm" px={5} borderRadius="full">Connect</Button>
                </Flex>

                <VStack alignItems="start" spacing={0.5}>
                    <Text fontSize="sm">{address}</Text>
                    <Text fontSize="sm">Rssi: {rssi}</Text>
                </VStack>
            </VStack>
            {
                knownDevice ? <KnownDeviceFooter /> : <UnknownDeviceFooter />
            }
        </Box>
    )
}

const KnownDeviceFooter = () => (
    <Box h="100%" px={3} w="100%" bg={useBackgroundColors().good}>
        <Text fontSize="sm" textColor={useTextColors().dark}>Known device</Text>
    </Box>
);

const UnknownDeviceFooter = () => (
    <Box h="100%" px={3} w="100%" bg={useBackgroundColors().cardFooter}>
        <Text fontSize="sm">Unknown device</Text>
    </Box>
);