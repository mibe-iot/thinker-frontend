import { WarningIcon } from "@chakra-ui/icons";
import { Text, Tooltip } from "@chakra-ui/react";
import { useColors } from "styles/theme/foundations/colors";


export const WarningBadge = ({ message }) => {
    const warningColor = useColors().warning;
    return (
        <Tooltip borderRadius="lg" label={message} placement="right">
            <WarningIcon color={warningColor} />
        </Tooltip>
    )
}