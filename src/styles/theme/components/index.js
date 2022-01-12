import { extendTheme } from "@chakra-ui/react";
import {Link} from "./Link";

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

export {components};
