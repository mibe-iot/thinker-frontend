import { Heading, Text } from "@chakra-ui/react"


export const PageTitle = (props) => {
    return <Heading as="h2" fontSize="5xl" my={6}>{props.children}</Heading>
}