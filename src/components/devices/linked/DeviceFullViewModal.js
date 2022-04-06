import { ChevronLeftIcon, ChevronRightIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Button, Divider, Flex, FormControl, FormLabel, HStack, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, Spacer, Stack, Table, TableCaption, TableContainer, Tbody, Td, Text, Textarea, Tfoot, Th, Thead, Tr, VStack } from "@chakra-ui/react";
import { DEVICE_DESCRIPTION_LENGTH } from "api/contants";
import { DeviceActionChips } from "components/devices/linked/DeviceActionChips";
import { Field, Form, Formik } from "formik";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useFetchDevicesQuery } from "store/slice/devicesSlice";
import { useBorderColors } from "styles/theme/foundations/colors";
import { coalesce } from "utils/utils";

export const DeviceFullViewModal = ({ isOpen, onOpen, onClose: closeModal }) => {
    const activeDeviceAddress = useSelector(state => state.devices.activeDeviceAddress);
    const { data: entities } = useFetchDevicesQuery();
    const [isEditMode, setEditMode] = useState(false);
    const initialRef = useRef();
    if (!isOpen) {
        return <></>
    }

    const device = entities[activeDeviceAddress]
    const name = coalesce(device.name, "");
    const description = coalesce(device.description, "");
    const onClose = () => { setEditMode(false); closeModal() }
    const SaveButton = <Button mr={3} type="submit" isDisabled={!isEditMode}>Save</Button>
    return (

        <Modal
            isOpen={isOpen}
            onClose={() => { setEditMode(false); onClose() }}
            initialFocusRef={initialRef}
            size="5xl"
        >
            <ModalOverlay />
            <Formik
                initialValues={{ name: name, description: description }}
                onSubmit={(values, { setSubmitting }) => { alert(JSON.stringify(values, null, 2)); }}
            >
                {({ handleSubmit, errors, touched }) => (
                    <Form onSubmit={handleSubmit}>
                        <ModalContent>
                            <ModalHeader me={{ base: 6, sm: 0 }}>
                                <HStack gap={3}>
                                    <IconButton variant="ghost" borderRadius="full" icon={<EditIcon />}
                                        onClick={() => setEditMode(!isEditMode)} />
                                    <Field
                                        isReadOnly={!isEditMode}
                                        as={Input}
                                        id="name"
                                        name="name"
                                        type="string"
                                        variant={isEditMode ? "outline" : "filled"}
                                        width="16rem"
                                        placeholder="Any device name you want"
                                    />
                                    {SaveButton}
                                </HStack>
                            </ModalHeader>
                            <ModalCloseButton />

                            <ModalBody pb={6}>
                                <Stack direction="column" gap={4}>
                                    <Field
                                        isReadOnly={!isEditMode}
                                        as={Textarea}
                                        id="description"
                                        name="description"
                                        type="string"
                                        variant={isEditMode ? "outline" : "filled"}
                                        placeholder="Device description"
                                        maxLength={DEVICE_DESCRIPTION_LENGTH}
                                    />
                                    <HStack>
                                        <Text fontSize="md" fontWeight="semibold">Actions:</Text>
                                        <DeviceActionChips device={device} />
                                    </HStack>

                                    <Divider />
                                    <SimpleGrid minChildWidth="12rem" gap={6}>
                                        <DeviceModalAdditionalData device={device} />
                                        <DeviceReportsViewer />
                                    </SimpleGrid>
                                </Stack>
                            </ModalBody>
                            <ModalFooter>
                                {SaveButton}
                                <Button ref={initialRef} variant="outline" onClick={onClose}>Cancel</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Form>
                )}
            </Formik>
        </Modal>

    );
}


const DeviceModalAdditionalData = ({ device }) => {
    return (
        <Flex flexDirection="column" py={2}>
            <Text fontSize="md" fontWeight="semibold" mb={2}>Device data:</Text>
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

const DeviceReportsViewer = () => {
    return (
            <TableContainer width="100%" border="1px" borderColor={useBorderColors().lightBorder} borderRadius="lg" px={4}>
                <Table>
                    <TableCaption placement="top">Device reports</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Type</Th>
                            <Th>Date created</Th>
                            <Th>Data</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <ReportItem />
                        <ReportItem />
                        <ReportItem />
                        <ReportItem />
                        <ReportItem />
                    </Tbody>
                    <Tfoot>
                        <Tr>
                            <td></td>
                            <td></td>
                            <td>
                                <Flex width="100%" p={4}>
                                    <Spacer />
                                    <Pagination /> 
                                </Flex>
                            </td>
                        </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>
    )
}

const Pagination = ({pageSize = 5}) => {
    const itemsCount = 100;
    const [currentPage, setCurrentPage] = useState(1);
    const maxPage = Math.ceil(itemsCount / pageSize);
    const minPage = 1;
    const incrementPage = () => { setCurrentPage(Math.min(maxPage, currentPage + 1)) }
    const decrementPage = () => { setCurrentPage(Math.max(minPage, currentPage - 1)) }
    return (
        <HStack>
            <IconButton isDisabled={currentPage === minPage} size="md" borderRadius="full" variant="ghost" icon={<ChevronLeftIcon />} onClick={decrementPage} />
            <Button isActive variant="outline" borderRadius="full" py={2} px={0} border="1px">{currentPage}</Button>
            <IconButton isDisabled={currentPage === maxPage} size="md" borderRadius="full" variant="ghost" icon={<ChevronRightIcon />} onClick={incrementPage} />
        </HStack>
    )
}

const ReportItem = ({ deviceReport }) => {
    const reportData = Object.entries({
        humidity: 12,
        temperature: 32
    })
        .map(([key, value]) => `${key}: ${value}`)
        .map(it => <Text>{it}</Text>);
    let date = Date();
    // type | date created | data
    return (
        <Tr>
            <Td>data</Td>
            <Td>{new Date(date).toLocaleDateString("ru-RU", {year: "numeric", month:"numeric", day:"numeric"})}</Td>
            <Td>{<Flex flexDirection="column">{reportData}</Flex>}</Td>
        </Tr>
    )
}