import Link from "./Link";
import {useColorModeValue} from "@chakra-ui/react";
import {navLinks} from "./links";

export const TextLink = (props) => {
    const linkColor = useColorModeValue("green.400", "green.400")
    const linkHoverColor = useColorModeValue("green.600", "green.600")
    return <Link
        to={props.to}
        p={2}
        fontSize={"lg"}
        fontWeight={600}
        color={linkColor}
        _hover={{
            textDecoration: 'none', color: linkHoverColor
        }}
        {...props}>
        {props.title}
    </Link>
}


export const appLinks = navLinks.map(linkData => {
    return <TextLink
        key={linkData.title}
        to={linkData.to}
        title={linkData.title}
    />
})
