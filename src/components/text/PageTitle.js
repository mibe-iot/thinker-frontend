import { Heading } from "@chakra-ui/react"


export const PageTitle = (props) => {
    return <Heading as="h2" fontSize="5xl" me={3}>{props.children}</Heading>
}