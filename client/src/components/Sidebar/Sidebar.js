import React, { useState } from 'react'
import {
    Flex,
    Text,
    IconButton,
    Divider,
    Avatar,
    Heading,
   
} from '@chakra-ui/react'
import {
    FiMenu,
    FiHome,
    FiUser,
    FiSettings
} from 'react-icons/fi'
import NavItem from './NavItem'
import { useNavigate } from "react-router-dom";
import Auth from '../../utils/auth';

export default function Sidebar() {
    const [navSize, changeNavSize] = useState("large")
    const navigate = useNavigate();

    const handleClick = (event) => {
        event.preventDefault();
        navigate('/profile', { replace: true})
  }
    return (
            <Flex
                pos="sticky"
                left="5"
                h="95vh"
                marginTop="2.5vh"
                boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
                borderRadius={navSize === "small" ? "15px" : "30px"}
                w={navSize === "small" ? "75px" : "200px"}
                flexDir="column"
                justifyContent="space-between"
            >
                <Flex
                    p="5%"
                    flexDir="column"
                    w="100%"
                    alignItems={navSize === "small" ? "center" : "flex-start"}
                    as="nav"
                >
                    <IconButton
                        background="none"
                        mt={5}
                        _hover={{ background: 'none' }}
                        icon={<FiMenu />}
                        color="black"
                        onClick={() => {
                            if (navSize === "small")
                                changeNavSize("large")
                            else
                                changeNavSize("small")
                        }}
                    />
                    <NavItem 
                        navSize={navSize} 
                        icon={FiHome} 
                        color="black"
                        title="Timeline" 
                        link='/posts'
                        active
                         />
                    <NavItem 
                        navSize={navSize} 
                        icon={FiUser} 
                        color="black"
                        title="Profile"
                        link='/profile'
                    />
                    <NavItem 
                        navSize={navSize} 
                        icon={FiSettings} 
                        color="black"
                        title="Settings"
                        link='/'
                    />
                </Flex>

                <Flex
                    p="5%"
                    flexDir="column"
                    w="100%"
                    alignItems={navSize === "small" ? "center" : "flex-start"}
                    mb={4}
                >
                    <Divider display={navSize === "small" ? "none" : "flex"} />
                    <Flex mt={4} align="center">
                        <Avatar size="sm" src="https://avatars.dicebear.com/api/male/username.svg" />
                        <Flex flexDir="column" ml={4} display={navSize === "small" ? "none" : "flex"}>
    {/* need to make username change */}
                        {Auth.loggedIn() &&
                            <Heading as="h3" size="sm">{Auth.getProfile().data.username}</Heading>
                        }
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
    )
}