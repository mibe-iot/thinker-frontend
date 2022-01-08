import {Box, Collapse, Flex, IconButton, Stack, Text, useColorModeValue, useDisclosure} from "@chakra-ui/react";
import {appLinks} from "./TextLink";
import {CloseIcon, HamburgerIcon} from '@chakra-ui/icons';
import {LogoLink} from "./LogoLink";
import Link from "./Link";

export const NavBar = () => {
    const {isOpen, onToggle} = useDisclosure();
    return <nav>
        <Flex
            borderBottom={1}
            borderStyle={"solid"}
            borderColor={useColorModeValue("gray.200", "gray.900")}
            bg={useColorModeValue("white", "gray.800")}
            color={useColorModeValue("gray.600", "white")}
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
                <LogoLink h={"5"} justify={{base: "start", md: "end"}}/>
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
        <Collapse in={isOpen} animateOpacity>
            <MobileNav onItemClicked={onToggle}/>
        </Collapse>
    </nav>
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

const MobileNav = ({onItemClicked}) => {
    return <Stack spacing={4}
                  bg={useColorModeValue('white', 'gray.800')}
                  display={{md: 'none'}}
                  borderBottom={1}
                  borderStyle={"solid"}
                  borderColor={useColorModeValue("gray.200", "gray.900")}
                  py={2}>
        {
            appLinks.map((appLink, index) => (
                <MobileNavItem key={index} onItemClicked={onItemClicked} {...appLink.props}/>))
        }
    </Stack>
}

const MobileNavItem = ({title, to, onItemClicked}) => {
    const linkColor = useColorModeValue("green.400", "green.400")
    return <Link
        to={to}
        _hover={{
            textDecoration: "none"
        }}
        onClick={onItemClicked}>
        <Flex
            p={4}
            align={"center"}
            justify={{base: "right"}}>
            <Text
                fontWeight={600}
                color={linkColor}>
                {title}
            </Text>
        </Flex>
    </Link>
}