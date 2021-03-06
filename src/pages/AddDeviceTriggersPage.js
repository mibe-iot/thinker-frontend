import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Badge, Box, Button, Center, Divider, Flex, Heading, SimpleGrid, Text, Tooltip, VStack } from "@chakra-ui/react";
import { useCreateTriggersMutation, useDeleteTriggerMutation, useGetAllHooksQuery, useGetDeviceTriggersQuery } from "api/services/hooksApi";
import { DeleteButton } from "components/button/DeleteButton";
import { RefreshButton } from "components/button/RefreshButton";
import { ActionPanel } from "components/panel/ActionPanel";
import { SpinnerContainer } from "components/spinner/SpinnerContainer";
import { PageTitle } from "components/text/PageTitle";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useFetchDevicesQuery } from "store/slice/devicesSlice";
import { useBorderColors } from "styles/theme/foundations/colors";
import { coalesce, delay } from "utils/utils";

export const AddDeviceTriggersPage = () => {
    const { deviceId } = useParams();
    const { data: devices, refetch, isLoading: isDeviceLoading } = useFetchDevicesQuery();
    const { data: triggers, isLoading: isTriggersLoading, refetch: refetchTriggers } = useGetDeviceTriggersQuery(deviceId);
    const { data: hooks, isHooksLoading, refetch: refetchHooks } = useGetAllHooksQuery();
    const refresh = () => { refetch(); refetchTriggers(); refetchHooks() }
    const tmp = Object.values(devices).filter(device => device.id === deviceId);
    const device = tmp.length > 0 ? tmp[0] : undefined

    if (!device) {
        return (
            <Center width="100%"><Heading>404 Error: Device not found by id={deviceId}</Heading></Center>
        )
    }

    return (
        <VStack width="100%" spacing={16}>
            <SpinnerContainer isLoading={isDeviceLoading || isHooksLoading}>
                <Flex direction="column" width="100%">
                    <ActionPanel
                        leftSide={<PageTitle>Device's triggers</PageTitle>}
                        rightSide={
                            <RefreshButton
                                onClick={() => refresh()}
                                isLoading={isDeviceLoading || isTriggersLoading || isHooksLoading} />
                        }
                    />
                    <TriggerCreator device={device} />
                </Flex >
            </SpinnerContainer>
            <SpinnerContainer isLoading={isTriggersLoading || isHooksLoading}>
                <TriggersAndHooks refresh={refresh} triggers={triggers} hooks={hooks} />
            </SpinnerContainer>
        </VStack>
    )
}

const TriggerCreator = ({ device }) => {
    if (!device.reportTypes || device.reportTypes.length === 0) {
        return (<Text>Device doesn't have report types to create triggers</Text>)
    }
    return (
        <>
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
        </>
    )
}

const CreateTriggersForm = ({ device }) => {
    const [createTriggers] = useCreateTriggersMutation();
    const { data: hooks, refetch } = useGetAllHooksQuery();
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
        delay(1, refetch)
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
                    {name.length > 25 ? name.substring(0, 35) + "..." : name}
                </Button>
            </Tooltip>
        )
    }
    return (
        <>
            <SimpleGrid columns={{ base: 1, md: 2 }}>
                <VStack align="start">
                    <Divider my={4} />
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
                    <Divider my={4} />
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

const TriggersAndHooks = ({ triggers, hooks, refresh }) => {
    if (!triggers || triggers.length === 0 || !hooks || hooks.length === 0) return <></>
    const grouped = triggers.reduce((group, trigger) => {
        const { reportType } = trigger;
        group[reportType] = group[reportType] ?? [];
        group[reportType].push(trigger);
        return group;
    }, {});

    return (
        <VStack align="start" pb={4}>
            <Heading ps={2} as="h2" fontSize="xl" mb={5}>What hooks are called</Heading>
            {
                Object.entries(grouped).map(([type, typeTriggers]) => (
                    <VStack key={type} align="start">
                        <Flex direction="row" ps={2} alignItems="center">
                            <Text>When report type is</Text>
                            <Badge ms={3} px={2} borderRadius="full">{type}</Badge>
                        </Flex>
                        <SimpleGrid w="100%" columns={{ base: 1, md: 2, lg: 3, xl: 4 }} spacing="1.5rem">
                            {typeTriggers.map(trigger => (
                                <TriggerHookCard key={trigger.id} refresh={refresh} hook={hooks.filter(hook => hook.id === trigger.hookId)[0]} />
                            ))}
                        </SimpleGrid>

                    </VStack>
                ))
            }
        </VStack>
    )
}

export const TriggerHookCard = ({ hook, refresh }) => {
    const [deleteTrigger] = useDeleteTriggerMutation()
    return (
        <VStack
            align="start"
            border={1}
            borderRadius="2xl"
            borderStyle={"solid"}
            borderColor={useBorderColors().widget}
            p={3}
            boxSizing="fitContent"
            divider={<Divider />}
        >
            <Flex width="100%" direction="row">
                <Text pe={3} flexGrow={1} fontSize="lg" fontWeight="semibold">Name: {coalesce(hook.name, "[None]")}</Text>
                <DeleteButton onClick={() => { deleteTrigger(hook.id); delay(1, refresh) }} />
            </Flex>
            <Text fontSize="sm">Description: {coalesce(hook.description, "[None]")}</Text>
            <Text>Type: {coalesce(hook.type, "[None]")}</Text>
            <Text>Id: {coalesce(hook.id, "[None]")}</Text>
        </VStack>
    )
}