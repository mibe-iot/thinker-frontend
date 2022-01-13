import { Link as ThemeLink } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Link = props => {
  return <ThemeLink as={RouterLink} to={props.to} {...props}></ThemeLink>;
};

export { Link };
