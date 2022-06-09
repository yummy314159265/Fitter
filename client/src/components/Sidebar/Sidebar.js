import React, { useState } from 'react'
import {
    Flex,
    Text,
    IconButton,
    Divider,
    Avatar,
    Heading
} from '@chakra-ui/react'
import {
    FiMenu,
    FiHome,
    FiUser,
    FiSettings
} from 'react-icons/fi'
import NavItem from './NavItem'

export default function Sidebar() {
    const [navSize, changeNavSize] = useState("large")
    return (
        <Flex
            pos="sticky"
            left="5"
            h="95vh"
            marginTop="2.5vh"
            boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
            borderRadius={navSize == "small" ? "15px" : "30px"}
            w={navSize == "small" ? "75px" : "200px"}
            flexDir="column"
            justifyContent="space-between"
        >
            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems={navSize == "small" ? "center" : "flex-start"}
                as="nav"
            >
                <IconButton
                    background="none"
                    mt={5}
                    _hover={{ background: 'none' }}
                    icon={<FiMenu />}
                    onClick={() => {
                        if (navSize == "small")
                            changeNavSize("large")
                        else
                            changeNavSize("small")
                    }}
                />
                <NavItem 
                    navSize={navSize} 
                    icon={FiHome} 
                    title="Posts" 
                    active
                    onClick={(e) => {
                        e.preventDefault();
                        window.location.href='/Posts';
                        }} />
                <NavItem 
                    navSize={navSize} 
                    icon={FiUser} 
                    title="Profile"
                    onClick={(e) => {
                        e.preventDefault();
                        window.location.href='/Profile';
                        }} />
                <NavItem 
                    navSize={navSize} 
                    icon={FiSettings} 
                    title="Settings"
                    onClick={(e) => {
                        e.preventDefault();
                        window.location.href='/Settings';
                        }} />
            </Flex>

            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems={navSize == "small" ? "center" : "flex-start"}
                mb={4}
            >
                <Divider display={navSize == "small" ? "none" : "flex"} />
                <Flex mt={4} align="center">
                    <Avatar size="sm" src="https://avatars.dicebear.com/api/male/username.svg" />
                    <Flex flexDir="column" ml={4} display={navSize == "small" ? "none" : "flex"}>
{/* need to make username change */}
                        <Heading as="h3" size="sm">Username</Heading>
                        <Text color="gray">Admin</Text>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}