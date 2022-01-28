import { Flex, Container } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { NavBar } from "components/nav/NavBar";
import { Footer } from "components/footer/Footer";
import { useTextColors } from "styles/theme/foundations/colors";

export const Main = () => {
  return (
    <Flex flexDirection="column" height="100%">
      <NavBar />
      <Container
        color={useTextColors().default}
        maxW={"7xl"}
        px={4}
        py={3}
        display="flex"
        flexGrow={1}
        my="0.5rem"
      >
        <Outlet />
      </Container>
      <Footer />
    </Flex>
  );
};
