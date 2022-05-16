import { useGetAllHooksQuery } from "api/services/hooksApi"
import { PlusButton } from "components/button/PlusButton"
import { RefreshButton } from "components/button/RefreshButton"
import { ActionPanel } from "components/panel/ActionPanel"
import { SpinnerContainer } from "components/spinner/SpinnerContainer"
import { PageTitle } from "components/text/PageTitle"
import { useBorderColors } from "styles/theme/foundations/colors"
import { coalesce, delay } from "utils/utils"
import { CreateHookModal } from "./CreateHookModal"

const { Flex, Text, SimpleGrid, VStack, Divider, useDisclosure, HStack } = require("@chakra-ui/react")


export const HooksPage = () => {
    const { data: hooks, isLoading, refetch } = useGetAllHooksQuery();
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <Flex direction="column" w="100%">
                <ActionPanel
                    leftSide={<PageTitle>Hooks</PageTitle>}
                    rightSide={<HStack spacing={4}>
                        <PlusButton onClick={() => onOpen()} />
                        <RefreshButton isLoading={isLoading} onClick={refetch} />
                    </HStack>}
                />
                <SpinnerContainer isLoading={isLoading}>
                    <SimpleGrid mt={1} w="100%" columns={{ base: 1, md: 2, lg: 3, xl: 4 }} spacing="1.5rem">

                        {hooks && hooks.map(hook => <HookCard key={hook.id} hook={hook} />)}

                    </SimpleGrid>
                </SpinnerContainer>
            </Flex>
            <CreateHookModal isOpen={isOpen} onOpen={onOpen} onClose={() => { delay(1, () => refetch()); onClose();  }} />
        </>
    )
}

const HookCard = ({ hook }) => {
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
            <Text fontSize="lg" fontWeight="semibold">Name: {coalesce(hook.name, "[None]")}</Text>
            <Text>Type: {coalesce(hook.type, "[None]")}</Text>
            <Text>Id: {coalesce(hook.id, "[None]")}</Text>
            <Text fontSize="sm">Description: {coalesce(hook.description, "[None]")}</Text>
        </VStack>
    )
}