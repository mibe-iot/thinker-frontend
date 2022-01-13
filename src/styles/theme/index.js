import { extendTheme } from "@chakra-ui/react";
import { styles } from "./styles";
import { colorsExtension } from "./foundations/colors";
import { components } from "./components/index";

const theme = extendTheme(styles, colorsExtension, components);

export { theme }
