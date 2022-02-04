import { Button, Stack, List } from "@chakra-ui/react";
import { DevicesWidgetGrid } from "components/widget/DevicesWidgetGrid";
import { useTextColors } from "styles/theme/foundations/colors";
import { fetch as fetchWidgets } from "store/slice/widgetsSlice";
import { useDispatch } from "react-redux";

const Home = () => {
  return <DevicesWidgetGrid />;
};

export default Home;
