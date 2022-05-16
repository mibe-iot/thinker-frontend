import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Center, Divider, Flex, FormLabel, Heading, HStack, Input, SimpleGrid, Stack, Text, Tooltip, VStack } from "@chakra-ui/react";
import { useCreateTriggersMutation, useGetAllHooksQuery } from "api/services/hooksApi";
import { RefreshButton } from "components/button/RefreshButton";
import { ActionPanel } from "components/panel/ActionPanel";
import { SpinnerContainer } from "components/spinner/SpinnerContainer";
import { PageTitle } from "components/text/PageTitle";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { useParams } from "react-router-dom"
import { useFetchDevicesQuery } from "store/slice/devicesSlice";



export const AddDeviceTriggersPage = () => {
    const { data: devices, refetch, isLoading: isDeviceLoading } = useFetchDevicesQuery();
    const { deviceId } = useParams();
    const tmp = Object.values(devices).filter(device => device.id === deviceId);
    const device = tmp.length > 0 ? tmp[0] : undefined
    return (
        <SpinnerContainer isLoading={isDeviceLoading}>
        {device
            ? <Flex direction="column" width="100%">
                <ActionPanel
                    leftSide={<PageTitle>Hooks</PageTitle>}
                    rightSide={
                        <RefreshButton onClick={refetch} isLoading={isDeviceLoading}/>
                    }
                />
                <Accordion allowToggle mb={4}>
                    <AccordionItem border={0}>
                        <AccordionButton>
                            <Box flex='1' textAlign='left'>
                                <Heading as="h2" size="lg">Create new device reports triggers</Heading>
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel pb={4}>
                            <CreateTriggersForm device={device} />
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
                <Divider />
            </Flex >
            : <Center width="100%"><Heading>404 Error: Device not found by id={deviceId}</Heading></Center>
                }
            </SpinnerContainer>
    )
}

const CreateTriggersForm = ({device}) => {
    const [createTriggers, {}] = useCreateTriggersMutation();
    const { data: hooks } = useGetAllHooksQuery();
    const [selectedTypes, setSelectedTypes] = useState({});
    const [selectedHooks, setSelectedHooks] = useState({});
    const [isSaveActive, setSaveActive] = useState(false);
    const toggleSelectedHook = (hookId) => {
        setSelectedHooks(hooks => {
            hooks[hookId] = !hooks[hookId]
            toggleSaveActive()
            return selectedHooks
        })
    }
    const toggleSelectedType = (type) => {
        setSelectedTypes(types => {
            types[type] = !types[type]
            toggleSaveActive()
            return selectedTypes
        })
    }

    const toggleSaveActive = () => {
        setSaveActive(
            Object.values(selectedTypes).some(obj => !!obj) &&
            Object.values(selectedHooks).some(obj => !!obj)
        )
    }
    const onSave = () => {
        const hookIds = Object.entries(selectedHooks).filter(([_, selected]) => !!selected).map(([id, _]) => id)
        const reportTypes = Object.entries(selectedTypes).filter(([_, selected]) => !!selected).map(([type, _]) => type)
        createTriggers({
            deviceId: device.id,
            hookIds: hookIds,
            reportTypes: reportTypes
        })
        console.log({
            deviceId: device.id,
            hookIds: hookIds,
            reportTypes: reportTypes
        })
        setSelectedHooks({})
        setSelectedTypes({})
        setSaveActive(false)
    }
    const Chip = ({ id, name, initialChecked, callback }) => {
        const [isChecked, setChecked] = useState(initialChecked);
        return (
            <Tooltip label={name} placement="top">
        <Button
        size="sm"
        m={1}
            borderRadius="full"
            colorScheme={isChecked ? "green" : "gray"}
            onClick={() => { callback(id); setChecked(!isChecked) }}
        >
            {name.length > 25 ? name.substring(0,35) + "..." : name}
        </Button>
        </Tooltip>
        )
    }
    return (
        <>
        <SimpleGrid columns={{base: 1, md: 2}}>
            <VStack align="start">
            <Divider my={4}/>
                <Text fontSize="lg">Select device report types, that will trigger hooks</Text>
                <Flex pt={3} direction="row" wrap="wrap">
                    {device.reportTypes && device.reportTypes.length > 0
                        ? device.reportTypes.map(reportType => (<Chip
                        key={reportType}
                            id={reportType}
                            name={reportType}
                            initialChecked={!!selectedTypes[reportType]}
                            callback={(type) => toggleSelectedType(type)} />)
                        )
                        : <Text>No device report types available</Text>
                    }
                </Flex>
            </VStack>
            <VStack align="start">
            <Divider my={4}/>
                <Text fontSize="lg">Select hooks to trigger</Text>
                <Flex pt={3} direction="row" wrap="wrap">
                    {hooks
                        ? hooks.map(hook => (<Chip
                        key={hook.id}
                            id={hook.id}
                            name={`${hook.name}: ${hook.description}`}
                            initialChecked={!!selectedHooks[hook.id]}
                            callback={(id) => toggleSelectedHook(id)} />)
                        )
                        : <Text>No hooks available</Text>
                    }
                </Flex>
            </VStack>
        </SimpleGrid>
        <Flex mt={12}><Box flex="1"></Box><Button isDisabled={!isSaveActive} px={24} onClick={onSave}>Save</Button></Flex>
        </>
    )
}
