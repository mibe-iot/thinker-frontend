import { extendTheme } from "@chakra-ui/react";
import { Link } from "./Link";
import { useLinkColors } from "styles/theme/foundations/colors";

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
