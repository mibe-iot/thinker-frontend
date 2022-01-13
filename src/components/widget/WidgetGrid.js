import { SimpleGrid, Box } from "@chakra-ui/react";
import { Widget } from "./Widget";

const WidgetGrid = () => {
  return (
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
  );
};

export { WidgetGrid };
