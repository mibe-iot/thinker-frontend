import { ChevronLeftIcon, ChevronRightIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Badge, border, Box, Button, Center, Divider, Flex, FormControl, FormLabel, HStack, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, Spacer, Stack, Table, TableCaption, TableContainer, Tbody, Td, Text, Textarea, Tfoot, Th, Thead, Tr, useDisclosure, VStack } from "@chakra-ui/react";
import { DEVICE_DESCRIPTION_LENGTH } from "api/contants";
import { useDeleteDeviceMutation, useGetReportsPageQuery, usePatchDeviceMutation } from "api/services/devicesApi";
import { RefreshButton } from "components/button/RefreshButton";
import { DeviceActionChips } from "components/devices/linked/DeviceActionChips";
import { WarningBadge } from "components/info/WarningItem";
import { Field, Form, Formik } from "formik";
import { usePagination } from "hooks/usePagination";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useFetchDevicesQuery } from "store/slice/devicesSlice";
import { useBorderColors } from "styles/theme/foundations/colors";
import { coalesce } from "utils/utils";

export const DeviceFullViewModal = ({ isOpen, onOpen, onClose: closeModal }) => {
    const activeDeviceAddress = useSelector(state => state.devices.activeDeviceAddress);
    const { data: entities } = useFetchDevicesQuery();
    const [updateDevice, { isLoading, isError, error }] = usePatchDeviceMutation(activeDeviceAddress);
    const [deleteDevice, { isLoading: isDeleting }] = useDeleteDeviceMutation();
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
            size="6xl"
        >
            <ModalOverlay />
            <Formik
                initialValues={{ name: name, description: description }}
                onSubmit={(values, { setSubmitting }) => {
                    updateDevice({ deviceId: device.id, ...values })
                    if (!isError) {
                        setSubmitting(false)
                        onClose()
                    }
                }}
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
                                    <DeleteDeviceButton device={device} onDelete={() => { deleteDevice(device.id); onClose() }} isDisabled={!isEditMode} />
                                    {isError && <WarningBadge message="Update device failed" />}
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
                                        <DeviceReportsViewer device={device} />
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
                <VStack align="start">
                    {device.reportTypes &&
                        <>
                            <Text>Known report types</Text>
                            {device.reportTypes.map(reportType => <Badge key={reportType} px={1} borderRadius="full">{reportType}</Badge>)}
                        </>
                    }
                </VStack>
            </VStack>
        </Flex>
    )
}

const DeviceReportsViewer = ({ device }) => {
    const pageSize = 5;
    const [itemsCount, setItemsCount] = useState(1)
    let pagination = usePagination(1, itemsCount, pageSize)
    const { data: reportsPage, isLoading, refetchReports } = useGetReportsPageQuery({
        deviceId: device.id,
        page: pagination.page,
        pageSize: 5
    });
    const borderColor = useBorderColors().lightBorder;
    useEffect(() => (
        !isLoading && reportsPage && setItemsCount(reportsPage.itemsCount)
    ), [isLoading, reportsPage])

    const getItemNumber = (i) => (pageSize * (pagination.page - 1)) + i + 1;
    const isAnyReportsFound = (reportsPage && reportsPage.reports && reportsPage.reports.length > 0)
    return (
        isAnyReportsFound ?
            <VStack>
                <TableContainer width="100%" border="1px" borderColor={borderColor} borderRadius="lg" px={4}>
                    <Table>
                        <TableCaption placement="top">Device reports</TableCaption>
                        <Thead>
                            <Tr>
                                <Th>No. / Type</Th>
                                <Th>Date created</Th>
                                <Th>Data</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                reportsPage.reports.map((report, i) =>
                                    <ReportItem key={report.id} number={getItemNumber(i)} report={report} />)
                            }
                        </Tbody>
                        <Tfoot>
                            <Tr>
                                <Th>No. / Type</Th>
                                <Th>Date created</Th>
                                <Th>Data</Th>
                            </Tr>
                        </Tfoot>
                    </Table>
                </TableContainer>
                <Flex width="100%" p={4}>
                    <Spacer />
                    <Pagination isLoading={isLoading} {...pagination} />
                </Flex>
            </VStack>
            : <Center><Text me={2}>No reports found</Text><RefreshButton onClick={refetchReports} /></Center>
    )
}

const Pagination = ({ page, incrementPage, decrementPage, isFirstPage, isLastPage, isLoading }) => {
    return (
        <HStack>
            <IconButton isDisabled={isFirstPage} size="md" borderRadius="full" variant="ghost" icon={<ChevronLeftIcon />} onClick={decrementPage} />
            <Button isLoading={isLoading} isActive variant="outline" borderRadius="full" py={2} px={0} border="1px">{page}</Button>
            <IconButton isDisabled={isLastPage} size="md" borderRadius="full" variant="ghost" icon={<ChevronRightIcon />} onClick={incrementPage} />
        </HStack>
    )
}

const ReportItem = ({ number, report }) => {
    const reportData = Object.entries(report.reportData)
        .map(([key, value]) => `${key}: ${value}`)
        .map((it, i) => <Text key={i}>{it}</Text>);
    // type | date created | data
    return (
        <Tr>
            <Td>{number}<Badge px={1} borderRadius="full">{report.type}</Badge></Td>
            <Td>{new Date(report.dateTimeCreated).toLocaleDateString("ru-RU", { year: "numeric", month: "numeric", day: "numeric" })}</Td>
            <Td>{<Flex flexDirection="column">{reportData}</Flex>}</Td>
        </Tr>
    )
}

const DeleteDeviceButton = ({ device, onDelete, ...buttonProps }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()
    return (
        <>
            <IconButton colorScheme="red" variant="ghost"
                icon={<DeleteIcon />} borderRadius="full" onClick={onOpen} {...buttonProps} />
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Delete device "{coalesce(device.name, device.deviceClass)}"?
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme='red' onClick={() => { onDelete(device); onClose() }} ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}