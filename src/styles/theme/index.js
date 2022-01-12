import { extendTheme } from "@chakra-ui/react";
import { styles } from "./styles";
import { colors } from "./foundations/colors";
import { components } from "./components/index";

const theme = extendTheme(styles, colors, components);

export { theme }
