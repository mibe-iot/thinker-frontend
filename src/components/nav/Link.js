import {Link as ThemeLink, useColorModeValue} from "@chakra-ui/react";
import {Link as RouterLink} from "react-router-dom";
import {navLinks} from "./links";

const Link = (props) => {
    return <ThemeLink
        as={RouterLink}
        to={props.to}
        {...props}>
    </ThemeLink>
}

export default Link