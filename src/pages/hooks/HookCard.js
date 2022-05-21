import { Divider, Flex, Text, VStack } from "@chakra-ui/react"
import { useDeleteHookMutation } from "api/services/hooksApi"
import { DeleteButton } from "components/button/DeleteButton"
import { useBorderColors } from "styles/theme/foundations/colors"
import { coalesce, delay } from "utils/utils"

export const HookCard = ({ hook, refresh }) => {
    const [deleteHook] = useDeleteHookMutation()
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
                <Text flexGrow={1} fontSize="lg" fontWeight="semibold">Name: {coalesce(hook.name, "[None]")}</Text>
                <DeleteButton onClick={() => { deleteHook(hook.id); delay(1, refresh()) }} />
            </Flex>
            <Text>Type: {coalesce(hook.type, "[None]")}</Text>
            <Text>Id: {coalesce(hook.id, "[None]")}</Text>
            <Text fontSize="sm">Description: {coalesce(hook.description, "[None]")}</Text>
        </VStack>
    )
}