import {Box, Container} from "@chakra-ui/react";
import {Outlet} from "react-router-dom";
import {NavBar} from "../components/nav/NavBar";

export const Main = () => {
    return <Box>
        <NavBar/>
        <Container maxW={"7xl"} p={3}>
            <Outlet/>
        </Container>
    </Box>
}