import { SettingsIcon } from "@chakra-ui/icons";
import { ActionButton } from "components/button/ActionButton";
import { Link } from "react-router-dom";

export const SettingsButton = () => {
  const icon = <SettingsIcon />;
  return <Link to="/settings"><ActionButton mt={0} icon={icon} /></Link>
};
