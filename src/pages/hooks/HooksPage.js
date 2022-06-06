import { Flex, HStack, SimpleGrid, useDisclosure } from "@chakra-ui/react"
import { useGetAllHooksQuery } from "api/services/hooksApi"
import { PlusButton } from "components/button/PlusButton"
import { RefreshButton } from "components/button/RefreshButton"
import { ActionPanel } from "components/panel/ActionPanel"
import { SpinnerContainer } from "components/spinner/SpinnerContainer"
import { PageTitle } from "components/text/PageTitle"
import { delay } from "utils/utils"
import { CreateHookModal } from "./CreateHookModal"
import { HookCard } from "./HookCard"



export const HooksPage = () => {
    const { data: hooks, isLoading, refetch } = useGetAllHooksQuery();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const refresh = () => {
        delay(1, () => refetch());
    }
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
                    <SimpleGrid mt={1} w="100%" columns={{ base: 1, md: 2, lg: 3, xl: 4 }} spacing="1.5rem" mb={4}>

                        {hooks && hooks.map(hook => <HookCard key={hook.id} hook={hook} refresh={refresh} />)}

                    </SimpleGrid>
                </SpinnerContainer>
            </Flex>
            <CreateHookModal isOpen={isOpen} onOpen={onOpen} onClose={() => { refresh(); onClose(); }} />
        </>
    )
}