import { Box, Button, Divider, Flex, HStack, Text, VStack } from "@chakra-ui/react"
import { useBorderColors } from "styles/theme/foundations/colors"


export const DiscoveredDeviceCard = ({ name, address, discoveredAt, rssi, isKnownDevice }) => {
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
            <HStack px={3}>
                <VStack flex={1} pt={2}  mb={5} alignItems="start">
                    <Text fontSize="4xl" mb={3}>{name}</Text>
                    <Text>{address}</Text>
                    <Flex><Text>Rssi: </Text><Text>{rssi}</Text></Flex>
                </VStack>
                <VStack>
                    <Button></Button>
                    <Button></Button>
                    <Button></Button>
                </VStack>
            </HStack>
            <Divider />
            <Box px={3} w="100%" bg="red.100">
                <Text>{isKnownDevice ? "Known device" : "Unknown device"}</Text>
            </Box>
        </Box>
    )
}