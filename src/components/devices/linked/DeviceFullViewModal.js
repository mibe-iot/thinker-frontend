import { Box, Button, Divider, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, Stack, Text, Textarea, VStack } from "@chakra-ui/react";
import { DEVICE_DESCRIPTION_LENGTH } from "api/contants";
import { DeviceActionChips } from "components/devices/linked/DeviceActionChips";
import { Field, Form, Formik } from "formik";
import { useSelector } from "react-redux";
import { useFetchDevicesQuery } from "store/slice/devicesSlice";
import { coalesce } from "utils/utils";

export const DeviceFullViewModal = ({ isOpen, onOpen, onClose }) => {
    const activeDeviceAddress = useSelector(state => state.devices.activeDeviceAddress);
    const { data: entities } = useFetchDevicesQuery();
    const device = entities[activeDeviceAddress]
    if (!isOpen) {
        return <></>
    }

    const name = coalesce(device.name, "");
    const description = coalesce(device.description, "");
    return (

        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size="5xl"
        >
            <ModalOverlay />
            <Formik
                initialValues={{ name: name, description: description }}
                onSubmit={(values, { setSubmitting }) => { alert(JSON.stringify(values, null, 2)); }}
            >
                {({ handleSubmit, errors, touched }) => (
                    <Form onSubmit={handleSubmit} isFullWidth>
                        <ModalContent>
                            <ModalHeader>
                                <Field
                                    as={Input}
                                    id="name"
                                    name="name"
                                    type="string"
                                    variant="outline"
                                    width="16rem"
                                    placeholder="Any device name you want"
                                />
                            </ModalHeader>
                            <ModalCloseButton />

                            <ModalBody pb={6}>
                                <Stack direction="column">
                                    <Field
                                        as={Textarea}
                                        id="description"
                                        name="description"
                                        type="string"
                                        variant="outline"
                                        placeholder="Device description"
                                        maxLength={DEVICE_DESCRIPTION_LENGTH}
                                    />
                                    <Text fontSize="md" fontWeight="semibold">Actions:</Text>
                                    <DeviceActionChips device={device} />
                                    <SimpleGrid minChildWidth="16rem" gap={6}>
                                        <DeviceModalAdditionalData device={device} />

                                    </SimpleGrid>
                                </Stack>
                            </ModalBody>
                            <ModalFooter>
                                <Button mr={3} type="submit">Save</Button>
                                <Button variant="outline" onClick={onClose}>Cancel</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Form>
                )}
            </Formik>
        </Modal>

    );
}


const DeviceModalAdditionalData = ({ device }) => {
    console.table(device)
    return (
        <Flex flexDirection="column">
            <Text fontSize="md" fontWeight="semibold">Device data:</Text>
            <VStack spacing={4} align="start">
                <FormControl>
                    <FormLabel htmlFor="address">Address</FormLabel>
                    <Input value={device.address} variant="filled" id="address" name="address" isReadOnly />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="device-class">Device class</FormLabel>
                    <Input value={coalesce(device.deviceClass, "none")} variant="filled" id="device-class" name="device-class" isReadOnly />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="status">Status</FormLabel>
                    <Input value={device.status} variant="filled" id="status" name="status" isReadOnly />
                </FormControl>
            </VStack>
        </Flex>
    )
}