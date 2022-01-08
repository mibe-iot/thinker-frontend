import {Image} from "@chakra-ui/react"
import Link from "./Link";

export const LogoLink = ({h}) => {
    return <Link to="/">
        <Image src={`${process.env.PUBLIC_URL}/logo.svg`} alt="logo" h={h}/>
    </Link>
}