import { Divider, Text, VStack } from "@chakra-ui/react"
import { useBorderColors } from "styles/theme/foundations/colors"
import { coalesce } from "utils/utils"

export const HookCard = ({ hook }) => {
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