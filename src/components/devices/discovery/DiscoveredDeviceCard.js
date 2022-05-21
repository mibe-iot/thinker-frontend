import { Box, Button, Center, Flex, Spacer, Text, VStack } from "@chakra-ui/react";
import { useConnectDeviceMutation } from "api/services/discoveryApi";
import { SpinnerContainer } from "components/spinner/SpinnerContainer";
import { useState } from "react";
import { useBackgroundColors, useBorderColors, useTextColors } from "styles/theme/foundations/colors";


export const DiscoveredDeviceCard = ({ id, name, address, discoveredAt, rssi, knownDevice, refresh }) => {
    const [connectDevice] = useConnectDeviceMutation(address);
    const widgetBorderColor = useBorderColors().widget;
    const [isLoading, setLoading] = useState(false);

    if (isLoading) {
        return <Center height="100%" width="100%">
            <SpinnerContainer isLoading={true}></SpinnerContainer>
        </Center> 
    }

    return (
        <Flex
            border={1}
            p={0}
            borderRadius="2xl"
            borderStyle={"solid"}
            borderColor={widgetBorderColor}
            boxSizing="fitContent"
            overflow="hidden"
            flexDirection="column"
        >
            <VStack flex={1} px={3} pt={3} mb={2} alignItems="start">
                <Flex flex={1} w="100%" mb={3} alignItems="top">
                    <Text fontSize="2xl" align="start">{name ? name : "[unknown]"}</Text>
                    <Spacer />
                    <Button variant="outline" size="sm" px={5} borderRadius="full" isDisabled={isLoading}
                        onClick={() => {
                            connectDevice(address);
                            setLoading(true)
                            refresh()
                        }}>
                        Connect
                    </Button>
                </Flex>

                <VStack alignItems="start" spacing={0.5}>
                    <Text fontSize="sm">{address}</Text>
                    <Text fontSize="sm">{new Date(discoveredAt).toLocaleDateString("ru-RU",
                        { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" })}</Text>
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