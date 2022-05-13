import { Box, Divider, Flex, HStack, Link, Text, VStack } from "@chakra-ui/react"
import { ActionPanel } from "components/panel/ActionPanel"
import { PageTitle } from "components/text/PageTitle"
import React from "react"
import { useBackgroundColors, useBorderColors } from "styles/theme/foundations/colors"
import { MailSettingsSection } from "./sections/MailSettingsSection"
import { WifiSettingsSection } from "./sections/WifiSettingsSection"


export const SettingsPage = () => {
    const hoverColor = useBackgroundColors().actionHover;
    return (
        <Flex direction="column" w="100%">
            <ActionPanel leftSide={<PageTitle>Settings</PageTitle>} />
            <HStack align="start" w="100%">
                <Box
                    h="100%"
                    display={{ base: "none", md: "flex" }}
                    w="18rem"
                >
                    <VStack
                        w="100%"
                        px={4}
                        me={8}
                        my={8}
                        borderRight="1px"
                        borderColor={useBorderColors().default}
                        flexWrap="wrap"
                        align="start"
                        divider={<Divider />}
                    >
                        {Object.keys(settingsBlocks).map((sectionName) =>
                            <React.Fragment key={getAnchorFromString(sectionName) + "_anchor_href"}>
                                <Link _hover={{ textDecoration: "none" }} w="100%" href={"#" + getAnchorFromString(sectionName)}>
                                    <Box borderRadius="full" px={5} py={2} _hover={{ backgroundColor: hoverColor }}>
                                        <Text >{sectionName}</Text>
                                    </Box>
                                </Link>
                            </React.Fragment>
                        )
                        }
                    </VStack>
                </Box>
                <VStack w="100%" pe={{base: "0", md: "12rem"}} divider={<Divider />}>
                    {
                        Object.entries(settingsBlocks).map(([name, sectionCreator]) => (
                            <React.Fragment key={getAnchorFromString(name) + "_container"}>
                                {sectionCreator(name)}
                            </React.Fragment>
                        ))
                    }
                </VStack>
            </HStack>
        </Flex>

    )
}

const settingsBlocks = {
    "Wi-Fi settings": (sectionName) => <WifiSettingsSection sectionName={sectionName} />,
    "Mail settings": (sectionName) => <MailSettingsSection sectionName={sectionName} />
}

export const getAnchorFromString = (str) => str
    ? str.replace(" ", "_").toLowerCase()
    : ""


    //<VStack align="start" gap={6} divider={<Divider />} >
//Object.keys(settingsBlocks).map((sectionName)