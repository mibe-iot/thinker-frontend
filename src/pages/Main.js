import { Flex, Container } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { NavBar } from "../components/nav/NavBar";
import { Footer } from "../components/footer/Footer";

export const Main = () => {
  return (
    <Flex flexDirection="column" height="100%">
      <NavBar />
      <Container maxW={"7xl"} p={3} display="flex" flexGrow={1}>
        <Outlet />
      </Container>
      <Footer />
    </Flex>
  );
};
