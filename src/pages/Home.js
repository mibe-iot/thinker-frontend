import { Button, Stack, List } from "@chakra-ui/react";
import { WidgetGrid } from "components/widget/WidgetGrid";
import { useTextColors } from "styles/theme/foundations/colors";
import { fetch as fetchWidgets } from "store/slice/widgetsSlice";
import { useDispatch } from "react-redux";

const Home = () => {
  return (
      <WidgetGrid />
  );
};

export default Home;
