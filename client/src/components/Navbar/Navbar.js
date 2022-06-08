import React from 'react';
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  HStack,
  IconButton,
  Image
} from '@chakra-ui/react';
import { MoonIcon, SunIcon, HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import logoImg from '../../assets/images/logos/green-logo-no-text.png';
import { Link as RouterLink } from 'react-router-dom';

import Auth from '../../utils/auth';

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  // replace with authentication

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box>
              <Link as={RouterLink} to='/'>
                <Image boxSize='48px' objectFit='contain' src={logoImg} alt='Logo' />
              </Link>
            </Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
              <Link as={RouterLink} to='/posts'>
                  <Button>Posts</Button>
              </Link>
              <Link as={RouterLink} to='/profile'>
                  <Button>Profile</Button>
              </Link>
            </HStack>
          </HStack>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
              {Auth.loggedIn() ?
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}
                >
                  <Avatar
                    size={'sm'}
                    src={'https://avatars.dicebear.com/api/male/username.svg'}
                  />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  {/*This needs to show only when logged in, otherwise shows login button*/}
                  <Center>
                    <Avatar
                      size={'2xl'}
                      src={'https://avatars.dicebear.com/api/male/username.svg'}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>Username</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem>Your Servers</MenuItem>
                  <MenuItem>Account Settings</MenuItem>
                  <MenuItem onClick={(e) =>{e.preventDefault(); Auth.logout()}}>Logout</MenuItem>
                </MenuList>
              </Menu> :
              <>
                {/*Replace buttons*/}
                <Link as={RouterLink} to='/login'>
                  <Button
                  color={'black'}
                  _hover={{
                    bg: 'lightgreen',
                  }}
                  >Log in</Button>
                </Link>
                <Link as={RouterLink} to='/signup'>
                  <Button 
                  bg={'green'}
                  color={'white'}
                  _hover={{
                    bg: 'darkgreen',
                  }}
                  >Sign up</Button>
                </Link>
              </>
              }
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}