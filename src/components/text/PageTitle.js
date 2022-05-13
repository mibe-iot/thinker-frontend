import { Heading, Text } from "@chakra-ui/react"


export const PageTitle = (props) => {
    return <Heading as="h2" fontSize="5xl" mb={6}>{props.children}</Heading>
}