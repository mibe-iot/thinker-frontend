import {Box, Flex, Stack, IconButton, useColorModeValue, useDisclosure, Text} from "@chakra-ui/react";
import {appLinks} from "./TextLink";
import {
    HamburgerIcon, CloseIcon, ChevronDownIcon, ChevronRightIcon,
} from '@chakra-ui/icons';
import {LogoLink} from "./LogoLink";

export const NavBar = () => {
    const {isOpen, onToggle} = useDisclosure();
    return <Flex
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        shadow={"md"}
    justifyContent={"center"}>
        <Flex
            flex={{base: 1}}
            alignItems={"center"}
            justify={{base: "center", md: "start"}}
            minH={"60px"}
            py={{base: 2}}
            px={{base: 4}}
            maxW={"7xl"}
        >
            <LogoLink h={"5"}/>
            <Flex display={{base: "none", md: "flex"}} ml={"5"}>
                <DesktopNav/>
            </Flex>
            <Flex
                flex={{base: 1, md: 'auto'}}
                justify={{base: "end"}}
                display={{base: 'flex', md: 'none'}}>
                <IconButton
                    onClick={onToggle}
                    icon={
                        isOpen ? <CloseIcon w={3} h={3}/> : <HamburgerIcon w={5} h={5}/>
                    }
                    variant={'ghost'}
                    aria-label={'Toggle Navigation'}
                />
            </Flex>
        </Flex>
    </Flex>
}

const DesktopNav = () => {
    return <Stack direction="row" spacing={4}>
        {appLinks.map((appLink, index) => {
            return <Box key={index}>
                {appLink}
            </Box>
        })}
    </Stack>
}