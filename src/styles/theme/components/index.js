import { extendTheme } from "@chakra-ui/react";

const components = extendTheme({
  components: {
    Link: {
      baseStyle: {
        fontSize: "lg",
        fontWeight: 600
      }
    }
  }
});

export { components };
