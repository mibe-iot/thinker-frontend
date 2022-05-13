import { Box, Divider, Flex, Grid, GridItem, Stack } from "@chakra-ui/react"
import { ActionPanel } from "components/panel/ActionPanel"
import { PageTitle } from "components/text/PageTitle"
import { WifiSettingsSection } from "./sections/WifiSettingsSection"


export const SettingsPage = () => {

    return (
        <Box direction="column" w="100%">
            <ActionPanel leftSide={<PageTitle>Settings</PageTitle>} />
            <Divider />
            <Grid templateColumns="repeat(10, 1fr)" >
                <GridItem  colSpan={3}>

                </GridItem>
                <GridItem  colSpan={7}>
                    <WifiSettingsSection />
                    <Divider />
                </GridItem>
            </Grid>
        </Box>
    )
}

// const settingsBlocks = {
//     "Wi-Fi": 
// }