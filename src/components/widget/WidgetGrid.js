import { SimpleGrid, Box, IconButton, Stack, List } from "@chakra-ui/react";
import { fetch as fetchWidgets } from "store/slice/widgetsSlice";
import { useDispatch } from "react-redux";
import { Widget } from "./Widget";
import { RefreshButton } from "components/button/RefreshButton";

const WidgetGrid = () => {
  const dispatch = useDispatch();
  return (
    <Stack w="100%">
      <List alignSelf={{base:"center", md: "end"}}>
        <RefreshButton border="1px" title="Refresh widgets" onClick={() => dispatch(fetchWidgets())} />
      </List>
      <Box w="100%">
        <SimpleGrid w="100%" minChildWidth="16rem" spacing="2rem">
          <Widget title="Title" onToggle="TODO" />
          <Widget title="Title" onToggle="TODO" />
          <Widget title="Title" onToggle="TODO" />
          <Widget title="Title" onToggle="TODO" height="2rem">
            <p>p</p>
            <p>p</p>
            <p>p</p>
            <p>p</p>
            <p>p</p>
            <p>p</p>
            <p>p</p>
            <p>p</p>
            <p>p</p>
            <p>p</p>
            <p>p</p>
            <p>p</p>
            <p>p</p>
          </Widget>
          <Widget title="Title" onToggle="TODO" />
          <Widget title="Title" onToggle="TODO" />
          <Widget title="Title" onToggle="TODO" />
          <Widget title="Title" onToggle="TODO" />
          <Widget title="Title" onToggle="TODO" />
          <Widget title="Title" onToggle="TODO" />
          <Widget title="Title" onToggle="TODO" height="2rem">
            <p>p</p>
            <p>p</p>
            <p>p</p>
            <p>p</p>
            <p>p</p>
            <p>p</p>
            <p>p</p>
            <p>p</p>
            <p>p</p>
            <p>p</p>
            <p>p</p>
            <p>p</p>
            <p>p</p>
          </Widget>
          <Widget title="Title" onToggle="TODO" />
          <Widget title="Title" onToggle="TODO" />
          <Widget title="Title" onToggle="TODO" />
          <Widget title="Title" onToggle="TODO" />
          <Widget title="Title" onToggle="TODO" />
        </SimpleGrid>
      </Box>
    </Stack>
  );
};

export { WidgetGrid };
