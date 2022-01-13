import { Stack, Box } from "@chakra-ui/react";
import { appLinks } from "components/link/TextLink";

const DesktopNav = () => {
  return (
    <Stack direction="row" spacing={4}>
      {appLinks.map((appLink, index) => {
        return <Box key={index}>{appLink}</Box>;
      })}
    </Stack>
  );
};

export { DesktopNav };
